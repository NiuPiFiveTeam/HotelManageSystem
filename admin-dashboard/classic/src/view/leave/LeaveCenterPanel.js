Ext.define('Admin.view.leave.LeaveCenterPanel', {
    extend: 'Ext.container.Container',
    xtype: 'leaveCenterPanel',
    controller: 'leaveViewController',
    viewModel: {type: 'leaveViewModel'},
    layout: 'fit',
    items: [{xtype:'leaveGridPanel'}]
});
