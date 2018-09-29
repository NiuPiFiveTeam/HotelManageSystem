Ext.define('Admin.model.finance.financeReport.FinanceReportModel',{
    extend: 'Admin.model.Base',
    idProperty:'month',
    fields: [
         {type: 'int'   ,name: 'month'}
        ,{type: 'int'   ,name: 'roomIncome'}
		,{type: 'int'	,name: 'logisticstCost'}
        ,{type: 'int'   ,name: 'salaryCost'}
        ,{type: 'int'   ,name: 'profit'}
    ]
});