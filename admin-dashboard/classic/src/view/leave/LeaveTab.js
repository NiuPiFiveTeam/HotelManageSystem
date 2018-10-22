Ext.define('Admin.view.leave.LeaveTab', {
    extend: 'Ext.tab.Panel',
    xtype: 'leaveTab',
    controller: 'leaveViewController',
    requires: [
        'Ext.tab.Panel'
    ],

    items: [{
        xtype: 'panel',
        title: '申请请假',
        xtype : 'leaveGridPanel'
     
    },{
        xtype: 'panel',
      
        title: '请假审批',
        xtype : 'leaveApproveGrid'
    }
                        
           
    ]

});