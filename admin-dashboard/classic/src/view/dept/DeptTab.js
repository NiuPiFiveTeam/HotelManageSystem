Ext.define('Admin.view.dept.DeptTab', {
    extend: 'Ext.panel.Panel',
    xtype: 'deptTab',
    controller: 'deptTabController',
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
         id : 'deptTabPanel',
         defaults: {
                 autoScroll: true,    //是否有滚动条
                 bodyPadding: 5
                  },
         items: [
                              
             {
                 xtype: 'panel',
                 id: 'edit',
                  title: '部门管理',
                  items: [{xtype : 'deptCenterPanel'}]
              },
             {
                 xtype: 'panel',
                 id: 'editrole',
                  title: '角色管理',
                  items: [{xtype : 'groupCenterPanel'}]
              }
                        
           ]
     }],


    listeners: {
        tabchange: 'onTabChange'
    }
});