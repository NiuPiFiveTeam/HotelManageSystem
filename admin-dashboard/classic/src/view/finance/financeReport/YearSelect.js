Ext.define('Admin.view.finance.financeReport.YearSelect', {
    extend: 'Ext.form.Panel',
    xtype: 'yearSelect',
    controller: 'yearSelectController',

    items:[{
        xtype: 'combobox',
        fieldLabel: '可选择年份',
        labelAlign: 'right',
        width: 223,
        reference:'searchYearForFinanceReport',
        id:'searchYearForFinanceReport',
        editable: false,
        queryMode: 'remote',
        store: {
            type: 'financeReportSelectYearStore'
        },
        displayField: 'year',
        valueField:'year',
        value:'请选择时间',
        listeners:{
            select:'searchFinanceReportByYear'
        }
    }]
});