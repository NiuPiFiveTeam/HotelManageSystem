Ext.define('Admin.view.finance.income.RoomOrderViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.roomOrderViewModel',

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
		roomOrderLists: {type: 'roomOrderGridStroe'}
    }
});
