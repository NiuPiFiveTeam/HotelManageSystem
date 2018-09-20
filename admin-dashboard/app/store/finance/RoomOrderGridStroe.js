Ext.define('Admin.store.finance.RoomOrderGridStroe', {
    extend: 'Ext.data.Store',

    alias: 'store.roomOrderGridStroe',
    storeId:'roomOrderGridStroe',
	model:'Admin.model.finance.RoomOrderModel',
	
    proxy: {
        type: 'rest',
        url: '/roomOrder',	
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

    autoLoad: 'true',
    autoSync: true,//连后台后修改sotre数据自动触发rest请求

    remoteSort: true,//全局排序  
    pageSize: 25,
    
    sorters: {
        direction: 'DESC',
        property: 'orderId'
    }
});
