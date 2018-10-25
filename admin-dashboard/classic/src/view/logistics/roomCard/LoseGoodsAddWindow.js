Ext.define('Admin.view.logistics.roomCard.LoseGoodsAddWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.loseGoodsAddWindow',
    height: 250,
    minHeight: 100,
    minWidth: 300,
    width: 450,
    scrollable: true,
    title: '添加库存种类',
    closable: true,
    constrain: true,
    viewModel: {type: 'roomCleanViewModel'},
    defaultFocus: 'textfield',
    modal:true,
    layout:'anchor',
    items: [{
      xtype: 'form',
      layout: 'form',
      padding: '10px',
      ariaLabel: 'Enter your name',
      items: [
              {
              xtype: 'textfield',
              hidden: true,
              fieldLabel: '物品编号',
              name:'id'
              },
              {
              xtype: 'textfield',
              fieldLabel: '遗漏物品名',
              name:'goodsName'
              }
              ,{
              xtype: 'textfield',
              fieldLabel: '遗漏物品描述',
              name:'goodsRepresent'
              },
              {
              xtype: 'textfield',
              fieldLabel: '遗漏物品拾取人',
              name:'goodsPut'
              },
              {
              xtype: 'textfield',
              fieldLabel: '遗漏物品领取人',
              hidden: true,
              name:'goodsGet'
              },
              {
              xtype: 'textfield',
              fieldLabel: '领取人身份证号',
              hidden: true,
              name:'goodsGetNo'
              },
              {
              xtype: 'textfield',
              fieldLabel: '领取人电话号码',
              hidden: true,
              name:'goodsGetPhone'
              }
]
    }],
	  buttons: ['->',{
        xtype: 'button',
        text: 'Submit',
        handler: function(btn) {  
            var win    = btn.up('window');
            var form = win.down('form');
            var values  =form.getValues();//获取form数据
            var goodsName = values.goodsName;
            var goodsRepresent=values.goodsRepresent;
            var goodsPut=values.goodsPut;
            var goodsGet = "";
            var goodsGetNo="";
            var goodsGetPhone="";
            if(goodsName==""||goodsRepresent==""||goodsPut==""){
              btn.up('window').close();
              alert("信息不能为空");
            };
            var record = Ext.create('Admin.model.logistics.roomCard.RoomCardModel');
            record.set(values);
            record.save();
            btn.up('window').close();
            Ext.getCmp("Lose").store.reload();
            alert("添加成功");
		}
    },{
        xtype: 'button',
        text: 'Close',
        handler: function(btn) {
            btn.up('window').close();
        }
    },'->']
});