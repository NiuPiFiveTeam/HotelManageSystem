Ext.define('Admin.model.work.EmpworkChartModel',{
    extend: 'Admin.model.Base',
    idProperty:'quarter',
    fields: [
         {type: 'int'   ,name: 'quarter'}
        ,{type: 'int'   ,name: 'late'}
		,{type: 'int'	,name: 'leaveEarly'}
        ,{type: 'int'   ,name: 'lackcard'}
        ,{type: 'int'   ,name: 'leave'}
        ,{type: 'int'   ,name: 'travel'}
    ]
});