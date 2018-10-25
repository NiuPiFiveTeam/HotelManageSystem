Ext.define('Admin.view.room.lookvipguest.LookVipGuestViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.lookVipGuestViewModel',

    requires: [
        'Ext.data.Store',
        'Ext.data.proxy.Memory',
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Date',
        'Ext.data.field.Boolean',
        'Ext.data.reader.Json'
    ],

    stores: {
        
        vipguestList:{
            type: 'vipGuestStore',//Store reference ==Store的属性 alias: 'store.guestStore',	
        }
    }
});
