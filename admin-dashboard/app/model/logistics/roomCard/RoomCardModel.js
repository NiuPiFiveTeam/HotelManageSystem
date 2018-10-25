Ext.define('Admin.model.logistics.roomCard.RoomCardModel', {
    extend: 'Admin.model.Base',
    requires: [
		'Ext.data.proxy.Rest'
	],
	fields: [
		{type: 'int',name: 'id'},
		{type: 'string',name: 'goodsName'},
		{type: 'string',name: 'goodsRepresent'},
		{type: 'string',name: 'goodsPut'},
		{type: 'string',name: 'goodsGet'},
		{type: 'string',name: 'goodsGetNo'},
		{type: 'string',name: 'goodsGetPhone'}
	],
	proxy: {
		type: 'rest',
		url: '/roomCard',
	}
});
