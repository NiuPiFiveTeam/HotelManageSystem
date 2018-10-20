Ext.define('Admin.view.PaiBanTab.PaibanGridPanel' , {
    extend : 'Ext.panel.Panel' ,
    // controller: 'employManagerController',
    // viewModel: {type: 'employManegerModel'},
    id : 'paibanManagerPanel' ,
    xtype : 'paibanGridPanel' ,
    cls: 'paibanGridPanel',
    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date',
        'Ext.selection.CheckboxModel'
    ],
    
    viewConfig: {
        stripeRows:true //True来实现隔行换颜色
    },
    layout: 'fit',
    items:[{
        xtype: 'gridpanel',
        scrollable: true,
        bind: '{paibanLists}',
        //scrollable: false,
        selModel: {type: 'checkboxmodel',checkOnly: true},//开启复选框
        listeners: {
                selectionchange: function(selModel, selections){
                     this.down('#empRemoveid').setDisabled(selections.length === 0);
                }
        },
        //layout: 'fit',
        columns : [
            {   xtype:'rownumberer',width:50,text:'序号', align:'center'},
            {    text:'员工ID' , flex:1 ,hidden:true, align:'center' , dataIndex:'id'},
            {    text:'员工姓名' , flex:1 , align:'center' , dataIndex:'empName'},
            {    text:'员工编号' , flex:1 , align:'center' , dataIndex:'empNo'},
            {    text:'班次' , flex:1 , align:'center' , dataIndex:'calendar'},
            {    text:'上班时间 ' , flex:1 , align:'center' , dataIndex:'startDate',xtype:'datecolumn',formatter: 'date("Y-m-d H:i:s")'},            
            {    text:'下班时间',align:"center",flex:1,dataIndex:'endDate',xtype:'datecolumn',formatter:'date("Y-m-d H:i:s")'},
            {    text:'日期' , flex:1 , align:'center' , dataIndex:'eventDate'},
            {    text:'所属部门' , flex:1 , align:'center' , dataIndex:'deptName'},
            {xtype: 'actioncolumn', flex:1 ,align:'center',text: '操作',
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
            bind: '{paibanLists}'
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
                //store: Stores,
                store : new Ext.data.ArrayStore({
                    fields: [
                        {type: 'string',name: 'deptName'},
                    ],
                    
                    proxy: {
                    type: 'rest',
                    url: '/dept',
                    reader:{
                        type:'json',
                        rootProperty:'content',  //对应后台返回的结果集名称
                        totalProperty: 'totalElements'//分页需要知道总记录数
                    },
                    writer:{
                        type:'json'
                    },
                    simpleSortMode: true
                    },

                    autoSync: true,
                    remoteSort: true,//全局排序
                    pageSize: 20,
                    sorters: {
                        direction: 'DESC',
                        property: 'dept_id'
                    }



                }),
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
                        { name: '时间', value: 'startDate' },
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
                format: 'Y-m-d H:i:s',
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
                format: 'Y-m-d H:i:s',
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