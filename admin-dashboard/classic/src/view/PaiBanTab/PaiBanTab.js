Ext.define('Admin.view.PaiBanTab.PaiBanTab', {
    extend: 'Ext.tab.Panel',
    xtype: 'paiBanTab',
    controller: 'paiBanTabController',
    requires: [
        'Ext.tab.Panel'
    ],

    items: [{
                   xtype: 'panel',
                   id : 'lookPaiban',
                   title: '排班表浏览',
                   xtype : 'paiBanCenterPanel'
             },
                           
             {
                 xtype: 'panel',
                 id: 'editPaiban',
                  title: '排班',
                  xtype : 'calendar-panel-Daysweek'
              },
             {
                 xtype: 'panel',
                 id: 'editCalendar',
                  title: '排班类别',
                  xtype : 'calendarCenterPanel'
              }
                        
           
     ],


    // listeners: {
    //     tabchange: 'onTabChange'
    // }
});