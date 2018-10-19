Ext.define('Admin.store.work.WorkStore', {
    extend: 'Ext.data.Store',
    alias: 'store.workStore',
    storeId:'workStoreId',
    model:'Admin.model.work.WorkModel',
    proxy: {
        type: 'rest',
        url: '/work',
	    reader:{
	    	type:'json',
	    	rootProperty:'content',  //对应后台返回的结果集名称
			totalProperty: 'totalElements'//分页需要知道总记录数
	    },
        writer:{
            type:'json'
        },
        simpleSortMode: true,
        

    },

    autoLoad: true,
    autoSync: true,
    remoteSort: true,//全局排序
    pageSize: 20,
    sorters: {
        direction: 'DESC',
        property: 'workid'
    }
});
