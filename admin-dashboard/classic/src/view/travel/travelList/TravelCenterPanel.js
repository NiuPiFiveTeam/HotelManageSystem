Ext.define('Admin.view.travel.travelList.TravelCenterPanel', {
    extend: 'Ext.container.Container',
    xtype: 'travelCenterPanel',
    // controller: 'travelViewController',
    // viewModel: {type: 'travelViewModel'},
    layout: 'fit',
    items: [{xtype:'travelGridPanel'}]
});
