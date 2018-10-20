Ext.define('Admin.view.logistics.inventory.Inventory', {
    extend: 'Ext.container.Container',
    xtype: 'inventory',
    //requires: [],
    //controller: 'order',				//viewController:代码与视图分离。声明视图绑定的事件，可以多个视图共享。
    //viewModel: {type: 'orderlist'},	//viewModel：配置Stote数据源。多个视图共享Store。
    
     controller: 'inventoryViewController',
     viewModel: {type: 'inventoryViewModel'},
    	
    layout: 'fit',
    items: [{xtype:'inventoryPanel'}]
    //html:'库存管理模块'
});
