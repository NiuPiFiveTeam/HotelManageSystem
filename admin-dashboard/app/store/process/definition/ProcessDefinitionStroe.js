Ext.define('Admin.store.process.definition.ProcessDefinitionStroe',{
    extend: 'Ext.data.Store',
    alias: 'store.processDefinitionStroe',
	model:'Admin.store.process.definition.ProcessDefinitionModel',
    storeId:'processDefinitionStroe',
    pageSize: 15,
    proxy: {
        type: 'ajax',
        url: '/process-definition',
        reader : new Ext.data.JsonReader({  
            type : 'json',  
            rootProperty  : 'content',
            totalProperty : 'totalElements'
        })
        ,simpleSortMode: true
    },
    remoteSort: true,
    sorters: [{ property: 'id',direction: 'desc'}],
    autoLoad: true,
    listeners: {}
});
