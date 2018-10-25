Ext.define('Admin.view.employ.EmpCenterPanel', {
    extend: 'Ext.container.Container',
    xtype: 'empCenterPanel',
    layout: 'fit',
    controller: 'employViewController',
    viewModel: {type: 'employViewModel'},
    items: [{xtype:'employGridPanel'}]
    
});
