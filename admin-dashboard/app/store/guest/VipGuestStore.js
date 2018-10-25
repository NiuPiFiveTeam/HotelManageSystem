Ext.define('Admin.store.guest.VipGuestStore', {
    extend:'Ext.data.Store',
	alias: 'store.vipGuestStore',
	storeId:'vipGuestStore',
    model: 'Admin.model.guest.GuestModel',

	 proxy: {
		type: 'ajax',
		url: 'guest/findAllVipGuest',	//后台Controller中的接口url地址
		reader: {
			type:'json',
			rootProperty:'content',
			totalProperty:'totalElements'  //总记录数
		}
	},
	autoLoad: 'true',
	pageSize:15,
   
});
