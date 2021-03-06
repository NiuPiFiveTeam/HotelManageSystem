Ext.define('Admin.view.travel.travelList.TravelViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.travelViewModel',
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
        travelLists: {type: 'travelStore'}
    }
});
