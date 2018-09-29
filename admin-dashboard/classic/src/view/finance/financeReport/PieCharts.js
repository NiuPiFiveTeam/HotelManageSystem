Ext.define('Admin.view.finance.financeReport.PieCharts', {
    extend: 'Ext.panel.Panel',
    xtype: 'pieCharts',
    controller: 'pieChartsViewController',

    // width: 650,
    items: [{
        xtype: 'polar',
        reference: 'chart',
        id: 'FinanceRateChart',
        captions: {
            title: '2018年收支情况',
        },
        // theme: 'default-gradients',
        width: '100%',
        height: 550,
        // insetPadding: 10,
        insetPadding:{top:-40,right:-20},
        innerPadding: 30,
        store: {
            type: 'financeReportStore2'
        },
        legend: {
            docked: 'top'
        },
        interactions: ['rotate'],
        series: [{
            type: 'pie',
            angleField: 'data',
            label: {
                field: 'type',
                calloutLine: {
                    length: 60,
                    width: 3
                    // specifying 'color' is also possible here
                }
            },
            highlight: true,
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesTooltipRender'
            }
        }]
    }]
});