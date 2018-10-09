Ext.define('Admin.model.employ.EmployModel', {
extend: 'Admin.model.Base',
idProperty:'emp_id',
requires: [
	'Ext.data.proxy.Rest'
],
	fields: [
	    {type: 'int',name: 'emp_id'},
	    {type: 'string',name: 'userName'},
	    {type: 'string',name: 'empNo'},
	    {type: 'string',name: 'password'},
	    {type: 'string',name: 'empName'},
	    {type: 'string',name: 'empSex'},
	    {type: 'string',name: 'jobtype'},
	    {type: 'string', name: 'deptName'},
	    {type: 'string',name: 'idcard' },
	    {type: 'string',name: 'tel'},
	    {type: 'string',name: 'groupName'},
	    {type: 'string', name: 'address'},
	    {type: 'date',name: 'entryDate',dateFormat:'Y-m-d'},
	    {type: 'date',name: 'endDate',dateFormat:'Y-m-d'},
	    {type: 'string', name:'introduce'},
	    {type: 'string',name: 'empImage'}
	],
	proxy: {
		type: 'rest',
		url: '/employ',
	}
});

