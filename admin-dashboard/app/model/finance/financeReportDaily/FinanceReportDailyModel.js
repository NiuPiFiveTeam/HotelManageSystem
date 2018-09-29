Ext.define('Admin.model.finance.financeReportDaily.FinanceReportDailyModel', {
    extend: 'Admin.model.Base',
    idProperty:'financeReportDailyId',
    fields: [
         {type: 'int',name: 'financeReportDailyId'}
		,{type: 'date'	 ,name: 'date'}
        ,{type: 'int'   ,name: 'roomIncome'}
		,{type: 'int'	 ,name: 'logisticstCost'}
        ,{type: 'int'   ,name: 'salaryCost'}
		,{type: 'int'   ,name: 'totalIncome'}
        ,{type: 'int'   ,name: 'totalCost'}
        ,{type: 'int'   ,name: 'profit'}
    ]
});