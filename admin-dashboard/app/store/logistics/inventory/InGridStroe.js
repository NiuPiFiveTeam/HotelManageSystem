   Ext.define('Admin.store.logistics.inventory.InGridStroe', {
    extend: 'Ext.data.Store',
	alias: 'store.inGridStroe',
	model:'Admin.model.logistics.inventory.InModel',
	storeId:'inGridStroe',//方便写事件时找到它
	proxy: {
		type: 'rest',
		url: '/In',
		reader:{
			type:'json',
			rootProperty:'content',//对应后台返回的结果集名称
			totalProperty: 'totalElements'//分页需要知道总记录数
		},
		writer: {
			type: 'json'
		},
		simpleSortMode: true,	//简单排序模式
	},
	autoLoad: true,//自动请求
	autoSync: true,//自动同步
	remoteSort: true,//全局（远程排序）排序，等于重新加载了数据
	pageSize: 20,

	sorters: [
		{
		direction: 'ASC',
		property: 'inStorageDate'
		}
]
	
});
