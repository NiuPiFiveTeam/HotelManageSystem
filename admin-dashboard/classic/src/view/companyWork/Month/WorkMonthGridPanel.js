Ext.define('Admin.view.companyWork.Month.WorkMonthGridPanel' , {
    extend : 'Ext.panel.Panel' ,
    // controller: 'employManagerController',
    // viewModel: {type: 'employManegerModel'},
    id : 'workMonthGridPanel' ,
    xtype : 'workMonthGridPanel' ,
    cls: 'workMonthGridPanel',
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
            var store = Ext.data.StoreManager.lookup('workStoreId');
            var ontudytime1 = Ext.util.Format.date(new Date(), "Y-m-") + "01";
            var offdutytime2 = Ext.util.Format.date(new Date(new Date(new Date().getUTCFullYear(), new Date().getMonth() + 1, 1) - 86400000), "Y-m-d");
            var format = 'Y-m-d H:i:s';                                          
            //var currentdateTime = Ext.Date.format(date, format);
            //var ontudytime = Ext.Date.format(ontudytime1, format);
            //var offdutytime = Ext.Date.format(offdutytime2, format);
            store.load();
            // var requestType = "personal";     
            Ext.apply(store.proxy.extraParams, {
              ontudytime:ontudytime1,
              offdutytime:offdutytime2

            });
            store.load({params:{start:0, limit:10, page:1}});
            }
  },
    //layout: 'fit',
    items:[{

        
        xtype:'panel',
        layout:'hbox',
        items:[{
            xtype:'form',
            reference:'workMonthform',
            layout:'hbox',
            padding:'20 0 20 20',
            listeners: {
               'render': function(form) {
                   form.getForm().load({  
                                url: '/work/tatalrecord',  
                                waitTitle : '请等待' ,   
                                success:function(form,action){
                                },  
                                failure:function(form,action){  
                                Ext.Msg.alert('提示','保存失败！');  
                                }  
                  });                                 
                }
            },
            items:[{
                xtype: 'displayfield',
                name:'totalPerson',//今天应该出勤
                style:'background:#FAEBD7;',
                margin:'0 10 0 0',
                width:110,
                padding:'10 10 10 0',
                renderer: function(value) {
                            if(value!=null){
                                return "<p style='text-align:center;font-size:16px;line-height:30px;color:black;'>应该出勤</p>"+
                                "<p style='text-align:center;font-size:14px;line-height:30px;color:red;'>"+value+"人"+"</p>";
                            }
                            
                }

            },{
            //今天实际出勤
                xtype: 'displayfield',
                name:'exactlyPerson',
                style:'background:#E6E6FA;',
                margin:'0 10 0 0',
                width:110,
                padding:'10 10 10 0',
                renderer: function(value) {
                            if(value!=null){
                                return "<p style='text-align:center;font-size:16px;line-height:30px;color:black;'>实际出勤</p>"+
                                "<p style='text-align:center;font-size:12px;line-height:30px;color:red;'>"+value+"人"+"</p>";
                            }
                            
                }
            },{
            //加班时长
                xtype: 'displayfield',
                name:'tatalPersonNomal',//今天应该出勤
                style:'background:#FFF0F5;',
                margin:'0 10 0 0',
                width:110,
                padding:'10 10 10 0',
                renderer: function(value) {
                            if(value!=null){
                                return "<p style='text-align:center;font-size:16px;line-height:30px;color:black;'>出勤异常</p>"+
                                "<p style='text-align:center;font-size:12px;line-height:30px;color:red;'>"+value+"人"+"</p>";
                            }
                            
                }
            },{
            //加班时长
                xtype: 'displayfield',
                name:'tatalPersonLate',//今天应该出勤
                style:'background:#FFF0F5;',
                margin:'0 10 0 0',
                width:110,
                padding:'10 10 10 0',
                renderer: function(value) {
                            if(value!=null){
                                return "<p style='text-align:center;font-size:16px;line-height:30px;color:black;'>迟到人次</p>"+
                                "<p style='text-align:center;font-size:12px;line-height:30px;color:red;'>"+value+"人"+"</p>";
                            }
                            
                }
            },{
            //加班时长
                xtype: 'displayfield',
                name:'tatalPersonleaveEarly',//今天应该出勤
                style:'background:#FFF0F5;',
                margin:'0 10 0 0',
                width:110,
                padding:'10 10 10 0',
                renderer: function(value) {
                            if(value!=null){
                                return "<p style='text-align:center;font-size:16px;line-height:30px;color:black;'>早退人次</p>"+
                                "<p style='text-align:center;font-size:12px;line-height:30px;color:red;'>"+value+"人"+"</p>";
                            }
                            
                }
            },{
            //迟到
                xtype: 'displayfield',
                name:'tatalPersonOvertime',//今天应该出勤
                style:'background:#FFF0F5;',
                margin:'0 10 0 0',
                width:110,
                padding:'10 10 10 0',
                renderer: function(value) {
                            if(value!=null){
                                return "<p style='text-align:center;font-size:16px;line-height:30px;color:black;'>加班人次</p>"+
                                "<p style='text-align:center;font-size:12px;line-height:30px;color:red;'>"+value+"人"+"</p>";
                            }
                            
                }
            },{
            //早退
                xtype: 'displayfield',
                name:'tatalPersonLeave',//今天应该出勤
                style:'background:#D3D3D3;',
                margin:'0 10 0 0',
                width:110,
                padding:'10 10 10 0',
                renderer: function(value) {
                            if(value!=null){
                                return "<p style='text-align:center;font-size:16px;line-height:30px;color:black;'>请假人次</p>"+
                                "<p style='text-align:center;font-size:12px;line-height:30px;color:red;'>"+value+"人"+"</p>";
                            }
                            
                }
            },{
            //未打卡
                xtype: 'displayfield',
                name:'tatalPersonTravel',//今天应该出勤
                style:'background:#98FB98;',
                margin:'0 10 0 0',
                width:110,
                padding:'10 10 10 0',
                renderer: function(value) {
                            if(value!=null){
                                return "<p style='text-align:center;font-size:16px;line-height:30px;color:black;'>出差人次</p>"+
                                "<p style='text-align:center;font-size:12px;line-height:30px;color:red;'>"+value+"人"+"</p>";
                            }
                            
                }
            }

            ]
            },{

               xtype:'panel', 
               //打卡
               layout:'vbox',
               padding:'20 0 20 0',

               width:200,
               items:[{
                        xtype:'toolbar',
                        style:'background:#7FFFD4;',
                        layout:'vbox',
                        items:[{
                            xtype:'button',
                            width:100,
                            text:'当前时间'
                            },
                            {
                                xtype:'button',
                                width:100,
                                id:'clock1',
                                listeners: {
                                      'render': function() {
                                        Ext.TaskManager.start({
                                            run: function() {
                                              Ext.getCmp("clock1").setText(Ext.Date.format(new Date(), 'g:i:s A'));
                                            },
                                            interval: 1000
                                          });
                                      }
                                }
                            },{
                                xtype:'button',
                                text: '同步打卡状态',
                                width:100,
                                
                                style:'background:#;',
                                handler: 'OnclickAttence'

                            }

                        ]
                }]
            }
        ]},{
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
                    fields: ['quarter', '2013', '2014'],
                    data: [
                        { quarter: 'Q1', 2013: 42000, 2014: 68000},
                        { quarter: 'Q2', 2013: 50000, 2014: 85000},
                        { quarter: 'Q3', 2013: 53000, 2014: 72000},
                        { quarter: 'Q4', 2013: 63000, 2014: 89000}
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
            }, '-',{
                xtype:'button',
                text: '刷新统计',
                iconCls: 'fa fa-search-plus',
                style:'background:#;',
                handler: 'workmonthrefresh' 
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