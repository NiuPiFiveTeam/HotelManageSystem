Ext.define('Admin.model.leave.LeaveModel', {
	extend: 'Admin.model.Base',
	requires: [
		'Ext.data.proxy.Rest'
	],
	fields: [
		{type:'int',name:'id'}
		,{type:'string',name:'userId'}
		,{type:'date',name:'startTime',dateFormat:'Y/m/d H:i:s'}
		,{type:'date',name:'endTime',dateFormat:'Y/m/d H:i:s'}
		,{type:'date',name:'realityStartTime',dateFormat:'Y/m/d H:i:s'}
		,{type:'date',name:'realityEndTime',dateFormat:'Y/m/d H:i:s'}
		,{type:'date',name:'applyTime',dateFormat:'Y/m/d H:i:s'}
		,{type:'string',name:'leaveType'}
		,{type:'string',name:'processStatus'}
		,{type:'string',name:'reason'}
		,{type:'string',name:'empName'}
		,{type:'string',name:'empNo'}
		,{type:'string',name:'deptName'}
		,{type:'string',name:'approval'}
		,{type:'string',name:'processInstanceId'}
	],
	proxy: {
		type: 'rest',
		url: '/leave',
	}
});
