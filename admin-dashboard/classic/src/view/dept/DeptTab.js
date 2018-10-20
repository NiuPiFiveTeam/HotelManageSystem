Ext.define('Admin.view.dept.DeptTab', {
    extend: 'Ext.tab.Panel',
    xtype: 'deptTab',
    controller: 'deptTabController',
    requires: [
        'Ext.tab.Panel'
    ],

    items: [
                              
             {
                 xtype: 'panel',
                 id: 'edit',
                  title: '部门管理',
                  xtype : 'deptCenterPanel'
              },
             {
                 xtype: 'panel',
                 id: 'editrole',
                  title: '角色管理',
                  xtype : 'groupCenterPanel'
              }
                        
           ]

});