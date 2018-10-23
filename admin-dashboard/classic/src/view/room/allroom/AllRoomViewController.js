Ext.define('Admin.view.room.allroom.AllRoomViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.allRoomViewController',
	
    loadTotalStatus:function(){
        alert(123);
        // Ext.Ajax.request({			
        //     url : '/room/findAllRoom',
        //     //从数据库中请求数据，动态获取items中的数据			
        //     params : {
        //         'dataArray':dataArray,
        //     },  
        //     method : 'Get',			
        //     success : function(result) {}
        // });
    },

});