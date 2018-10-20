Ext.define('Admin.model.travel.TravelModel', {
	extend: 'Admin.model.Base',
	idProperty:'travelId',
	requires: [
		'Ext.data.proxy.Rest'
	],
	fields: [
		{type:'int',name:'travelId'}
		,{type:'date',name:'traStartTime',dateFormat:'Y/m/d H:i:s'}
		,{type:'date',name:'traEndTime',dateFormat:'Y/m/d H:i:s'}
		,{type:'date',name:'realityStartTime',dateFormat:'Y/m/d H:i:s'}
		,{type:'date',name:'realityEndTime',dateFormat:'Y/m/d H:i:s'}
		,{type:'date',name:'applyTime',dateFormat:'Y/m/d H:i:s'}
		,{type:'float',name:'allowance'}
		,{type:'string',name:'processStatus'}
		,{type:'string',name:'process'}
		,{type:'string',name:'empName'}
		,{type:'string',name:'empNo'}
		,{type:'string',name:'deptName'}
		,{type:'string',name:'approval'}
		,{type:'string',name:'processInstanceId'}
	],
	proxy: {
		type: 'rest',
		url: '/travel',
	}
});
