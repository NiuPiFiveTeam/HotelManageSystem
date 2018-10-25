Ext.define('Admin.view.companyWork.history.WorkYearCenterPanel', {
    extend: 'Ext.container.Container',
    xtype: 'workYearCenterPanel',
    	
    layout: 'fit',
    controller: 'workYearViewController',
    viewModel: {type: 'workYearViewModel'},
    items: [{xtype:'workYearGridPanel'}]
    
});