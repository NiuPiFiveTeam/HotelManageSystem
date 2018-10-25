var Stores = new Admin.store.dept.DeptStore();
var rolestore = new Admin.store.group.GroupStore();
Ext.QuickTips.init();
Ext.define('Admin.view.employ.EmployGridPanel' , {
    extend : 'Ext.panel.Panel' ,
    // controller: 'employManagerController',
    // viewModel: {type: 'employManegerModel'},
    id : 'employManagerPanel' ,
    xtype : 'employGridPanel' ,
    cls: 'employGridPanel',
    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date',
        'Ext.selection.CheckboxModel'
    ],
    
    viewConfig: {
        stripeRows:true //True来实现隔行换颜色
    },
    layout: {
        type:'fit',
        align:'stretch'
    },
    items:[{
        xtype: 'gridpanel',
        scrollable: true,
        bind: '{empLists}',
        //scrollable: false,
        selModel: {type: 'checkboxmodel',checkOnly: true},//开启复选框
        listeners: {
                selectionchange: function(selModel, selections){
                     this.down('#empRemoveid').setDisabled(selections.length === 0);
                }
        },
        
        columns : [
            {   xtype:'rownumberer',width:50,text:'序号', align:'center'},
            {    text:'员工ID' , flex:1 ,hidden:true, align:'center' , dataIndex:'emp_id'},
            {xtype: 'gridcolumn',width: 75,dataIndex: 'empImage',text: '头像',
                        renderer: function(value) {
                            if(value==null){
                                return "<img src='/resources/images/user-profile/" + "2_.png" + "' alt='Profile Pic' height='40px' width='40px'>";
                            }else if(value==""){
                                return "<img src='/resources/images/user-profile/" + "2_.png" + "' alt='Profile Pic' height='40px' width='40px'>";
                            }else{
                                return "<img src='/resources/images/employee/" + value + "' alt='Profile Pic' height='40px' width='40px'>";
                            }
                            
                        }
                    },
            {    text:'员工姓名' , flex:1 , align:'center' , dataIndex:'empName'},
            {    text:'员工编号' , flex:1 , align:'center' , dataIndex:'empNo'},
            {    text:'员工账户' , flex:1 , align:'center' , dataIndex:'userName'},
            {    text:'性别' , flex:1 , align:'center' , dataIndex:'empSex'    },
            {    text:'部门' , flex:1 , align:'center' , dataIndex:'deptName'},
            {    text:'职称' , flex:1 , align:'center' , dataIndex:'groupName'},
            {    text:'类别' , flex:1 , align:'center' , dataIndex:'jobtype'},    
            {    text:'身份证ID' , flex:1 , align:'center',hidden: true, dataIndex:'idcard'},    
            {    text:'联系方式' , flex:1 , align:'center' , dataIndex:'tel'},
            {    text:'籍贯' , flex:1 ,hidden: true, align:'center' , dataIndex:'address'},
            {    text:'入职日期' , flex:1 , align:'center' , dataIndex:'entryDate',xtype:'datecolumn',formatter: 'date("Y-m-d")'},            
            {    header:'离职时间',align:"center",hidden: true,flex:1,dataIndex:'endDate',xtype:'datecolumn',formatter:'date("Y-m-d")'},

            {xtype: 'actioncolumn', width: 100,align:'center',text: '操作',
                        items: [
                            {xtype: 'button',iconCls: 'x-fa fa-pencil' ,tooltip:"修改信息",handler: 'onEditButton'},
                            {xtype: 'button',iconCls: 'x-fa fa-trash-o' ,tooltip:"删除员工",handler: 'onDeleteButton'},
                            {xtype: 'button',iconCls: 'x-fa fa-book', tooltip:"查看详情",handler: 'onDisableButton'}
                        ]
            }
         
        ],
        dockedItems:[{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            itemId: 'EmployPaginationToolbar',
            displayInfo: true,
            bind: '{empLists}'
        },{
            xtype:'toolbar',
            dock:'top',
            items:[
                {
                xtype : 'combobox',            
                //labelWidth : 100,
                labelAlign : 'right',
                reference:'searchdepartment',    
                width: 250,            
                fieldLabel:'选择部门',
                store: Stores,
                valueField : 'deptName',
                displayField: 'deptName',
                forceSelection:true,                
                editable : false,
                emptyText: '请选部门',
                //value : '服务员',
                listeners:{
                    select: 'searchComboboxSelectDepartment'
                }
                //width: 135
            }, '-',{
                xtype: 'combobox',
                hideLabel: true,
                reference:'searchFieldName',
                store:Ext.create("Ext.data.Store", {
                    fields: ["name", "value"],
                    data: [

                        { name: '员工姓名', value: 'empName' },
                        { name: '员工身份证号', value: 'idcard' },
                        { name: '入职时间', value: 'entryDate' },
                        { name: '用户账号', value: 'userName' },
                        { name: '员工编号', value: 'empNo' }

                    ]
                }),
                displayField: 'name',
                valueField:'value',
                value:'员工姓名',
                editable: false,
                queryMode: 'local',
                triggerAction: 'all',
                emptyText: 'Select a state...',
                width: 130,
                listeners:{
                    select: 'searchComboboxSelectChuang'
                }
            },'-',{
                xtype:'textfield',
                reference:'searchFieldValue',
                name:'employPanelSearchField'
            }, '-',{
                xtype: 'datefield',
                hideLabel: true,
                hidden:true,
                format: 'Y-m-d  ',
                reference:'searchDataFieldValue',
                fieldLabel: 'From',
                name: 'from_date'
                //,id:'from_date',
                //vtype: 'daterange',
                //endDateField: 'to_date'
            }, {
                xtype: 'datefield',
                hideLabel: true,
                hidden:true,
                format: 'Y-m-d',
                reference:'searchDataFieldValue2',
                fieldLabel: 'To',
                name: 'to_date'
                //,id:'to_date',
                //vtype: 'daterange',
                //startDateField: 'from_date'
            },'-',{
                xtype:'button',
                text: '快速查询',
                iconCls: 'fa fa-search',
                style:'background:#;',
                handler: 'quickSearch'
            }, '-',{
                xtype:'button',
                text: '显示全部',
                iconCls: 'fa fa-search-plus',
                style:'background:#;',
                handler: 'openSearchWindow' 
            },'->',{
                xtype:'button',
                text: '批量导入',
                iconCls: 'fa fa-refresh',
                style:'background:#;',
                handler: 'InputExcel' 
            },'-',{
                xtype:'button',
                text: '批量导出',
                iconCls: 'fa fa-refresh',
                style:'background:#;',
                handler: 'exportExcel'

            },'-',{ 
                xtype:'button',
                text: '删除更多',
                tooltip: 'Remove the selected item',
                iconCls:'fa fa-trash',
                itemId: 'empRemoveid',
                disabled: true,
                handler: 'deleteMoreRows',
            }
            ]
        }]    

    }]
    
          
});