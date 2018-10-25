Ext.define('Admin.store.bcardapprove.BcardApproveStore', {
    extend: 'Ext.data.Store',
    storeId:'bcardApproveStore',
    alias: 'store.bcardApproveStore',
    model: 'Admin.model.bcardapprove.BcardApproveModel',
    //pageSize: 25,
    proxy: {
        type: 'ajax',
        url: 'bcard/tasks', 			//需要修改
        reader : new Ext.data.JsonReader({  
            type : 'json',  
            rootProperty  : 'content',
            totalProperty : 'totalElements'
        })
        ,simpleSortMode: true
    },
    remoteSort: true,
    sorters: [{ property: 'bCardid',direction: 'desc'}],
    autoLoad: true
});	