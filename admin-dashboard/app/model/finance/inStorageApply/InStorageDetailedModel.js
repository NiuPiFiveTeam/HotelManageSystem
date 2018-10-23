Ext.define('Admin.model.finance.inStorageApply.InStorageDetailedModel', {
    extend: 'Admin.model.Base',
    idProperty:'inStorageDetailedId',
    fields: [
        {type: 'int',name: 'inStorageDetailedId'}
        ,{type: 'string'   ,name: 'goodsName'}
		,{type: 'int'	 ,name: 'amount'}
        ,{type: 'int'   ,name: 'unit'}
		,{type: 'int'	 ,name: 'price'}
    ]
});