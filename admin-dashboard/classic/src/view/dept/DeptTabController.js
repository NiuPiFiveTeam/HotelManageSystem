Ext.define('Admin.view.dept.DeptTabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.deptTabController',

    onTabChange: function(tabs, newTab, oldTab) {
        Ext.suspendLayouts();
        newTab.setTitle('部门管理');
        oldTab.setTitle('角色管理');
        Ext.resumeLayouts(true);
    }
});