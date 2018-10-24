Ext.define('Admin.store.finance.financeReport.FinanceReportSelectYearStore', {
    extend: 'Ext.data.Store',
    alias: 'store.financeReportSelectYearStore',

    model: 'Admin.model.finance.financeReport.FinanceReportSelectYearModel',
    storeId: 'financeReportSelectYearStore',

    proxy: {
        type: 'ajax',
        url: 'financeReport/findAllYear',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: 'true'
});