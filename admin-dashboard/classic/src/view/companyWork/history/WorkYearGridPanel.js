Ext.define('Admin.view.companyWork.history.WorkYearGridPanel' , {
    extend : 'Ext.panel.Panel' ,
    // controller: 'employManagerController',
    // viewModel: {type: 'employManegerModel'},
    id : 'workYearGridPanel' ,
    xtype : 'workYearGridPanel' ,
    cls: 'workYearGridPanel',
    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date',
        'Ext.selection.CheckboxModel'
    ],
    
    viewConfig: {
        stripeRows:true //True来实现隔行换颜色
    },

      listeners: {
        render: function(){
            
        }
  },
    //layout: 'fit',
    items:[{
        
        xtype: 'gridpanel',
        scrollable: true,
        bind: '{workLists}',
        //scrollable: false,
        selModel: {type: 'checkboxmodel',checkOnly: true},//开启复选框
        listeners: {
                selectionchange: function(selModel, selections){
                     this.down('#empRemoveid').setDisabled(selections.length === 0);
                }
        },
        //layout: 'fit',
        columns : [
            //{   xtype:'rownumberer',width:50,text:'序号', align:'center'},
            {    text:'ID' , flex:1 ,hidden:true, align:'center' , dataIndex:'workid'},
            {    text:'员工姓名' , flex:1 , align:'center' , dataIndex:'empName'},
            {    text:'员工编号' , flex:1 , align:'center' , dataIndex:'empNo'},
            {    text:'班次' , flex:1 , align:'center' , dataIndex:'calendar'},
            {    text:'上班时间 ' , flex:1 , align:'center' , dataIndex:'ontudytime',xtype:'datecolumn',formatter: 'date("Y-m-d H:i:s")'},            
            {    text:'下班时间',align:"center",flex:1,dataIndex:'offdutytime',xtype:'datecolumn',formatter:'date("Y-m-d H:i:s")'},
            {    text:'上班时长' , flex:1 , align:'center' , dataIndex:'worktime',
                 renderer:function(value){
                    return value.toFixed(1);
                 }


            },
            {    text:'加班时长' , flex:1 , align:'center' , dataIndex:'overtime',
                renderer:function(value){
                    return value.toFixed(1);
                 }

            },
            {    text:'迟到' , flex:1 , align:'center' , dataIndex:'late',
                 renderer:function(value){
                    if(value == 1){
                        return '<span style="color:red;">迟到</span>';
                    }else if(value == 0){
                        return '<span style="color:green;">正常</span>';
                    }else{
                        return  '<span style="color:green;">无状态</span>';
                    }
                    
                 }

            },

            {    text:'早退' , flex:1 , align:'center' , dataIndex:'leaveEarly',
                renderer:function(value){
                    if(value == 1){
                        return '<span style="color:red;">早退</span>';
                    }else if(value == 0){
                        return '<span style="color:green;">正常</span>';
                    }else{
                        return  '<span style="color:green;">无状态</span>';
                    }
                    
                 }},
            {    text:'缺卡' , flex:1 , align:'center' , dataIndex:'lackCard',renderer:function(value){
                    if(value == 1){
                        return '<span style="color:red;">缺卡</span>';
                    }else if(value == 0){
                        return '<span style="color:green;">正常</span>';
                    }else{
                        return  '<span style="color:green;">无状态</span>';
                    }
                    
                 }},
            {    text:'正常' , flex:1 , align:'center' , dataIndex:'normal',renderer:function(value){
                    if(value == 1){
                        return '<span style="color:green;">正常</span>';
                    }else if(value == 0){
                        return '<span style="color:red;">异常</span>';
                    }else{
                        return  '<span style="color:green;">无状态</span>';
                    }
                    
            }},
            {xtype: 'actioncolumn', width: 100,align:'center',text: '操作',
                        items: [
                            {xtype: 'button',iconCls: 'x-fa fa-pencil' ,tooltip:"修改考勤",handler: 'onEditButton'},
                            {xtype: 'button',iconCls: 'x-fa fa-trash-o' ,tooltip:"删除考勤记录",handler: 'onDeleteButton'} 
                        ]
            }

        ],
        dockedItems:[{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            itemId: 'EmployPaginationToolbar',
            displayInfo: true,
            bind: '{workLists}'
            },{
            xtype:'toolbar',
            dock:'top',
            items:[ {
                xtype : 'combobox',            
                //labelWidth : 100,
                labelAlign : 'right',
                reference:'searchdepartment',    
                width: 250,            
                fieldLabel:'选择部门',
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
                        { name: '上班时间', value: 'entryDate' },
                        { name: '员工编号', value: 'empNo' }
                    ]
                }),
                displayField: 'name',
                valueField:'value',
                value:'员工编号',
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
                hidden:true,
                format: 'Y-m-d',
                reference:'searchDataFieldValue2',
                name: 'to_date'
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
                text: '批量导出',
                iconCls: 'fa fa-refresh',
                style:'background:#;',
                handler: 'exportExcel'

            }
            ]
        }]    

    }]
    
          
});