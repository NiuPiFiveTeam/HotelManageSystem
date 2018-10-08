Ext.define('Admin.store.finance.financeReport.FinanceReportStore', {
    extend: 'Ext.data.Store',

    alias: 'store.financeReportStore',
    storeId:'financeReportStore',
    model:'Admin.model.finance.financeReport.FinanceReportModel',

    proxy: {
        // type: 'memory',  //内存代理
        type: 'rest',
        url: '/financeReport',  //mvc url  xxx.json
        reader:{
            type:'json',
            rootProperty:'content',//对应后台返回的结果集名称
            totalProperty: 'totalElements'//分页需要知道总记录数
        },
        writer: {
            type: 'json'
        },
        simpleSortMode: true    //简单排序模式
    },

    autoLoad: 'true',
    autoSync: true,//连后台后修改sotre数据自动触发rest请求

    remoteSort: true,//全局排序  
    pageSize: 15,
    
    sorters: {
        direction: 'DESC',
        property: 'financeReportDailyId'
    }

    // constructor: function (config) {
    //     config = config || {};

    //     config.data = [
    //         { month: '1', roomIncome: 20000, logisticstCost: 37000, salaryCost: 30005,profit:32323},
    //         { month: '2', roomIncome: 20000, logisticstCost: 37000, salaryCost: 30005 ,profit:32323},
    //         { month: '3', roomIncome: 20000, logisticstCost: 37000, salaryCost: 30005,profit:32323},
    //         { month: '4', roomIncome: 20000, logisticstCost: 37000, salaryCost: 30005,profit:32323},
    //         { month: '5', roomIncome: 20000, logisticstCost: 37000, salaryCost: 30005 ,profit:32323},
    //         { month: '6', roomIncome: 20000, logisticstCost: 37000, salaryCost: 30005 ,profit:32323},
    //         { month: '7', roomIncome: 20000, logisticstCost: 37000, salaryCost: 30005 ,profit:32323},
    //         { month: '8',roomIncome: 20000, logisticstCost: 37000, salaryCost: 30005 ,profit:32323},
    //         { month: '9', roomIncome: 20000, logisticstCost: 37000, salaryCost: 30005 ,profit:32323},
    //         { month: '10', roomIncome: 20000, logisticstCost: 37000, salaryCost: 30005  ,profit:32323},
    //         { month: '11', roomIncome: 20000, logisticstCost: 37000, salaryCost: 30005 ,profit:32323},
    //         { month: '12', roomIncome: 20000, logisticstCost: 37000, salaryCost: 30005,profit:32323},
    //     ];

    //     this.callParent([config]);
    // }

});