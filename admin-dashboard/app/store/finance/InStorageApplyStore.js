Ext.define('Admin.store.finance.InStorageApplyStore', {
    extend: 'Ext.data.Store',

    storeId:'inStorageApplyStore',
    alias: 'store.inStorageApplyStore',
   
	model:'Admin.model.finance.InStorageApplyModel',

    proxy: {
        type: 'ajax',
        url: '/inStorage/tasks',	//mvc url  xxx.json
	    reader: new Ext.data.JsonReader({
            type:'json',
            rootProperty:'content',
            totalProperty:'totalElements'
        }),
		simpleSortMode: true	//简单排序模式
    },

    autoLoad: 'true',

    remoteSort: true,//全局排序  
    // pageSize: 25,
    
    sorters: {
        direction: 'DESC',
        property: 'inStorageApplyId'
    }
});
