Ext.define('Admin.view.room.allroom.AllRoom', {
    extend: 'Ext.container.Container',
    xtype: 'allRoom',
    // requires: ['Ext.tree.Panel'],
    //controller: 'order',				//viewController:代码与视图分离。声明视图绑定的事件，可以多个视图共享。
    //viewModel: {type: 'orderlist'},	//viewModel：配置Stote数据源。多个视图共享Store。
    
    // controller: 'inroomViewController',   //事件控制器，用来编写事件
    // viewModel : {type: 'inRoomViewModel'},	
    //用来管理数据
   
    layout: 'fit',
    items: [{xtype:'allroomPanel'}]
    // html:'查看全部情况...'
});
