Ext.define('Admin.view.bcard.BcardCenterPanel', {
    extend: 'Ext.container.Container',
    xtype: 'bcardCenterPanel',
    controller: 'bcardViewController',
    viewModel: {type: 'bcardViewModel'},
    layout: 'fit',
    items: [{xtype:'bcardGridPanel'}]
});
