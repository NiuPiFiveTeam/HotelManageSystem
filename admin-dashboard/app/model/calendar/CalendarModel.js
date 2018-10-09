Ext.define('Admin.model.calendar.CalendarModel', {
	extend: 'Admin.model.Base',
	idProperty:'id',
	requires: [
		'Ext.data.proxy.Rest'
	],
	fields: [
		{type:'int',name:'id'}
		,{type:'string',name:'title'}
		,{type:'string',name:'description'}
		,{type:'string',name:'color'}
		,{type:'string',name:'assignedColor'}
		,{type:'boolean',name:'hidden'}
		,{type:'boolean',name:'editable'}

	],
	proxy: {
		type: 'rest',
		url: '/calendar',
	}
});
