Ext.define('Admin.view.group.GroupCenterPanel', {
    extend: 'Ext.container.Container',
    xtype: 'groupCenterPanel',
    controller: 'groupViewController',
    viewModel: {type: 'groupViewModel'},
    layout: 'fit',
    items: [{xtype:'groupGridPanel'}]
});
