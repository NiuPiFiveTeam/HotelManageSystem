Ext.define('Admin.model.bcard.BcardModel', {
	extend: 'Admin.model.Base',
	idProperty:'bCardid',
	requires: [
		'Ext.data.proxy.Rest'
	],
	fields: [
		{type:'int',name:'bCardid'}
		,{type:'float',name:'worktime'}
		,{type:'float',name:'overtime'}
		,{type:'string',name:'userId'}
		,{type:'string',name:'calendar'}

		,{type:'date',name:'ontudytime',dateFormat:'Y-m-d H:i:s'}
		,{type:'date',name:'offdutytime',dateFormat:'Y-m-d H:i:s'}
		,{type:'date',name:'realityStartTime',dateFormat:'Y-m-d H:i:s'}
		,{type:'date',name:'realityEndTime',dateFormat:'Y-m-d H:i:s'}
		,{type:'date',name:'applyTime',dateFormat:'Y-m-d H:i:s'}
		,{type:'date',name:'workDate',dateFormat:'Y-m-d'}

		,{type:'string',name:'bcardType'}
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
		url: '/bcard',
	}
});
