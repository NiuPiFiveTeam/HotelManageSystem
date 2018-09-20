Ext.define('Admin.view.finance.cost.Cost', {
    extend: 'Ext.tab.Panel',
    xtype: 'cost',
    
    // controller: 'orderViewController',  //viewController:代码与视图分离。声明视图绑定的事件，可以多个视图共享。
    viewModel: {type: 'logisticstOrderViewModel'},//viewModel：配置Stote数据源。多个视图共享Store。

    // layout: 'fit',
    // items: [{xtype:'orderPanel'}]

    items: [{
            iconCls: 'x-fa fa-plus',
            xtype:'logisticsPanel',
            title:'后勤支出'
        }, {
            iconCls: 'x-fa fa-plus',
            // xtype:'salaryPanel',
            title:'工资支出'
	}]

});
