Ext.define('Admin.view.employ.EmpManager', {
    extend: 'Ext.container.Container',
    xtype: 'empManager',
    	
    layout: 'fit',
    controller: 'employManagerController',
    viewModel: {type: 'employManegerModel'},
    items: [{xtype:'employManagerPanel'}]
    
});
