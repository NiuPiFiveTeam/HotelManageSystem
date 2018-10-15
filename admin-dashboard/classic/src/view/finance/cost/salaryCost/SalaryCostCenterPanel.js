Ext.define('Admin.view.finance.cost.salaryCost.SalaryCostCenterPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'salaryCostCenterPanel',
	layout:'fit',
    // margin: '20 20 20 20',
	controller: 'salaryCostViewController',
 	viewModel : { type: 'salaryCostViewModel'},

	items: [{xtype:'salaryCostGrid'}]
});