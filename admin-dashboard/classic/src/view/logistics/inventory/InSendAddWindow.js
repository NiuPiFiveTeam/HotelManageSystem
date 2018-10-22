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
            plugins:[  
                Ext.create('Ext.grid.plugin.CellEditing',{  
                    clicksToEdit:2 //设置单击单元格编辑  
                })  
            ],
            viewConfig:{
                forceFit:false,
                emptyText:"<div style='text-align:center;padding:8px;font-size:16px;'>无物品需申请进货</div>",
                deferEmptyText:false,},
            columns: [
              {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'goodsName',text: '商品名', align:'center',flex: 1},
              {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'unit',  text: '单位', align:'center',flex: 1},
              {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'sendAmount',  text: '申请入库数量', align:'center',flex: 1,
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
                    text: '点击生成入库编号',
                    id:'makeId',
                    tooltip: '点击生成入库编号',
                    reference:'doNot',
                    listeners:{
                      click: {
                        fn: function(btn){
                          var store =	btn.up('gridpanel').getStore().getCount(); 
                          if(store<1){
                            alert("无物品需申请进货");
                          }
                          else{
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
            var win  = btn.up('window');
            var form = win.down('form');
            var values  =form.getValues();//获取form数据
            var tagfields = values.tagfield;
            var addReason=values.addReason;
            Ext.Msg.alert(addReason,tagfields);
    }
    },{
        xtype: 'button',
        text: 'Close',
        handler: function(btn) {
            btn.up('window').close();
        }
    },'->']
  });
  