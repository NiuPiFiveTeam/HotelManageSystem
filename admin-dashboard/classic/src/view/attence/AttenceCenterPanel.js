Ext.define('Admin.view.attence.AttenceCenterPanel', {
    extend: 'Ext.container.Container',
    xtype: 'attenceCenterPanel',
    controller: 'attenceViewController',
    viewModel: {type: 'attenceViewModel'},
    layout: 'fit',
    items: [{xtype:'attenceGridPanel'}]
});