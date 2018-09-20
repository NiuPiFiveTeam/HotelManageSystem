Ext.define('Admin.view.finance.cost.salary.LogisticstOrderViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.logisticstOrderViewModel',

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
		orderLists: {type: 'salaryOrderGridStroe'}
    }
});
