Ext.define('Admin.view.PaiBanTab.PaiBanTab', {
    extend: 'Ext.panel.Panel',
    xtype: 'paiBanTab',
    controller: 'paiBanTabController',
    requires: [
        'Ext.tab.Panel'
    ],
    autoHeight : true,
    region: "center",
    border: false,
    frame: true,
    autoWidth: true,
    defaults: {
        bodyPadding: 10,
        scrollable: true
    },
    items: [{
         xtype: 'tabpanel',
         region: 'center',
         id : 'paibanTabPanel',
         defaults: {
                 autoScroll: true,    //是否有滚动条
                 bodyPadding: 5
                  },
         items: [
                 {
                   xtype: 'panel',
                   id : 'lookPaiban',
                   title: '排班表浏览',
                   items: [{xtype : 'calendar-days-view'}]
             },
                           
             {
                 xtype: 'panel',
                 id: 'editPaiban',
                  title: '排班',
                  items: [{xtype : 'calendar-panel-Daysweek'}]
              },
             {
                 xtype: 'panel',
                 id: 'editCalendar',
                  title: '排班类别',
                  items: [{xtype : 'calendarCenterPanel'}]
              }
                        
           ]
     }],


    listeners: {
        tabchange: 'onTabChange'
    }
});