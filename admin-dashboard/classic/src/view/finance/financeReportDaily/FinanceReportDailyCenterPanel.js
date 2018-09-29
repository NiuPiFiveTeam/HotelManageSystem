Ext.define('Admin.view.finance.financeReportDaily.FinanceReportDailyCenterPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'financeReportDaily',
	layout:'fit',
    // margin: '20 20 20 20',
	controller: 'financeReportDailyViewController',
 	viewModel : { type: 'financeReportDailyViewModel'},
	items: [{xtype:'financeReportDailyGrid'}]
});
 