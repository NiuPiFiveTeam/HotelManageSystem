Ext.define('Admin.view.finance.financeReport.FinanceReport', {
    extend: 'Ext.panel.Panel',
    xtype: 'financeReport',
    requires: [
        'Ext.layout.container.Border'
    ],

    layout: 'border',
    height: 600,

    defaults: {
        collapsible: false,
        split: true,
    },

    items: [
        {
            region: 'north',
            height: 50,
            html: '<p>Footer content</p>',
            layout: 'border',

            defaults: {
                collapsible: false
            }, 
            items:[{
                region: 'west',
                flex:1,
                xtype:'yearSelect',
                
            },{
                region: 'center',
                flex:1,
                height: 100,
                xtype:'buttonShowFinanceReport'
            }]
        },
        {
            region:'center',
            height: 550,
            html: '<p>Footer content</p>',
            layout: 'border',
            defaults: {
                collapsible: false,
                split: true,
            },
            items:[{
                region: 'west',
                flex:3,
                xtype:'lineCharts'
            },{
                region: 'center',
                flex:2,
                xtype:'pieCharts'
            }]
        }
    ]
});