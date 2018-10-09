Ext.define('Admin.model.group.GroupModel', {
	extend: 'Admin.model.Base',
	idProperty:'groupTable_id',
	requires: [
		'Ext.data.proxy.Rest'
	],
	fields: [
		{type:'int',name:'groupTable_id'}
		,{type:'string',name:'groupName'}
		,{type:'string',name:'groupId'}
		,{type:'string',name:'deptName'}
	],
	proxy: {
		type: 'rest',
		url: '/group',
	}
});
