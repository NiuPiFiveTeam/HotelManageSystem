Ext.define('Admin.model.Paiban.PaibanModel', {
extend: 'Admin.model.Base',
idProperty:'id',
requires: [
	'Ext.data.proxy.Rest'
],
	fields: [
	    {type: 'int',name: 'id'},
	    {type: 'string',name: 'empName'},
	    {type: 'string',name: 'eventDate'},
	    {type: 'string',name: 'deptName'},
	    {type: 'string',name: 'empNo'},
	    {type: 'string',name: 'calendar'},
	    {type: 'date',name: 'startDate',dateFormat:'Y-m-d H:i:s'},
	    {type: 'date',name: 'endDate',dateFormat:'Y-m-d H:i:s'}
	    
	],
	proxy: {
		type: 'rest',
		url: '/CalendarEvent/findEmpEvents',
	}
});
