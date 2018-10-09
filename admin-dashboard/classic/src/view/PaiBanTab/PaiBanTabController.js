Ext.define('Admin.view.PaiBanTab.PaiBanTabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.paiBanTabController',

    onTabChange: function(tabs, newTab, oldTab) {
        Ext.suspendLayouts();
        newTab.setTitle('排班');
        oldTab.setTitle('排班表浏览');
        Ext.resumeLayouts(true);
    },
    submitAddCalendarForm:function(btn){
    var win    = btn.up('window');
		var form = win.down('form');
		var record = Ext.create('Admin.model.calendar.CalendarModel');
		var values  =form.getValues();//获取form数据
		record.set(values);
		record.save();
		Ext.data.StoreManager.lookup('calendarStore').load();
		win.close();
    },
    submitEditCalendarForm:function(btn){
        var win    = btn.up('window');
        var store = Ext.data.StoreManager.lookup('calendarStore');
        var values  = win.down('form').getValues();//获取form数据
        var record = store.getById(values.id);//获取id获取store中的数据
        record.set(values);//rest put 
        store.load();
        win.close();
    }
});