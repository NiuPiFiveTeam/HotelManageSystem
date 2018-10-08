Ext.define('Admin.view.logistics.roomClean.SendWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.sendWindow',
    height: 180,
    minHeight: 100,
    minWidth: 300,
    width: 500,
    scrollable: true,
    title: '送客人需要物品',
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
            xtype: 'tagfield',
            fieldLabel: '选择客人需要的物品',
            store:Ext.create("Ext.data.Store", {
                fields: ['id',"name", "value"],
                data: [
                    { id:0,name: '热水壶', value: 'kettle' },
                    { id:1,name: '柜子', value: 'sark' },
                    { id:2,name: '电灯泡', value: 'bulb' },
                    { id:3,name: '床', value: 'bed' },
                ]
            }),
            name:'tagfield',
            reference: 'names',//用于别人打点获取该组件的值
            displayField: 'name',//选框显示的值
            valueField: 'name',//用于别人打点获取到的组件的值
            filterPickList: true,//隐藏已选项
            queryMode: 'local',//数据来源
            publishes: 'value'
        }]
    }],
	buttons: ['->',{
        xtype: 'button',
        text: 'Submit',
        handler: function(btn) {  
            var win = btn.up('window');
            var form = win.down('form');
            var values  =form.getValues();//获取form数据
            var tagfields = values.tagfield;
            Ext.Msg.alert("选择客人需要的物品",tagfields);
		}
    },{
        xtype: 'button',
        text: 'Close',
        handler: function(btn) {
            btn.up('window').close();
        }
    },'->']
});
