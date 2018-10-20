Ext.define('Admin.store.travelApprove.TravelApproveStore', {
    extend: 'Ext.data.Store',
    storeId:'travelApproveStore',
    alias: 'store.travelApproveStore',
    model: 'Admin.model.travelApprove.TravelApproveModel',
    //pageSize: 25,
    proxy: {
        type: 'ajax',
        url: 'travel/tasks', 			//需要修改
        reader : new Ext.data.JsonReader({  
            type : 'json',  
            rootProperty  : 'content',
            totalProperty : 'totalElements'
        })
        ,simpleSortMode: true
    },
    remoteSort: true,
    sorters: [{ property: 'travelId',direction: 'desc'}],
    autoLoad: true
});	