Ext.define('Admin.store.finance.financeReport.FinanceReportStore2', {
    extend: 'Ext.data.Store',
    alias: 'store.financeReportStore2',

    fields: ['type', 'data' ],
    data: [
        { type: '客房收入', data: 33.33 },
        { type: '后勤支出', data: 33.33 },
        { type: '工资支出', data: 33.33 },
    ]

});