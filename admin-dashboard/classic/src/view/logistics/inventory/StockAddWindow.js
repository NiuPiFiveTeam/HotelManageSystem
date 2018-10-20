Ext.define('Admin.view.logistics.inventory.StockAddWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.stockAddWindow',
    height: 250,
    minHeight: 100,
    minWidth: 300,
    width: 450,
    scrollable: true,
    title: '添加库存种类',
    closable: true,
    constrain: true,

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
          fieldLabel: 'id',
          value:0,
          name:'id'
        }
        ,{
          xtype: 'textfield',
          fieldLabel: '商品名',
          emptyText: '杜敬威牌牙刷',
          name:'goodsName'
      },{//库存物品类型搜索条件
        xtype: 'combobox',
        fieldLabel:'单位',
        name:'unit',
        //hideLabel: true,
        //reference:'searchStockTyp',//用于获取选框信息
        store:Ext.create("Ext.data.Store", {
        fields: ["name", "value"],
        data: [
            { name: '打', value: '打' },
            { name: '只', value: '只' },
            { name: '条', value: '条' },
            { name: '个', value: '个' },
            { name: '瓶', value: '瓶' },
            { name: '张', value: '张' },
              ]
          }),
        displayField: 'name',
        valueField:'value',
        editable: false,
        queryMode: 'local',
        triggerAction: 'all',
        emptyText: '选择单位',
      },{//库存物品类型搜索条件
        xtype: 'combobox',
        fieldLabel:'物品类型',
        name:'stockType',
        //hideLabel: true,
        //reference:'searchStockTyp',//用于获取选框信息
        store:Ext.create("Ext.data.Store", {
        fields: ["name", "value"],
        data: [
            { name: '日用品', value: 'COMMODITY' },
            { name: '耐久品', value: 'DURABLE' },
              ]
          }),
        displayField: 'name',
        valueField:'value',
        editable: false,
        queryMode: 'local',
        triggerAction: 'all',
        emptyText: '选择库存物品类型',
      },{
      xtype: 'textfield',
      fieldLabel: '数量',
      hidden: true,
      name:'amount',
      value:0,
  }]
    }],
	  buttons: ['->',{
        xtype: 'button',
        text: 'Submit',
        handler: function(btn) {  
            var win    = btn.up('window');
            var form = win.down('form');
            var values  =form.getValues();//获取form数据
            var stockType = values.stockType;
            var goodsName=values.goodsName;
            var unit=values.unit;
            var stockType = values.stockType;
            var amount=values.amount;
            if(stockType==""||goodsName==""||unit==""){
              btn.up('window').close();
              alert("信息不能为空");
            };
            var record = Ext.create('Admin.model.logistics.inventory.StockModel');
            record.set(values);
            record.save();
            btn.up('window').close();
            Ext.getCmp("Stock").store.reload();
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