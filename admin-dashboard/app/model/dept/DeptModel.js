Ext.define('Admin.model.dept.DeptModel', {
extend: 'Admin.model.Base',
idProperty:'dept_id',
requires: [
	'Ext.data.proxy.Rest'
],
	fields: [
	    {type: 'int',name: 'dept_id'},
	    {type: 'string',name: 'deptNo'},
	    {type: 'string',name: 'deptName'},
	    {type: 'int',name: 'managerId'},
	    {type: 'string',name: 'managerNo'},
	    {type: 'string',name: 'managerName'},
	    {type: 'int',name: 'parentId'},
	    {type: 'int',name: 'is_parent'},
	    {type: 'string',name: 'deptParent'}
	],
	proxy: {
		type: 'rest',
		url: '/dept',
	}
});
