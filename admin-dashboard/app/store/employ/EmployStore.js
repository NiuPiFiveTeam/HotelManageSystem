Ext.define('Admin.store.employ.EmployStore', {
    extend: 'Ext.data.Store',
    alias: 'store.employStore',
    storeId:'EmployStoreid',
    model:'Admin.model.employ.EmployModel',
    proxy: {
        type: 'rest',
        url: '/employ',
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
        property: 'emp_id'
    }
});
