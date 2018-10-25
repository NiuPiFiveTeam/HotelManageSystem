Ext.define('Admin.view.work.WorkTab', {
    extend: 'Ext.tab.Panel',
    xtype: 'workTab',
    //controller: 'workTabController',

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
        xtype : 'empworkYearchart'
    },{
        xtype: 'panel',
       
        title: '补卡申请',
        xtype : 'bcardGridPanel'
    },{
        xtype: 'panel',
       
        title: '补卡审批',
        xtype : 'bcardApproveCenterPanel'
    }
                        
           
    ]

});