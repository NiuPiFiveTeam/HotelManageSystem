Ext.define('Admin.view.finance.cost.inStorageCost.InStorageOrderCenterPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'inStorageOrderCenterPanel',
	layout:'fit',
    // margin: '20 20 20 20',
	controller: 'inStorageOrderViewController',
 	viewModel : { type: 'inStorageOrderViewModel'},

	items: [{xtype:'inStorageOrderGrid'}]
});