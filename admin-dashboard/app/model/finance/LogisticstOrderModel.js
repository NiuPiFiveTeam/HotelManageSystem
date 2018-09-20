Ext.define('Admin.model.finance.LogisticstOrderModel', {
    extend: 'Admin.model.Base',
    idProperty:'logisticstOrderId',
    requires: [
        'Ext.data.proxy.Rest'   //数据层 代理 Rest模式的工具类
    ],

    fields: [
        {type: 'int',name: 'logisticstOrderId'}, 
        {type: 'date',name: 'inDate',dateFormat:'Y/m/d H:i:s' }, //dateFormat:'Y/m/d H:i:s'
        {type: 'float',name: 'amount'},
        {type: 'date',name: 'time',dateFormat:'Y/m/d H:i:s' },
        {type: 'int',name: 'purchaseId'}
    ],

    proxy: {        //不加这个用不了Rest写法
        type: 'rest',
        url: '/logisticstOrder',
    }
});