Ext.define('Admin.view.finance.financeReport.LineChartsViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.lineChartsViewController',

    onAxisLabelRender: function (axis, label, layoutContext) {
        return (label/10000).toFixed(2) + '万';
    },

    onSeriesTooltipRender: function (tooltip, record, item) {
        var title = item.series.getTitle();
        tooltip.setHtml(record.get('month') + '月 ' + title + ': ' + 
            record.get(item.series.getYField()));

        var chart = Ext.getCmp("FinanceRateChart"),
            store = chart.getStore();
        var searchField = Ext.getCmp('searchYearForFinanceReport').getValue();
        if(searchField == '请选择时间'){
            searchField = '2018';
        }
        chart.setCaptions({
            title: searchField + '年' + record.get('month') + '月 ' + '收支情况'
        });


        var total = record.get('roomIncome') + record.get('logisticstCost') + record.get('salaryCost');
        var roomIncomePercent = (record.get('roomIncome') / total * 100).toFixed(2);
        var logisticstCostPercent = (record.get('logisticstCost') / total *100).toFixed(2);
        var salaryCostPercent = (record.get('salaryCost') / total*100).toFixed(2) ;

        store.setData([
            { type: '客房收入', data: roomIncomePercent },
            { type: '后勤支出', data: logisticstCostPercent },
            { type: '工资支出', data: salaryCostPercent }
        ]);
    },

    // onColumnRender: function (v) {
    //     return v + '%';
    // },

    // onToggleMarkers: function () {
    //     var chart = this.lookup('chart'),
    //         seriesList = chart.getSeries(),
    //         ln = seriesList.length,
    //         i = 0,
    //         series;

    //     for (; i < ln; i++) {
    //         series = seriesList[i];
    //         series.setShowMarkers(!series.getShowMarkers());
    //     }

    //     chart.redraw();
    // },

    // onPreview: function () {
    //     if (Ext.isIE8) {
    //         Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
    //         return;
    //     }
    //     var chart = this.lookup('chart');
    //     chart.preview();
    // }

});