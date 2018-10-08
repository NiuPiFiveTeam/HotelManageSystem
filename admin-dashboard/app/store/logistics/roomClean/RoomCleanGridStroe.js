   Ext.define('Admin.store.logistics.roomClean.RoomCleanGridStroe', {
    extend: 'Ext.data.Store',
	alias: 'store.roomCleanGridStroe',
	model:'Admin.model.logistics.roomClean.RoomCleanModel',
	storeId:'roomCleanGridStroe',//方便写事件时找到它
	////假数据
	// data: {
	// 	'content':[{
	//         "id": 1,
	//         "roomNumber": 605,
	//         "roomState": "清洁中",
	// 		"roomType": "双人房",
	// 		"roomDate":"2018/09/30 10:25:35",
	// 		"roomWorker":"roomWorker5",
	//     },{
	//         "id": 2,
	//         "roomNumber": 505,
	//         "roomState": "未清洁",
	// 		"roomType": "单人房",
	// 		"roomDate":"2018/09/19 10:25:35",
	// 		"roomWorker":"roomWorker1",
	// 	},{
	//         "id": 3,
	//         "roomNumber": 305,
	//         "roomState": "客人需要牙刷",
	// 		"roomType": "单人房",
	// 		"roomDate":"2018/09/20 10:25:35",
	// 		"roomWorker":"roomWorker2",
	// 	},
	// 	{
	//         "id": 4,
	//         "roomNumber": 605,
	//         "roomState": "未清洁",
	// 		"roomType": "双人房",
	// 		"roomDate":"2018/09/20 10:25:35",
	// 		"roomWorker":"未分配",
	//     },
	// ]
    // },
	// proxy: {
	// 	type: 'memory',//连后台可改为type: 'rest'
	// 	reader:{
	// 		type:'json',
	// 		rootProperty:'content'
	// 	}
	// },
	// autoLoad: 'true',

	proxy: {
		type: 'rest',
		url: '/roomClean',
		reader:{
			type:'json',
			rootProperty:'content',//对应后台返回的结果集名称
			totalProperty: 'totalElements'//分页需要知道总记录数
		},
		writer: {
			type: 'json'
		},
		simpleSortMode: true	//简单排序模式
	},
	autoLoad: true,//自动请求
	autoSync: true,//自动同步
	remoteSort: true,//全局（远程排序）排序，等于重新加载了数据
	pageSize: 20,

	sorters: {
		direction: 'ASC',
		property: 'id'
	}
});
