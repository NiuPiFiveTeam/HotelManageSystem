Ext.define('Admin.view.logistics.inventory.InSendAddWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.inSendAddWindow',
    requires: [
      'Ext.grid.Panel',
      'Ext.toolbar.Paging',
      'Ext.grid.column.Date',
      'Ext.form.field.ComboBox',
      'Ext.form.field.Date',
    ],
    //viewModel: {type: 'inventoryViewModel'},
    height: 500,
    minHeight: 100,
    minWidth: 300,
    width: 800,
    closable:false,
    layout: 'fit',
    //scrollable: true,
    title: '申请入库',
    closable: true,
    constrain: true,
    items: [{
        xtype: 'form',
        layout: 'fit',
        items: [
          {
            xtype: 'gridpanel',
            cls: 'user-grid',
            bind: '{Stock}',
            id:"InSendAddWindowsGrid",
            scrollable: true,
            plugins: {
                ptype: 'cellediting',
                clicksToEdit: 1
            },
            viewConfig:{
                forceFit:false,
                emptyText:"<div style='text-align:center;padding:8px;font-size:16px;'>无物品需申请进货</div>",
                deferEmptyText:false,},
            columns: [
              {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'goodsName',text: '商品名', align:'center',flex: 1},
              {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'unit',  text: '单位', align:'center',flex: 1},
              {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'amount',  text: '申请入库数量', align:'center',flex: 1,
                editor:{  
                    allowBlank:false 
                    },
                emptyCellText:200,
              },
              {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'stockType',  text: '类型', align:'center',flex: 1},
              {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'goodsNo',  text: '物品编号', align:'center',flex: 1},
            ],
            tbar:[
                '->',{
                    text: '点击生成入库编号,并设置默认入库数量',
                    id:'makeId',
                    tooltip: '点击生成入库编号,并设置默认入库数量',
                    reference:'doNot',
                    listeners:{
                      click: {
                        fn: function(btn){
                          var store=btn.up('gridpanel').getStore();
                          var Count =	store.getCount(); 
                          if(Count<1){
                            alert("无物品需申请进货");
                          }
                          else{
                            for(var i=0;i<Count;i++){
                              store.getAt(i).set("amount",200);
                            };
                            var no =Ext.util.Format.date(new Date(),"Ymd")+Math.floor(Math.random()*(99999999-10000000+1)+10000000);
                            Ext.getCmp("makeId").setText(no);true
                            Ext.getCmp('orderGridPanelRemove').setDisabled(false);
                          }
                        }
                      }
                    }
                  },'->'
            ],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                itemId: 'userPaginationToolbar',
                displayInfo: true,
                bind: '{Stock}'
            }]
        },
        ]
      }],
    defaultFocus: 'textfield',
    modal:true,
    buttons: ['->',{
        xtype: 'button',
        text: 'Submit',
        disabled: true,
        id: 'orderGridPanelRemove',
        handler: function(btn) {  
            var inStorageId=Ext.getCmp('makeId').getText();
            var a=Ext.getCmp('InSendAddWindowsGrid').getStore();
            var list=[];
            Ext.each(a.getRange(), function(record) {
                list.push(record.data);
            });
            var listString=Ext.util.JSON.encode(list);
            console.log(listString);
            Ext.Ajax.request({
                url: '/InSend',
                method: 'post',
                params: {
                    inStorageId:inStorageId,
                    listString:listString
                },
                success: function(response, options) {
                    var json = Ext.util.JSON.decode(response.responseText);
                    if (json.success) {
                        var store=Ext.getCmp('Stock').store;
                        Ext.apply(store.proxy.extraParams, {amount:10,yesOrNoSend:'未申请'});
                        store.load({params:{start:0, limit:20, page:1}});
                        Ext.Msg.alert('成功信息', "添加成功");
                    } else {
                        var store=Ext.getCmp('Stock').store;
                        Ext.apply(store.proxy.extraParams, {amount:10,yesOrNoSend:'未申请'});
                        store.load({params:{start:0, limit:20, page:1}});
                        Ext.Msg.alert('添加失败', json.msg);
                    }
                }
            });
            
            btn.up('window').close();

    }
    },{
        xtype: 'button',
        text: 'Close',
        handler: function(btn) {
            Ext.getCmp('Stock').store.reload();
            btn.up('window').close();
        }
    },'->']
  });
  