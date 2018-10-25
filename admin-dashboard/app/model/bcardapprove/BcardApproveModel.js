Ext.define('Admin.model.bcardapprove.BcardApproveModel', {
    extend: 'Admin.model.Base',
    idProperty:'bCardid',
    fields: [	//需要修改
		 {type: 'int' ,name: 'bCardid'}
        ,{type: 'string' ,name: 'userId'}
        ,{type: 'string' ,name: 'calendar'}
		,{type: 'date' 	 ,name: 'ontudytime'}
		,{type: 'date'	 ,name: 'offdutytime'}
        ,{type:'float',name:'worktime'}
        ,{type:'float',name:'overtime'}
        ,{type: 'date'   ,name: 'realityStartTime'}
		,{type: 'date'	 ,name: 'realityEndTime'}
        ,{type: 'date'   ,name: 'applyTime'}
        ,{type: 'string' ,name: 'bcardType'}
        ,{type: 'string' ,name: 'processStatus'}
		,{type: 'string' ,name: 'reason'}
        ,{type: 'string' ,name: 'processInstanceId'}
        ,{type: 'string' ,name: 'taskId'}
        ,{type: 'string' ,name: 'taskName'}
        ,{type: 'date' ,name: 'taskCreateTime'}
        ,{type: 'string' ,name: 'assignee'}
        ,{type: 'string' ,name: 'taskDefinitionKey'}
        ,{type: 'string' ,name: 'processDefinitionId'}
        ,{type: 'boolean' ,name: 'suspended'}
        ,{type: 'int' ,name: 'version'}
        ,{type: 'string' ,name: 'empName'}
        ,{type: 'string' ,name: 'empNo'}
        ,{type: 'string' ,name: 'deptName'}
    ]
});