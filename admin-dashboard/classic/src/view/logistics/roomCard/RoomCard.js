Ext.define('Admin.view.logistics.roomCard.RoomCard', {
    extend: 'Ext.container.Container',
    xtype: 'roomCard',
    //requires: [],
    //controller: 'order',				//viewController:代码与视图分离。声明视图绑定的事件，可以多个视图共享。
    //viewModel: {type: 'orderlist'},	//viewModel：配置Stote数据源。多个视图共享Store。
    
    // controller: 'roomCardViewController',
    // viewModel: {type: 'roomCardViewModel'},
    	
    layout: 'fit',
    items: [{xtype:'roomCardPanel'}]
    //html:'房卡管理模块'
});
