Ext.define('Admin.view.logistics.inventory.ShowInDetailed', {
    extend: 'Ext.window.Window',
    alias: 'widget.showInDetailed',
    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
      ],
      height: 500,
      minHeight: 100,
      minWidth: 300,
      width: 800,
      closable:false,
      layout: 'fit',
      title: '申请入库详细物品',
      closable: true,
      constrain: true,
      items: [{
          xtype: 'form',
          layout: 'fit',
          items: [
            {
                xtype: 'textfield',
                name:'inStorageId',
                id:"ddd",
                hidden :true
  
            },
            {
              xtype: 'gridpanel',
              cls: 'user-grid',
              bind: '{ShowInDetailedWinGril}',
              id:"showInDetailedWinGril",
              scrollable: true,
              columns: [
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'goodsName',text: '商品名', align:'center',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'unit',  text: '单位', align:'center',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'amount',  text: '申请入库数量', align:'center',flex: 1,},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'stockType',  text: '类型', align:'center',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'goodsNo',  text: '物品编号', align:'center',flex: 1},
              ],
              tbar:[
                "->",{
                    text:"显示该条入库记录的详细物品",
                    handler:function(){
                      var inStorageId=Ext.getCmp("ddd").getValue();
                      var store=Ext.getCmp('showInDetailedWinGril').store;
                      Ext.apply(store.proxy.extraParams, {InStorageId:inStorageId});//传送到DTO
                      store.load({params:{start:0, limit:10, page:1}});
                      alert(inStorageId);
                    }
              },"->"
            ],
              dockedItems: [{
                  xtype: 'pagingtoolbar',
                  dock: 'bottom',
                  itemId: 'userPaginationToolbar',
                  displayInfo: true,
                  bind: '{ShowInDetailedWinGril}'
              }]
          },
          ]
        }],
      defaultFocus: 'textfield',
      modal:true,
      buttons: ['->',{
          xtype: 'button',
          text: 'Close',
          handler: function(btn) {
              btn.up('window').close();
          }
      },'->']
  });