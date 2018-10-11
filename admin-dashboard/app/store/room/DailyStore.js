Ext.define('Admin.store.room.DailyStore', {
    extend:'Ext.data.Store',
    alias: 'store.dailyStore',

    fields: ['id','show','number','name'],
    // data: {'dailyList':[
    //     {id: 'Daily_toothpaste', show: '牙膏',number:0,name:'toothpaste'},
    //     {id: 'Daily_toothbrush', show: '牙刷',number:0,name:'toothbrush'},
    //     {id: 'Daily_bathtowel', show: '浴巾',number:0,name:'bathtowel'},
    //     {id: 'Daily_towel', show: '毛巾',number:0,name:'towel'},
    //     {id: 'Daily_showergel', show: '沐浴露',number:0,name:'showergel'}
    // ]},
    

    // proxy: {
    //     type: 'memory',
    //     //url: '~api/search/users'	//mvc url  xxx.json
	//     reader:{
	//     	type:'json',
	//     	rootProperty:'dailyList'
	//     }
    // },
    proxy: {
        type: 'ajax',
        url: 'room/getDaily',	//mvc url  xxx.json
	    reader:{
	    	type:'json',
	    }
	},
    autoLoad:true
});
