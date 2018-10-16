Ext.define('Admin.view.finance.cost.salaryCost.SalaryCostViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.salaryCostViewModel',
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
    	salaryOrderGridStroe: {type: 'salaryOrderGridStroe'}
    }
});
