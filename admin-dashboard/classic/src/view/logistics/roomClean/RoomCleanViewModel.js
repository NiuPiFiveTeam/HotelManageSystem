Ext.define('Admin.view.logistics.roomClean.RoomCleanViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.roomCleanViewModel',

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
		roomCleanContent: {type: 'roomCleanGridStroe'}
    }
});
