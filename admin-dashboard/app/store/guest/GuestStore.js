Ext.define('Admin.store.guest.GuestStore', {
    extend:'Ext.data.Store',
	alias: 'store.guestStore',
	storeId:'guestStore',
    model: 'Admin.model.guest.GuestModel',

    data: {
		'guestLists':[{
	        "realName": "黄欣健",
	        "idCard": "441225199608130076",
	        "gender": "男性",
	        "phone": "13538364468",
			"state": "星标会员",
	    },{
	        "realName": "杜仁牛",
	        "idCard": "441225199608130077",
	        "gender": "男性",
	        "phone": "13538364468",
			"state": "星标会员",
	    },{
	        "realName": "对敬畏",
	        "idCard": "441225199608130078",
	        "gender": "男性",
	        "phone": "13538364468",
			"state": "星标会员",
	    },{
	        "realName": "陈子打",
	        "idCard": "441225199608130079",
	        "gender": "男性",
	        "phone": "13538364468",
			"state": "星标会员",
	    }]
    },

    proxy: {
        type: 'memory',
        //url: '~api/search/users'	//mvc url  xxx.json
	    reader:{
	    	type:'json',
	    	rootProperty:'guestLists'
	    }
	},
	//  proxy: {
	// 	type: 'ajax',
	// 	url: 'room/findRoom?floorId=1000001&type=empty',	//后台Controller中的接口url地址
	// 	reader: {
	// 		type:'json'
	// 		// rootProperty:'roomList'
	// 	}
	// },
    autoLoad: 'true'

   
});
