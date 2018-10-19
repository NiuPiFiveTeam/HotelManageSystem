Ext.define('Admin.model.logistics.inventory.InModel', {
    extend: 'Admin.model.Base',
    requires: [
		'Ext.data.proxy.Rest'
	],
	fields: [
		{type: 'string',name: 'inStorageId'},//入库编号
		{type: 'date',name: 'applyTime'},//处理日期
		{type: 'date',name: 'inStorageDate'},//入库日期
		{type: 'string',name: 'vender'},//采购商家
		{type: 'int',name: 'amount'},//总价
	],
	proxy: {
		type: 'rest',
		url: '/inventory/In',
	}
});
