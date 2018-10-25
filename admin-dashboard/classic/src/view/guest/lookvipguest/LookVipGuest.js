Ext.define('Admin.view.guest.lookvipguest.LookVipGuest', {
    extend: 'Ext.container.Container',
    xtype: 'vipGuest',
    // requires: ['Ext.tree.Panel'],
    //controller: 'order',				//viewController:代码与视图分离。声明视图绑定的事件，可以多个视图共享。
    //viewModel: {type: 'orderlist'},	//viewModel：配置Stote数据源。多个视图共享Store。
    
    // controller: 'emptyRoomViewController',   //事件控制器，用来编写事件
    viewModel : {type: 'lookVipGuestViewModel'},	
    //用来管理数据
   
    layout: 'fit',
    items: [{xtype:'lookVipGuestGrid'}]
    // html:'录入客人信息...'
});
