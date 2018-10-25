Ext.define('Admin.view.room.lookCheckInGuest.LookCheckInGuestViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.lookCheckInGuestViewModel',

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
        checkInGuestList:{
            type: 'checkInGuestStore',//Store reference ==Store的属性 alias: 'store.guestStore',	
        }
    }
});
