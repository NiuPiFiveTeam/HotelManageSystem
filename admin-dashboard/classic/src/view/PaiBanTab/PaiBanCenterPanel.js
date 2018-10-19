Ext.define('Admin.view.PaiBanTab.PaiBanCenterPanel', {
    extend: 'Ext.container.Container',
    xtype: 'paiBanCenterPanel',
    	
    layout: 'fit',
    controller: 'paibanViewController',
    viewModel: {type: 'paibanViewModel'},
    items: [{xtype:'paibanGridPanel'}]
    
});
