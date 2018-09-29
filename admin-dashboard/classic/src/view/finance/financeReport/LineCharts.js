Ext.define('Admin.view.finance.financeReport.LineCharts', {
    extend: 'Ext.panel.Panel',
    xtype: 'lineCharts',
    controller: 'lineChartsViewController',

    // width: 650,

    items: [{
        xtype: 'cartesian',
        reference: 'chart',
        width: '100%',
        height: 500,
        captions: {
            title: '2018年收支情况',
        },
        legend: {       //图例、说明
            type: 'sprite',
            docked: 'top'
        },
        store: {
            type: 'financeReportStore'
        },
        // captions: {
        //     title: 'Line Charts - Marked Lines',
        //     credits: {
        //         text: 'Data: Browser Stats 2012\n' +
        //             'Source: http://www.w3schools.com/',
        //         align: 'left'
        //     }
        // },
        axes: [{
            type: 'numeric',
            fields: ['roomIncome', 'logisticstCost', 'salaryCost','profit'],
            position: 'left',
            // grid: true,
            minimum: 0,
            renderer: 'onAxisLabelRender' //渲染Y轴
        }, {
            type: 'category',
            fields: 'month',
            position: 'bottom',
            grid: true,
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }],
        series: [{
            type: 'line',
            title: '客房收入',
            xField: 'month',
            yField: 'roomIncome',
            marker: {               //箭头类型
                type: 'square',
                animation: {
                    duration: 200,
                    easing: 'backOut'
                }
            },
            highlightCfg: {
                scaling: 2
            },
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesTooltipRender'
            },
        }, {
            type: 'line',
            title: '后勤支出',
            xField: 'month',
            yField: 'logisticstCost',
            marker: {
                type: 'triangle',
                animation: {
                    duration: 200,
                    easing: 'backOut'
                }
            },
            highlightCfg: {
                scaling: 2
            },
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesTooltipRender'
            }
        }, {
            type: 'line',
            title: '工资支出',
            xField: 'month',
            yField: 'salaryCost',
            marker: {
                type: 'arrow',
                animation: {
                    duration: 200,
                    easing: 'backOut'
                }
            },
            highlightCfg: {
                scaling: 2
            },
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesTooltipRender'
            }
        }, {
            type: 'line',
            title: '总利润',
            xField: 'month',
            yField: 'profit',
            marker: {
                type: 'cross',
                animation: {
                    duration: 200,
                    easing: 'backOut'
                }
            },
            highlightCfg: {
                scaling: 2
            },
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesTooltipRender'
            }
        }]
    }]
});