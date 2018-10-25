Ext.define('Admin.view.travel.TravelTab', {
    extend: 'Ext.tab.Panel',
    xtype: 'travelTab',
    //controller: 'paiBanTabController',
    //controller: 'travelTabController',
    requires: [
        'Ext.tab.Panel'
    ],

    items: [{
        xtype: 'panel',
        title: '出差管理',
        xtype : 'travelGridPanel'
     
    },{
        xtype: 'panel',
      
        title: '出差审批',
        xtype : 'travelApproveGrid'
    }
                        
           
    ]

});