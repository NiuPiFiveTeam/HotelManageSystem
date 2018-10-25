Ext.define('Admin.view.companyWork.Month.WorkMonthCenterPanel', {
    extend: 'Ext.container.Container',
    xtype: 'workMonthCenterPanel',
    	
    layout: 'fit',
    controller: 'workMonthViewController',
    viewModel: {type: 'workMonthViewModel'},
    items: [{xtype:'workMonthGridPanel'}]
    
});