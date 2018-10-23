Ext.define('Admin.view.finance.income.RoomOrderPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'roomOrderPanel',
    layout:'fit',
    controller: 'roomOrderViewController',
    viewModel : { type: 'roomOrderViewModel'},
    items: [{xtype:'roomOrderGrid'}]
});
