Ext.define('Admin.view.work.WorkCenterPanel', {
    extend: 'Ext.container.Container',
    xtype: 'workCenterPanel',
    	
    layout: 'fit',
    controller: 'workViewController',
    viewModel: {type: 'workViewModel'},
    items: [{xtype:'workGridPanel'}]
    
});