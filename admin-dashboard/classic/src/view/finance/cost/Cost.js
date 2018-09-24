Ext.define('Admin.view.finance.cost.Cost', {
    extend: 'Ext.tab.Panel',
    xtype: 'cost',

    items: [{
            iconCls: 'x-fa fa-plus',
            xtype:'inStorageApplyCenterPanel',
            title:'后勤支出'
        }, {
            iconCls: 'x-fa fa-plus',
            // xtype:'salaryPanel',
            title:'工资支出'
	}]

});
