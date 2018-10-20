Ext.define('Admin.model.logistics.inventory.StockModel', {
    extend: 'Admin.model.Base',
    requires: [
		'Ext.data.proxy.Rest'
	],
	fields: [
		{type: 'int',name: 'id'},//编号
		{type: 'string',name: 'goodsName'},//商品名
		{type: 'string',name: 'unit'},//单位
		{type: 'float',name: 'amount'},//数量
		{type: 'string',name: 'stockType'},//类型
	],
	proxy: {
		type: 'rest',
		url: '/Stock',
	}
});
