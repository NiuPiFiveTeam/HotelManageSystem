Ext.define('Admin.view.finance.cost.Cost', {
    extend: 'Ext.tab.Panel',
    xtype: 'cost',

    items: [{
            iconCls: 'x-fa fa-plus',
            xtype:'inStorageOrderCenterPanel',
            title:'后勤支出'
        }, {
            iconCls: 'x-fa fa-plus',
            xtype:'salaryCostCenterPanel',
            title:'工资支出'
	}]
});
