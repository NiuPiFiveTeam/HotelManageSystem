Ext.define('Admin.view.work.WorkGridPanel' , {
    extend : 'Ext.panel.Panel' ,
    // controller: 'employManagerController',
    // viewModel: {type: 'employManegerModel'},
    id : 'workManagerPanel' ,
    xtype : 'workGridPanel' ,
    cls: 'workGridPanel',
    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date',
        'Ext.selection.CheckboxModel'
    ],
    
    viewConfig: {
        stripeRows:true //True来实现隔行换颜色
    },

    //layout: 'fit',
    items:[{

        
        xtype:'panel',
        layout:'hbox',
        items:[{
            xtype:'form',
            layout:'hbox',
            padding:'20 0 20 20',
            listeners: {
               'render': function(form) {
                   form.getForm().load({  
                                url: '/work/record',  
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
                name:'attenceTotalTime',//今天应该出勤
                style:'background:#FAEBD7;',
                margin:'0 10 0 0',
                width:120,
                padding:'10 10 10 0',
                renderer: function(value) {
                            if(value!=null){
                                return "<p style='text-align:center;font-size:16px;line-height:30px;color:black;'>本月应该出勤</p>"+
                                "<p style='text-align:center;font-size:14px;line-height:30px;color:red;'>"+value+"小时"+"</p>";
                            }
                            
                }

            },{
            //今天实际出勤
                xtype: 'displayfield',
                name:'exactlyTime',
                style:'background:#E6E6FA;',
                margin:'0 10 0 0',
                width:120,
                padding:'10 10 10 0',
                renderer: function(value) {
                            if(value!=null){
                                return "<p style='text-align:center;font-size:16px;line-height:30px;color:black;'>本月实际出勤</p>"+
                                "<p style='text-align:center;font-size:12px;line-height:30px;color:red;'>"+value+"小时"+"</p>";
                            }
                            
                }
            },{
            //加班时长
                xtype: 'displayfield',
                name:'worktime',//今天应该出勤
                style:'background:#FFF0F5;',
                margin:'0 10 0 0',
                width:120,
                padding:'10 10 10 0',
                renderer: function(value) {
                            if(value!=null){
                                return "<p style='text-align:center;font-size:16px;line-height:30px;color:black;'>基本时长</p>"+
                                "<p style='text-align:center;font-size:12px;line-height:30px;color:red;'>"+value+"小时"+"</p>";
                            }
                            
                }
            },{
            //加班时长
                xtype: 'displayfield',
                name:'overtime',//今天应该出勤
                style:'background:#FFF0F5;',
                margin:'0 10 0 0',
                width:120,
                padding:'10 10 10 0',
                renderer: function(value) {
                            if(value!=null){
                                return "<p style='text-align:center;font-size:16px;line-height:30px;color:black;'>加班时长</p>"+
                                "<p style='text-align:center;font-size:12px;line-height:30px;color:red;'>"+value+"小时"+"</p>";
                            }
                            
                }
            },{
            //迟到
                xtype: 'displayfield',
                name:'totalLate',//今天应该出勤
                style:'background:#FFF0F5;',
                margin:'0 10 0 0',
                width:120,
                padding:'10 10 10 0',
                renderer: function(value) {
                            if(value!=null){
                                return "<p style='text-align:center;font-size:16px;line-height:30px;color:black;'>迟到次数</p>"+
                                "<p style='text-align:center;font-size:12px;line-height:30px;color:red;'>"+value+"次"+"</p>";
                            }
                            
                }
            },{
            //早退
                xtype: 'displayfield',
                name:'totalleaveEarly',//今天应该出勤
                style:'background:#D3D3D3;',
                margin:'0 10 0 0',
                width:120,
                padding:'10 10 10 0',
                renderer: function(value) {
                            if(value!=null){
                                return "<p style='text-align:center;font-size:16px;line-height:30px;color:black;'>早退次数</p>"+
                                "<p style='text-align:center;font-size:12px;line-height:30px;color:red;'>"+value+"次"+"</p>";
                            }
                            
                }
            },{
            //未打卡
                xtype: 'displayfield',
                name:'totalCard',//今天应该出勤
                style:'background:#98FB98;',
                margin:'0 10 0 0',
                width:120,
                padding:'10 10 10 0',
                renderer: function(value) {
                            if(value!=null){
                                return "<p style='text-align:center;font-size:16px;line-height:30px;color:black;'>未打卡</p>"+
                                "<p style='text-align:center;font-size:12px;line-height:30px;color:red;'>"+value+"次"+"</p>";
                            }
                            
                }
            },{
                //正常
                xtype: 'displayfield',
                name:'totalnormal',//今天应该出勤
                style:'background:#FFF5EE;',
                margin:'0 10 0 0',
                width:120,
                padding:'10 10 10 0',
                renderer: function(value) {
                            if(value!=null){
                                return "<p style='text-align:center;font-size:16px;line-height:30px;color:black;'>未补卡</p>"+
                                "<p style='text-align:center;font-size:12px;line-height:30px;color:red;'>"+value+"次"+"</p>";
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
                                id:'clock',
                                listeners: {
                                      'render': function() {
                                        Ext.TaskManager.start({
                                            run: function() {
                                              Ext.getCmp("clock").setText(Ext.Date.format(new Date(), 'g:i:s A'));
                                            },
                                            interval: 1000
                                          });
                                      }
                                }
                            },{
                                xtype:'button',
                                text: '点击打卡',
                                width:100,
                                //iconCls: 'fa fa-search-plus',
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
            {    text:'加班时长' , flex:1 , align:'center' , dataIndex:'Overtime'},
            {    text:'迟到' , flex:1 , align:'center' , dataIndex:'late',
                 renderer:function(value){
                    if(value == 1){
                        return '<span style="color:red;">迟到</span>';
                    }else if(value == 0){
                        return '<span style="color:green;">正常</span>';
                    }else{
                        return value;
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
                        return value;
                    }
                    
                 }},
            {    text:'缺卡' , flex:1 , align:'center' , dataIndex:'lackCard',renderer:function(value){
                    if(value == 1){
                        return '<span style="color:red;">缺卡</span>';
                    }else if(value == 0){
                        return '<span style="color:green;">正常</span>';
                    }else{
                        return value;
                    }
                    
                 }},
            {    text:'正常' , flex:1 , align:'center' , dataIndex:'normal',renderer:function(value){
                    if(value == 1){
                        return '<span style="color:green;">正常</span>';
                    }else if(value == 0){
                        return '<span style="color:red;">异常</span>';
                    }else{
                        return value;
                    }
                    
                 }},
            {xtype: 'actioncolumn', flex:1 ,align:'center',text: '操作',
                        items: [
                            {xtype: 'button',iconCls: 'x-fa fa-pencil' ,text:"申请补卡",handler: 'onEditAttenceButton'},
                        ]
            }
         
        ],
        dockedItems:[{
            xtype:'toolbar',
            dock:'top',
            items:[
            {
                xtype: 'datefield',
                fieldLabel: '请选择时间',
                format: 'Y-m-d H:i:s',
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