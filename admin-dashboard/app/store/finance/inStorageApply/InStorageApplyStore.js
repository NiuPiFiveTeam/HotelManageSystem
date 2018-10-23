Ext.define('Admin.store.finance.inStorageApply.InStorageApplyStore', {
    extend: 'Ext.data.Store',

    storeId:'inStorageApplyStore',
    alias: 'store.inStorageApplyStore',
   
    model:'Admin.model.finance.inStorageApply.InStorageApplyModel',


    // data: {
    //     'lists':[{
    //        "processStatus": "APPROVAL",
    //         "taskId":'2',
    //         'assignee':'aa',
    //         "taskName": "bbbb",
    //         "processInstanceId":'1',
    //         "taskDefinitionKey":"logisticstAudit",
    //         "vender":"啊啊啊啊啊"
    //     },{
    //        "processStatus": "APPROVAL",
    //         "taskId":'2',
    //         'assignee':'aa',
    //         "taskName": "bbbb",
    //         "processInstanceId":'1',
    //         "taskDefinitionKey":"contactSupplier",
    //         "vender":"啊啊啊啊啊"
    //     },{
    //         "processStatus": "APPROVAL",
    //         "taskId":'2',
    //         'assignee':'aa',
    //         "taskName": "bbbb",
    //         "processInstanceId":'1',
    //         'amount':9999,
    //         "taskDefinitionKey":"financeAudit",
    //         "vender":"啊啊啊啊啊"
    //     },{
    //         "processStatus": "APPROVAL",
    //         "taskId":'2',
    //         "taskName": "bbbb",
    //         "processInstanceId":'1',
    //         'amount':9999,
    //         "taskDefinitionKey":"financeManagerAudit",
    //         "vender":"啊啊啊啊啊"
    //     },{
    //         "processStatus": "NEW",
    //         "taskId":'2',
    //         'assignee':'aa',
    //         "taskName": "bbbb",
    //         "processInstanceId":'1',
    //         'amount':9999,
    //         "taskDefinitionKey":"pay",
    //         "vender":"啊啊啊啊啊"
    //     },{
    //         "processStatus": "APPROVAL",
    //         "taskId":'2',
    //         'assignee':'aa',
    //         "taskName": "bbbb",
    //         "processInstanceId":'1',
    //         'amount':9999,
    //         "taskDefinitionKey":"contactSupplier",
    //         "vender":"啊啊啊啊啊"
    //     },{
    //         "processStatus": "APPROVAL",
    //         "taskId":'2',
    //         'assignee':'aa',
    //         "taskName": "bbbb",
    //         "processInstanceId":'1',
    //         'amount':9999,
    //         "taskDefinitionKey":"modifyApply"
    //     }]
    // },

    proxy: {
        // type:'memory', 
        type: 'ajax',
        url: '/inStorage/tasks', //mvc url  xxx.json
        reader: new Ext.data.JsonReader({
            type:'json',
            rootProperty:'content',
            totalProperty:'totalElements'
        }),
        // reader:{
        //     type:'json',
        //     rootProperty:'lists'
        // },
        simpleSortMode: true    //简单排序模式
    },

    autoLoad: 'true',

    remoteSort: true,//全局排序  
    pageSize: 20,
    
    sorters: {
        direction: 'DESC',
        property: 'inStorageId'
    }
});
