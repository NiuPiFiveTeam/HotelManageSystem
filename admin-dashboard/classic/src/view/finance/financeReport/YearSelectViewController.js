Ext.define('Admin.view.finance.financeReport.YearSelectController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.yearSelectController',

    
    searchFinanceReportByYear:function(combo,record,index){
        var searchField = this.lookupReference('searchYearForFinanceReport').getValue();
        var chart = Ext.getCmp("FinanceLineChart")
        var store = chart.getStore();
        chart.setCaptions({
            title: searchField + '年收支情况'
        });

        Ext.apply(store.proxy.extraParams, {year:searchField});
        store.load({params:{start:0, limit:20, page:1}});
    }
});
