Ext.define('Admin.view.dept.DeptCenterPanel', {
    extend: 'Ext.container.Container',
    xtype: 'deptCenterPanel',
    controller: 'deptViewController',
    viewModel: {type: 'deptViewModel'},
    layout: 'fit',
    items: [{xtype:'deptGirdPanel'}]
});
