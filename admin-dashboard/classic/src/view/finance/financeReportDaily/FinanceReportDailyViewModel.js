Ext.define('Admin.view.finance.cost.inStorage.FinanceReportDailyViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.financeReportDailyViewModel',
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
    	financeReportDailyStore: {type: 'financeReportDailyStore'}//调用组件2
    }
});
