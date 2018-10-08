Ext.define('Admin.model.logistics.roomClean.RoomCleanModel', {
    extend: 'Admin.model.Base',
    requires: [
		'Ext.data.proxy.Rest'
	],
	fields: [
		{type: 'int',name: 'id'},
		{type: 'string',name: 'floor'},
	    {type: 'int',name: 'roomNumber'},
	    {type: 'string',name: 'roomState'},
		{type: 'string',name: 'roomType' },
		{type: 'string',name: 'roomOther'},
		{type: 'date', name: 'roomDate', dateFormat:'Y/m/d H:i:s'},
		{type: 'string',name: 'roomWorker'},
	],
	proxy: {
		type: 'rest',
		url: '/roomClean',
	}
});
