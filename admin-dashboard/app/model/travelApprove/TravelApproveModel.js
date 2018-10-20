Ext.define('Admin.model.travelApprove.TravelApproveModel', {
    extend: 'Admin.model.Base',
    idProperty:'travelId',
    fields: [	//需要修改
		 {type: 'int' ,name: 'travelId'}
		,{type: 'date' 	 ,name: 'traStartTime'}
		,{type: 'date'	 ,name: 'traEndTime'}
        ,{type: 'date'   ,name: 'realityStartTime'}
		,{type: 'date'	 ,name: 'realityEndTime'}
        ,{type: 'date'   ,name: 'applyTime'}
        ,{type: 'string' ,name: 'processStatus'}
		,{type: 'string' ,name: 'approval'}
        ,{type: 'string' ,name: 'processInstanceId'}
        ,{type: 'float' ,name: 'allowance'}
        ,{type: 'string' ,name: 'process'}
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