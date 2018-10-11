Ext.define('Admin.view.room.inroom.InRoomDailyWindow', {
    extend:'Ext.window.Window',

    requires: [
        'Ext.layout.container.Column',
    ],
    alias:'widget.inRoomDailyWindow',
    id:'inRoomDailyWindow',
    title: '选择需要补充的日用品',
    height: 300,
    width: 300,
    layout: 'fit',
    // draggable:false,//拖动
    resizable:false,	//变大小	
    // x:978,
    // y:229,
    renderTo:Ext.getCmp("inRoomEditWindow"),
   
})