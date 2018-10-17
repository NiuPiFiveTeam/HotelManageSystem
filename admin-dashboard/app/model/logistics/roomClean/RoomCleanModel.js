Ext.define('Admin.model.logistics.roomClean.RoomCleanModel', {
    extend: 'Admin.model.Base',
    requires: [
		'Ext.data.proxy.Rest'
	],
	fields: [
		{type: 'int',name: 'roomId'},
		{type: 'string',name: 'floorName'},
	    {type: 'int',name: 'roomNo'},
	    {type: 'string',name: 'roomCleanState'},
		{type: 'string',name: 'type' },
		{type: 'string',name: 'roomOther'}
	],
	proxy: {
		type: 'rest',
		url: '/roomClean',
	}
});
