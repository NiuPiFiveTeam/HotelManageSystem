Ext.define('Admin.store.Paiban.PaibanStore', {
    extend: 'Ext.data.Store',
    alias: 'store.paibanStore',
    storeId:'paibanStoreId',
    model:'Admin.model.Paiban.PaibanModel',
    proxy: {
        type: 'rest',
        url: '/CalendarEvent/findEmpEvents',
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
        property: 'id'
    }
});
