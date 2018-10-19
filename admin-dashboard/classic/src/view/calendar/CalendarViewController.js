Ext.define('Admin.view.calendar.CalendarViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.calendarViewController',
    //open add window
    openAddCalendarWindow:function(toolbar, rowIndex, colIndex){
    	toolbar.up('panel').up('panel').up('container').add(Ext.widget('calendarAddWindow')).show();
    },

    //提交表单 adddept 
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
    },
    
    openEditCalendarWindow:function(grid, rowIndex, colIndex){
        var win = grid.up('panel').up('panel').up('container').add(Ext.widget('calendarEditWindow'));
        win.show();
        // var form = this.lookupReference('EditCalendarForm').getForm();
        var form = win.down('form').getForm();
        for(var i=0;i<form.getFields().length;i++){

        var pro = form.getFields().get(i).getName(); //遍历属性名 
            
        var rec = grid.getStore().getAt(rowIndex); 
        
        form.findField(pro).setValue(rec.get(pro)); //设置值
        }
    },
    submitEditCalendarForm:function(btn){
        var win    = btn.up('window');
        var store = Ext.data.StoreManager.lookup('calendarStore');
        var values  = win.down('form').getValues();//获取form数据
        var record = store.getById(values.id);//获取id获取store中的数据
        record.set(values);//rest put 
        store.load();
        win.close();
    },
    onDeleteCalendarButton:function(grid, rowIndex, colIndex){
        var store = grid.getStore();
        var record = store.getAt(rowIndex);
        Ext.MessageBox.confirm('提示', '确定要进行删除操作吗？数据将无法还原！',function(btn, text){
        if(btn=='yes'){
            store.remove(record);
        }
        }, this);
    }

    

});