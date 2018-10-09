Ext.define('Admin.model.dept.DeptParentModel', {
extend: 'Admin.model.Base',
idProperty:'deptParent',
requires: [
	'Ext.data.proxy.Rest'
],
	fields: [
	    {type: 'string',name: 'deptParent'},
	],
	proxy: {
		type: 'rest',
		url: '/dept/findCombox',
	}
});
