Ext.define('Admin.store.room.EmptyRoomStore', {
    extend:'Ext.data.Store',
	alias: 'store.emptyRoomStore',
	storeId:'emptyRoomStore',
    model: 'Admin.model.room.RoomModel',

    // data: {
	// 	'roomList':[{
	//         "roomId": 1,
	//         "roomNo": "101",
	//         "type": 1,
	//         "state": 1,
	//         "roomPass": "123456",
	       
	//     },{
    //         "roomId": 2,
	//         "roomNo": "102",
	//         "type": 1,
	//         "state": 1,
	//         "roomPass": "123456",
    // 	},{
    //         "roomId": 1,
	//         "roomNo": "201",
	//         "type": 1,
	//         "state": 1,
	//         "roomPass": "123456",
    // 	},{
    //         "roomId": 1,
	//         "roomNo": "202",
	//         "type": 1,
	//         "state": 1,
	//         "roomPass": "123456",
    // 	}]
    // },

    // proxy: {
    //     type: 'memory',
    //     //url: '~api/search/users'	//mvc url  xxx.json
	//     reader:{
	//     	type:'json',
	//     	rootProperty:'roomList'
	//     }
	// },
	 proxy: {
		type: 'ajax',
		url: 'room/findRoom?floorId=1000001&type=empty',	//后台Controller中的接口url地址
		reader: {
			type:'json'
			// rootProperty:'roomList'
		}
	},
    autoLoad: 'true'

   
});
