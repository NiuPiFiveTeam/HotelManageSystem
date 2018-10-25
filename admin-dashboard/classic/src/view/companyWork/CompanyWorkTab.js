Ext.define('Admin.view.companyWork.CompanyWorkTab', {
    extend: 'Ext.tab.Panel',
    xtype: 'companyWorkTab',
    //controller: 'workTabController',

    requires: [
        'Ext.tab.Panel'
    ],

    items: [{
        xtype: 'panel',
        title: '当月考勤',
        xtype : 'workMonthCenterPanel'
     
    },{
        xtype: 'panel',
      
        title: '历史考勤',
        xtype : 'workYearCenterPanel'
// companyWorkHistory
    },{
        xtype: 'panel',
       
        title: '考勤报表',
        xtype : 'empworkchart'
// companyWorkChart
    }
                        
           
    ]

});