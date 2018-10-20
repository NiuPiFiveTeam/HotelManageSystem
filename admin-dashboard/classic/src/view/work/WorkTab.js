Ext.define('Admin.view.work.WorkTab', {
    extend: 'Ext.tab.Panel',
    xtype: 'workTab',
    //controller: 'paiBanTabController',
    requires: [
        'Ext.tab.Panel'
    ],

    items: [{
        xtype: 'panel',
        title: '打卡',
        xtype : 'workCenterPanel'
     
    },{
        xtype: 'panel',
      
        title: '统计',
        xtype : 'attenceCenterPanel'
    },{
        xtype: 'panel',
       
        title: '历史',
        xtype : ''
    }
                        
           
    ]

});