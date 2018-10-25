Ext.define('Admin.view.travel.travelApprove.TravelApproveViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.travelApproveViewModel',
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
    	travelApproveStore: {type: 'travelApproveStore'}//调用组件2
    }
});
