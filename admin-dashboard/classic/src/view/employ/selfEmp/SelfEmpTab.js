Ext.define('Admin.view.employ.selfEmp.SelfEmpTab', {
    extend: 'Ext.tab.Panel',
    xtype: 'selfEmpTab',
   	//controller: 'empTabController',
    
    requires: [
        'Ext.tab.Panel'
    ],

    items: [{
                   xtype: 'panel',
                   title: '个人信息浏览',
                   xtype : 'lookSelfEmpMessage'
            },
                           
            {
                 xtype: 'panel',
                  title: '修改个人信息',
                  xtype : 'editSelfEmpMessage'
            },
                           
            {
                 xtype: 'panel',
                  title: '修改密码',
                  xtype : 'editPassword'
            } 
     ]

});