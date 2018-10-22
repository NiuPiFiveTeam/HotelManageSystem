Ext.define('Admin.view.travel.TravelCenterPanel', {
    extend: 'Ext.container.Container',
    xtype: 'travelCenterPanel',
    
    viewModel: {type: 'travelViewModel'},
    layout: 'fit',
    items: [{xtype:'travelGridPanel'}]
});
