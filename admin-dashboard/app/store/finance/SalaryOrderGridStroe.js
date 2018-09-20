Ext.define('Admin.store.finance.SalaryOrderGridStroe', {
    extend: 'Ext.data.Store',
    
    alias: 'store.salaryOrderGridStroe',
    storeId:'salaryOrderGridStroe',
	model:'Admin.model.finance.SalaryOrderModel',

    proxy: {
        // type: 'memory', 	//内存代理
        type: 'rest',
        url: '/salaryOrder',	//mvc url  xxx.json
	    reader:{
	    	type:'json',	
	    	rootProperty:'content',//对应后台返回的结果集名称
	    	totalProperty: 'totalElements'//分页需要知道总记录数
	    },
	    writer: {
			type: 'json'
		},
		simpleSortMode: true	//简单排序模式
    },

    autoLoad: 'true',
    autoSync: true,//连后台后修改sotre数据自动触发rest请求

    remoteSort: true,//全局排序  
    pageSize: 25,
    
    sorters: {
        direction: 'DESC',
        property: 'salaryOrderId'
    }
});
