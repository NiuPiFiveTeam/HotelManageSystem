Ext.define('Admin.model.logistics.inventory.InModel', {
    extend: 'Admin.model.Base',
    requires: [
		'Ext.data.proxy.Rest'
	],
	fields: [
		{type: 'string',name: 'inStorageId'},//入库编号
		{type: 'date',name: 'doDate',dateFormat:'Y/m/d H:i:s'},//申请日期
		{type: 'date',name: 'inStorageDate',dateFormat:'Y/m/d H:i:s'},//入库日期
		{type: 'string',name: 'vender'},//采购商家
		{type: 'float',name: 'amount'},//总价
		{type: 'string',name: 'sendWorker'},//申请员工
		{type: 'string',name: 'Worker'},//处理员工
	],
	proxy: {
		type: 'rest',
		url: '/In',
	}
});
