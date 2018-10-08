Ext.define('Admin.view.logistics.roomClean.RoomClean', {
    extend: 'Ext.container.Container',
    xtype: 'roomClean',
    //requires: [],
    //controller: 'order',				//viewController:代码与视图分离。声明视图绑定的事件，可以多个视图共享。
    //viewModel: {type: 'orderlist'},	//viewModel：配置Stote数据源。多个视图共享Store。
    
    controller: 'roomCleanViewController',
    viewModel: {type: 'roomCleanViewModel'},
    	
    layout: 'fit',
    items: [{xtype:'roomCleanPanel'}],
    //html:'客房内务模块'
    
});
