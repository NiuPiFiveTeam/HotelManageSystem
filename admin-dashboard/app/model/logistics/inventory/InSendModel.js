Ext.define('Admin.model.logistics.inventory.InSendModel', {
    extend: 'Admin.model.Base',
    requires: [
		'Ext.data.proxy.Rest'
	],
	fields: [
		{type: 'string',name: 'inStorageId'},//入库编号
		{type: 'date',name: 'applyTime',dateFormat:'Y/m/d H:i:s'},//处理日期
		{type: 'date',name: 'doDate',dateFormat:'Y/m/d H:i:s'},//申请日期
		{type: 'float',name: 'amount'},//总价
		{type: 'string',name: 'sendWorker'},//申请员工
	],
	proxy: {
		type: 'rest',
		url: '/InSend',
	}
});
