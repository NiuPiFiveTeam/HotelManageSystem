Ext.define('Admin.view.logistics.inventory.InventoryViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.inventoryViewModel',

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
        In: {type: 'inGridStroe'},
        InSend:{type: 'inSendGridStroe'},
        Out:{type: 'outGridStroe'},
        Stock:{type: 'stockGridStroe'},
        ShowInDetailedWinGril:{type: 'showInDetailedWinGrilStroe'}
    }
});
