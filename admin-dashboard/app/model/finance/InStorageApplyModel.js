Ext.define('Admin.model.finance.InStorageApplyModel', {
    extend: 'Admin.model.Base',
    idProperty:'inStorageId',
    fields: [
        {type: 'string',name: 'inStorageId'}
		,{type: 'date'	 ,name: 'inStorageDate'}
        ,{type: 'string'   ,name: 'vender'}
		,{type: 'int'	 ,name: 'amount'}
        ,{type: 'date'   ,name: 'applyTime'}
		,{type: 'string'   ,name: 'employeeId'}


        ,{type: 'string' ,name: 'processStatus'}
        ,{type: 'string' ,name: 'processInstanceId'}
        ,{type: 'string' ,name: 'taskId'}
        ,{type: 'string' ,name: 'taskName'}
        ,{type: 'date' ,name: 'taskCreateTime'}
        ,{type: 'string' ,name: 'assignee'}
        ,{type: 'string' ,name: 'taskDefinitionKey'}
        ,{type: 'string' ,name: 'processDefinitionId'}
        ,{type: 'boolean' ,name: 'suspended'}
        ,{type: 'int' ,name: 'version'}
    ]
});