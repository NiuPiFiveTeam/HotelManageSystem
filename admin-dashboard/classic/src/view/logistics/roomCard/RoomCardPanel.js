Ext.define('Admin.view.logistics.roomClean.RoomCardPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'roomCardPanel',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
    ],
    cls: 'shadow',
    activeTab: 0,

    items: [
        {
            xtype: 'gridpanel',
            cls: 'user-grid',
            title: '客房内务',
            bind: '{roomCleanContent}',
            scrollable: false,
            columns: [
                {xtype: 'gridcolumn',width: 60,dataIndex: 'id',text: '编号',align:'center', hidden :true,},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'floor',  text: '楼层', align:'center',flex: 1, hidden :true,},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'roomNumber',text: '房间号码', align:'center',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'roomState', text: '房间状态', align:'center',flex: 1,
                renderer: function(val) {
		            if (val =='退房清洁') {
			            return '<span style="color:green;">退房清洁</span>';
			        } else if (val =='房间服务') {
			            return '<span style="color:red;">房间服务</span>';
			        } else if (val =='清洁中') {
			            return '<span style="color:blue;">清洁中</span>';
			        }
			        return val;
	            }
                },
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'roomType',  text: '房间类型', align:'center',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'roomOther',  text: '备注', align:'center',flex: 1},
                {xtype: 'actioncolumn',cls: 'content-column', width: 150,dataIndex: 'bool',text: '房间操作',align:'center',
                items: [
/*********************************************************清洁人员按钮**********************************************************/
                
            //清洁完成按钮
                        {xtype: 'button', handler: 'onFinishButton',tooltip : '清洁完成', //iconCls: 'x-fa fa-pencil' ,
                        getClass : function (v, metadata, r, rowIndex, colIndex, store) {
                            var roomState = r.data.roomState;
                            var roomWorker = r.data.roomWorker;
                            if(roomState == '清洁中'){
                                 return 'x-fa fa-check';
                             }
                             else{
                                return 'x-hidden';
                            }
                        },
                    },
             //客房服务完成按钮
             {xtype: 'button', handler: 'onFinishServiceButton',tooltip : '客房服务完成', //iconCls: 'x-fa fa-pencil' ,
             getClass : function (v, metadata, r, rowIndex, colIndex, store) {
                 var roomState = r.data.roomState;
                 var roomWorker = r.data.roomWorker;
                 if(roomState == '房间服务'){
                      return 'x-fa fa-check';
                  }
                  else{
                     return 'x-hidden';
                 }
             },
         },

            //清洁按钮
                        {xtype: 'button',handler: 'onCleanButton',tooltip : '清洁', //iconCls: 'x-fa fa-close'	,
                        getClass : function (v, metadata, r, rowIndex, colIndex, store) {
                            var roomState = r.data.roomState;
                            var roomWorker = r.data.roomWorker;
                            if(roomState == '退房清洁'){
                                 return 'x-fa fa-refresh';
                             }
                            else{
                                return 'x-hidden';
                            }
                        },
                    },

            //添加标配外物品按钮
                        {xtype: 'button',handler: 'onAddOtherButton',tooltip : '添加标配外物品',//iconCls: 'x-fa fa-ban'	 	,
                        getClass : function (v, metadata, r, rowIndex, colIndex, store) {
                            var roomState = r.data.roomState;
                            var roomWorker = r.data.roomWorker;
                            if(roomState == '清洁中'){
                                 return 'x-fa fa-plus';
                             }
                            else{
                                return 'x-hidden';
                            }

                        },
                    },
            //送客人需要物品按钮
                        {xtype: 'button',handler: 'onSendButton',tooltip : '送客人需要物品',//iconCls: 'x-fa fa-ban'	 	,
                        getClass : function (v, metadata, r, rowIndex, colIndex, store) {
                            var roomState = r.data.roomState;
                            var roomWorker = r.data.roomWorker;
                            if(roomState == '房间服务'){
                                 return 'x-fa fa-paper-plane-o';
                             }
                            else{
                                return 'x-hidden';
                            }
                        },
                        }
                    ],
                }
            ],
            tbar: [
            '->',{
                xtype: 'splitbutton',
                text: '一楼',
                tooltip : '一楼全部房间状态',
                iconCls: 'fa fa-university',
                value:'一楼',
                listeners: {
                    click: {
                        fn: function(btn){
                            //alert(btn.value);
                            var store =	btn.up('gridpanel').getStore();
                            Ext.apply(store.proxy.extraParams, {floor:"",roomState:""});
                            Ext.apply(store.proxy.extraParams, {floor:btn.value,roomState:""});
                            store.load({params:{start:0, limit:20, page:1}});
                        }
                    }
                },
                menu:[
                    {
                        text:'退房清洁',
                        value:'退房清洁',
                        listeners: {
                            click: {
                                fn: function(btn){ 
                                    //alert(btn.value);
                                    var store =	btn.up('gridpanel').getStore();
                                    Ext.apply(store.proxy.extraParams, {floor:"",roomState:""});
                                    Ext.apply(store.proxy.extraParams, {floor:"一楼",roomState:btn.value});
                                    store.load({params:{start:0, limit:20, page:1}}); 
                                }
                            }
                        },
                    },
                    {
                        text:'房间服务',
                        value:'房间服务',
                        listeners: {
                            click: {
                                fn: function(btn){ 
                                    //alert(btn.value);
                                    var store =	btn.up('gridpanel').getStore();
                                    Ext.apply(store.proxy.extraParams, {floor:"",roomState:""});
                                    Ext.apply(store.proxy.extraParams, {floor:"一楼",roomState:btn.value});
                                    store.load({params:{start:0, limit:20, page:1}});  
                                }
                            }
                        },
                    }
                ]
            },'->',
            {
                xtype: 'splitbutton',
                text: '二楼',
                tooltip : '二楼全部房间状态',
                iconCls: 'fa fa-university',
                value:'二楼',
                listeners: {
                    click: {
                        fn: function(btn){ 
                             //alert(btn.value);
                             var store =	btn.up('gridpanel').getStore();
                             Ext.apply(store.proxy.extraParams, {floor:"",roomState:""});
                             Ext.apply(store.proxy.extraParams, {floor:btn.value,roomState:""});
                             store.load({params:{start:0, limit:20, page:1}}); 
                        }
                    }
                },
                menu:[
                    {
                        text:'退房清洁',
                        value:'退房清洁',
                        listeners: {
                            click: {
                                fn: function(btn){
                                   // alert(btn.value);
                                    var store =	btn.up('gridpanel').getStore();
                                    Ext.apply(store.proxy.extraParams, {floor:"",roomState:""});
                                    Ext.apply(store.proxy.extraParams, {floor:"二楼",roomState:btn.value});
                                    store.load({params:{start:0, limit:20, page:1}}); 
                                }
                            }
                        },
                    },
                    {
                        text:'房间服务',
                        value:'房间服务',
                        listeners: {
                            click: {
                                fn: function(btn){
                                    //alert(btn.value);
                                    var store =	btn.up('gridpanel').getStore();
                                    Ext.apply(store.proxy.extraParams, {floor:"",roomState:""});
                                    Ext.apply(store.proxy.extraParams, {floor:"二楼",roomState:btn.value});
                                    store.load({params:{start:0, limit:20, page:1}}); 
                                }
                            }
                        },
                    }
                ]
                
            },'->',
            {
                xtype: 'splitbutton',
                text: '三楼',
                tooltip : '三楼全部房间状态',
                iconCls: 'fa fa-university',
                value:'三楼',
                listeners: {
                    click: {
                        fn: function(btn){ 
                             //alert(btn.value);
                             var store =	btn.up('gridpanel').getStore();
                             Ext.apply(store.proxy.extraParams, {floor:"",roomState:""});
                             Ext.apply(store.proxy.extraParams, {floor:btn.value,roomState:""});
                             store.load({params:{start:0, limit:20, page:1}}); 
                        }
                    }
                },
                menu:[
                    {
                        text:'退房清洁',
                        value:'退房清洁',
                        listeners: {
                            click: {
                                fn: function(btn){
                                    //alert(btn.value);
                                    var store =	btn.up('gridpanel').getStore();
                                    Ext.apply(store.proxy.extraParams, {floor:"",roomState:""});
                                    Ext.apply(store.proxy.extraParams, {floor:"三楼",roomState:btn.value});
                                    store.load({params:{start:0, limit:20, page:1}});
                                }
                            }
                        },
                    },
                    {
                        text:'房间服务',
                        value:'房间服务',
                        listeners: {
                            click: {
                                fn: function(btn){
                                    //alert(btn.value);
                                    var store =	btn.up('gridpanel').getStore();
                                    Ext.apply(store.proxy.extraParams, {floor:"",roomState:""});
                                    Ext.apply(store.proxy.extraParams, {floor:"三楼",roomState:btn.value});
                                    store.load({params:{start:0, limit:20, page:1}});
                                }
                            }
                        },
                    }
                ]
                
            },'->',
            {
                xtype: 'splitbutton',
                text: '四楼',
                tooltip : '四楼全部房间状态',
                iconCls: 'fa fa-university',
                value:'四楼',
                listeners: {
                    click: {
                        fn: function(btn){ 
                            //alert(btn.value);
                            var store =	btn.up('gridpanel').getStore();
                            Ext.apply(store.proxy.extraParams, {floor:"",roomState:""});
                            Ext.apply(store.proxy.extraParams, {floor:btn.value,roomState:""});
                            store.load({params:{start:0, limit:20, page:1}}); 
                        }
                    }
                },
                menu:[
                    {
                        text:'退房清洁',
                        value:'退房清洁',
                        listeners: {
                            click: {
                                fn: function(btn){
                                    //alert(btn.value);
                                    var store =	btn.up('gridpanel').getStore();
                                    Ext.apply(store.proxy.extraParams, {floor:"",roomState:""});
                                    Ext.apply(store.proxy.extraParams, {floor:"四楼",roomState:btn.value});
                                    store.load({params:{start:0, limit:20, page:1}});
                                }
                            }
                        },
                    },
                    {
                        text:'房间服务',
                        value:'房间服务',
                        listeners: {
                            click: {
                                fn: function(btn){
                                    //alert(btn.value);
                                    var store =	btn.up('gridpanel').getStore();
                                    Ext.apply(store.proxy.extraParams, {floor:"",roomState:""});
                                    Ext.apply(store.proxy.extraParams, {floor:"四楼",roomState:btn.value});
                                    store.load({params:{start:0, limit:20, page:1}});
                                }
                            }
                        },
                    }
                ]
                
            },'->',
            {
                xtype: 'splitbutton',
                text: '五楼',
                tooltip : '五楼全部房间状态',
                iconCls: 'fa fa-university',
                value:'五楼',
                listeners: {
                    click: {
                        fn: function(btn){ 
                             //alert(btn.value);
                             var store =btn.up('gridpanel').getStore();
                             Ext.apply(store.proxy.extraParams, {floor:"",roomState:""});
                             Ext.apply(store.proxy.extraParams, {floor:btn.value,roomState:""});
                             store.load({params:{start:0, limit:20, page:1}}); 
                        }
                    }
                },
                menu:[
                    {
                        text:'退房清洁',
                        value:'退房清洁',
                        listeners: {
                            click: {
                                fn: function(btn){
                                    //alert(btn.value);
                                    var store =	btn.up('gridpanel').getStore();
                                    Ext.apply(store.proxy.extraParams, {floor:"",roomState:""});
                                    Ext.apply(store.proxy.extraParams, {floor:"五楼",roomState:btn.value});
                                    store.load({params:{start:0, limit:20, page:1}});
                                }
                            }
                        },
                    },
                    {
                        text:'房间服务',
                        value:'房间服务',
                        listeners: {
                            click: {
                                fn: function(btn){
                                    //alert(btn.value);
                                    var store =	btn.up('gridpanel').getStore();
                                    Ext.apply(store.proxy.extraParams, {floor:"",roomState:""});
                                    Ext.apply(store.proxy.extraParams, {floor:"五楼",roomState:btn.value});
                                    store.load({params:{start:0, limit:20, page:1}});
                                }
                            }
                        },
                    }
                ]
                
            },'->',
            {
                xtype: 'splitbutton',
                text: '六楼',
                tooltip : '六楼全部房间状态',
                iconCls: 'fa fa-university',
                value:'六楼',
                listeners: {
                    click: {
                        fn: function(btn){ 
                             //alert(btn.value);
                             var store =	btn.up('gridpanel').getStore();
                             Ext.apply(store.proxy.extraParams, {floor:"",roomState:""});
                             Ext.apply(store.proxy.extraParams, {floor:btn.value,roomState:""});
                             store.load({params:{start:0, limit:20, page:1}}); 
                        }
                    }
                },
                menu:[
                    {
                        text:'退房清洁',
                        value:'退房清洁',
                        listeners: {
                            click: {
                                fn: function(btn){
                                    //alert(btn.value);
                                    var store =	btn.up('gridpanel').getStore();
                                    Ext.apply(store.proxy.extraParams, {floor:"",roomState:""});
                                    Ext.apply(store.proxy.extraParams, {floor:"六楼",roomState:btn.value});
                                    store.load({params:{start:0, limit:20, page:1}});
                                }
                            }
                        },
                    },
                    {
                        text:'房间服务',
                        value:'房间服务',
                        listeners: {
                            click: {
                                fn: function(btn){
                                    //alert(btn.value);
                                    var store =	btn.up('gridpanel').getStore();
                                    Ext.apply(store.proxy.extraParams, {floor:"",roomState:""});
                                    Ext.apply(store.proxy.extraParams, {floor:"六楼",roomState:btn.value});
                                    store.load({params:{start:0, limit:20, page:1}});
                                }
                            }
                        },
                    }
                ]
            },
            '->',
        ],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                itemId: 'userPaginationToolbar',
                displayInfo: true,
                bind: '{roomCleanContent}'
            }]
        }
    ]
});
