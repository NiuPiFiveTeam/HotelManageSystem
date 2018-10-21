Ext.define('Admin.view.leave.LeaveTab', {
    extend: 'Ext.tab.Panel',
    xtype: 'leaveTab',
    //controller: 'paiBanTabController',
    requires: [
        'Ext.tab.Panel'
    ],

    items: [{
        xtype: 'panel',
        title: '申请请假',
        xtype : 'workCenterPanel'
     
    },{
        xtype: 'panel',
      
        title: '请假审批',
        xtype : 'attenceCenterPanel'
    }
                        
           
    ]

});