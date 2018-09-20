Ext.define('Admin.view.finance.income.Income', {
    extend: 'Ext.tab.Panel',
    xtype: 'income',
    
    
    // layout: 'fit',
    // items: [{xtype:'orderPanel'}]
    controller: 'roomOrderViewController',
    viewModel: {type: 'roomOrderViewModel'},

    items: [{
            iconCls: 'x-fa fa-plus',
            xtype:'roomOrderPanel',
            title:'客房收入'
        }, {
            iconCls: 'x-fa fa-plus',
            // xtype:'salaryPanel',
            title:'餐饮收入'
	}]

});
