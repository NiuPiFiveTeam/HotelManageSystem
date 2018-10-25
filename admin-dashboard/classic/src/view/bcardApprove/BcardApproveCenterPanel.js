Ext.define('Admin.view.bcardApprove.BcardApproveCenterPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'bcardApproveCenterPanel',
	layout:'fit',
    margin: '20 20 20 20',
	// controller: 'bcardApproveViewController',
 //    viewModel : { type: 'bcardApproveViewModel'},
	items: [{xtype:'bcardApproveGrid'}]	//需要修改
});