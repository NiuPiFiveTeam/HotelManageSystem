Ext.define('Admin.view.finance.financeReport.YearSelectController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.yearSelectController',

    
    searchFinanceReportByYear:function(combo,record,index){
      var searchField = this.lookupReference('searchYearForFinanceReport').getValue();
      var chart = Ext.getCmp('FinanceLineChart');
      var store = chart.getStore();
      chart.setCaptions({title:searchField + '年收支情况'});
      Ext.apply(store.proxy.extraParams, {year:searchField});
      store.load({params:{start:0, limit:20, page:1}});

      var totalIncome = 0,totalCost = 0,profit = 0;
      for(var i=0;i<store.getCount();i++){       
        var record = store.getAt(i);     
        totalIncome = totalIncome + record.get('roomIncome');
        totalCost = totalCost + record.get('logisticstCost') + record.get('salaryCost');
      }                                    
      profit = totalIncome - totalCost;
      var a = Ext.getCmp("ButtonShowFinanceReport");
      a.items.items[0].setHtml('总收入：' + (totalIncome/10000).toFixed(1) + '万');
      a.items.items[1].setHtml('总支出：' + (totalCost/10000).toFixed(1) + '万');
      a.items.items[2].setHtml('总利润：' + (profit/10000).toFixed(1) + '万');
    }
});
