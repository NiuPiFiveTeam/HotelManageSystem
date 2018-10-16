Ext.define('Admin.view.room.emptyroom.EmptyRoomViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.emptyRoomViewController',
	
    loadEmptyHomeItem:function(node,event){
            var id = event.data.id; //节点
            console.log(event.data);
            if(id>1000000){//说明是楼层Id，进行加载客房的操作
                loadAllEmptyRoom(id);
            }else{  //说明是客房Id，需要进行客房相关操作
                // loadAllRoom(event.data.parentId);
                removeEmptyBorder();
                addEmptyBorder(id);
            }   
    },

    AddRoomStateChangeWindow:function(){ //客房被选中后生成编辑窗口
        
    },

   

});


/** 给Room添加边框，显示选中状态 */
function addEmptyBorder(roomId){
    var div = document.getElementById(roomId); //得到room的DIV
    div.setAttribute('style','cursor:pointer;width:50px;height:70px;margin-left:15px;margin-top:5px;float:left;border:1px dashed #35baf6;');
    //style="cursor:pointer;width:50px;height:70px;margin-left:15px;margin-top:10px;float:left;border:1px dashed white;"
    // div.style.border="1px dashed blue";
}

/** 给Room移除边框，显示未选中状态 */
function removeEmptyBorder(){
    var div = document.getElementsByClassName("dataview-multisort-item"); //得到room的DIV
    for (let index = 0; index < div.length; index++) {
        div[index].setAttribute('style','cursor:pointer;width:50px;height:70px;margin-left:15px;margin-top:5px;float:left;border:1px dashed white;');
    }
}

/** 加载出全部客房 */
function loadAllEmptyRoom(id){
    var proxy = {
        type: 'ajax',
        url: 'room/findRoom?floorId='+id+"&type=empty",	//后台Controller中的接口url地址
        reader: {
            type:'json'
        }
    };
    var store = Ext.create('Admin.store.room.EmptyRoomStore');
    store.setProxy(proxy);
    store.load();

    var room = Ext.getCmp('emptyRoomdataview');
    console.log(room);
    room.setStore(store);
    room.store.load();
}