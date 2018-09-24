Ext.define('Admin.view.finance.cost.inStorage.InStorageApplyCenterPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'inStorageApplyCenterPanel',
	layout:'fit',
    // margin: '20 20 20 20',
	controller: 'inStorageApplyViewController',
 	viewModel : { type: 'inStorageApplyViewModel'},
	items: [{xtype:'inStorageApplyGrid'}]
});