Ext.define('Admin.view.bcardApprove.BcardApproveViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.bcardApproveViewModel',
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
    	bcardApproveStore: {type: 'bcardApproveStore'}//调用组件2
    }
});
