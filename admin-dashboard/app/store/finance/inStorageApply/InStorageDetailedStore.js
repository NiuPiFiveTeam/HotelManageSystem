Ext.define('Admin.store.finance.inStorageApply.InStorageDetailedStore', {
    extend: 'Ext.data.Store',

    storeId:'inStorageDetailedStore',
    alias: 'store.inStorageDetailedStore',
   
	model:'Admin.model.finance.inStorageApply.InStorageDetailedModel',

    // data: {
    //     'lists':[{
    //         "inStorageDetailedId": "1",
    //         "goodsName":'牙刷',
    //         'amount':'20',
    //         "unit": "50"
    //     },{
    //         "inStorageDetailedId": "21",
    //         "goodsName":'毛巾',
    //         'amount':'220',
    //         "unit": "520"
    //     },{
    //         "inStorageDetailedId": "22",
    //         "goodsName":'毛23巾',
    //         'amount':'220',
    //         "unit": "520"
    //     },{
    //         "inStorageDetailedId": "23",
    //         "goodsName":'毛2巾',
    //         'amount':'220',
    //         "unit": "520"
    //     }]
    // },

    proxy: {
        // type:'memory', 
        type: 'ajax',
        url: '/inStorage/showInStorageDetailed',	//mvc url  xxx.json
	    reader: new Ext.data.JsonReader({
            type:'json',
            rootProperty:'content',
            totalProperty:'totalElements'
        }),
        // reader:{
        //     type:'json',
        //     rootProperty:'lists'
        // },
		simpleSortMode: true	//简单排序模式
    },

    // autoLoad: 'true',

    remoteSort: true,//全局排序  
    pageSize: 3,
    
    sorters: {
        direction: 'ASC',
        property: 'id'
    }
});
