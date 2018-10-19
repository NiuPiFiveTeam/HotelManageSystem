Ext.define('Admin.view.employ.EmpTab', {
    extend: 'Ext.tab.Panel',
    xtype: 'empTab',
    controller: 'empTabController',
    
    requires: [
        'Ext.tab.Panel'
    ],

    items: [{
                   xtype: 'panel',
                   id : 'lookEmp',
                   title: '员工信息浏览',
                   xtype : 'empCenterPanel'
            },
                           
            {
                 xtype: 'panel',
                 id: 'addEmp',
                  title: '添加员工',
                  xtype : 'addEmpPanel'
            }
                        
           
     ]
// ,


//     listeners: {
//         tabchange: 'onTabChange'
//     }
});