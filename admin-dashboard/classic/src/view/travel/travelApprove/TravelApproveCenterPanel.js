Ext.define('Admin.view.travel.travelApprove.TravelApproveCenterPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'travelApproveCenterPanel',
	layout:'fit',
    margin: '20 20 20 20',
	// controller: 'travelApproveViewController',
 //    viewModel : { type: 'travelApproveViewModel'},
	items: [{xtype:'travelApproveGrid'}]	//需要修改
});