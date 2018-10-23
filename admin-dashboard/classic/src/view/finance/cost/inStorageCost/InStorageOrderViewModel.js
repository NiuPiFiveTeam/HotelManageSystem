Ext.define('Admin.view.finance.cost.inStorageCost.InStorageOrderViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.inStorageOrderViewModel',
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
    	inStorageOrderStore: {type: 'inStorageOrderStore'}
    }
});
