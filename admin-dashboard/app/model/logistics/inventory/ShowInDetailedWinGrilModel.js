Ext.define('Admin.model.logistics.inventory.ShowInDetailedWinGrilModel', {
    extend: 'Admin.model.Base',
    requires: [
		'Ext.data.proxy.Rest'
	],
	fields: [
		{type: 'string',name: 'goodsName'},//商品名
		{type: 'string',name: 'unit'},//单位
		{type: 'float',name: 'amount'},//数量
		{type: 'string',name: 'stockType'},//类型
		{type: 'string',name: 'goodsNo'},//商品编号
		{type: 'string',name: 'inStorageId'},//总订单编号
	],
	proxy: {
		type: 'rest',
		url: '/Stock/ShowInDetailedWinGril',
	}
});
