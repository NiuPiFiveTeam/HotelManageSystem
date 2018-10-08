Ext.define('Admin.view.finance.financeReport.ButtonShowFinanceReport', {
    extend: 'Ext.panel.Panel',
    xtype: 'buttonShowFinanceReport',
    // controller: 'yearSelectController',
    requires: [
        'Ext.layout.container.Table'
    ],

    profiles: {
        classic: {
            bodyStyle: ''
        },
        neptune: {
            bodyStyle: ''
        },
        graphite: {
            bodyStyle: 'background-color: #6d6d6d'
        }
    },
    
    width: 500,
    height: 400,

    layout: {
        type: 'table',
        columns: 3,
        tableAttrs: {
            style: {
                width: '100%'
            }
        }
    },

    scrollable: true,

    defaults: {
        bodyPadding: '15 20',
        border: true,
        bodyStyle: ""
    },

    items: [ 
        {
            html: '总收入：'
        },  
        {
            html: '总支出：',
        },
        {
            html: '总利润：'
        }
    ]
});