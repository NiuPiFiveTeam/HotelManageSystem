Ext.define('Admin.model.logistics.inventory.OutModel', {
    extend: 'Admin.model.Base',
    requires: [
		'Ext.data.proxy.Rest'
	],
	fields: [
		{type: 'int',name: 'id'},//编号
		{type: 'string',name: 'roomNo'},//房间号码
		{type: 'string',name: 'reason'},//出库原因
		{type: 'date',name: 'outDate',dateFormat:'Y/m/d H:i:s'},//出库日期
		{type: 'string',name: 'workers'},//出库员工
	],
	proxy: {
		type: 'rest',
		url: '/Out',
	}
});
