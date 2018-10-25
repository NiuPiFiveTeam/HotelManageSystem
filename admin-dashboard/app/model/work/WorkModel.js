Ext.define('Admin.model.work.WorkModel', {
extend: 'Admin.model.Base',
idProperty:'workid',
requires: [
	'Ext.data.proxy.Rest'
],
	fields: [
	    {type: 'int',name: 'workid'},
	    {type: 'string',name: 'empName'},
	    {type: 'string',name: 'deptName'},
	    {type: 'string',name: 'empNo'},
	    {type: 'string',name: 'calendar'},
	    {type: 'date',name: 'ontudytime',dateFormat:'Y-m-d H:i:s'},
	    {type: 'date',name: 'offdutytime',dateFormat:'Y-m-d H:i:s'},
	    {type: 'int',name: 'late'},
	    {type: 'int',name: 'lackCard'},
	    {type: 'int',name: 'leaveEarly'},
	    {type: 'float',name: 'worktime'},
	    {type: 'float',name: 'overtime'},
	    {type: 'int',name: 'normal'}

	    
	],
	proxy: {
		type: 'rest',
		url: '/work',
	}
});
