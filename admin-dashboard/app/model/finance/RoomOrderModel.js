Ext.define('Admin.model.finance.RoomOrderModel', {
    extend: 'Admin.model.Base',
    idProperty:'roomOrderId',
    requires: [
        'Ext.data.proxy.Rest'   //数据层 代理 Rest模式的工具类
    ],

    fields: [
        {type: 'int',name: 'orderId'}, 
        {type: 'int',name: 'userId'},
        {type: 'int',name: 'roomId'},
        {type: 'date',name: 'comeDate',dateFormat:'Y/m/d H:i:s' }, //dateFormat:'Y/m/d H:i:s'
        {type: 'date', name: 'leftDate',dateFormat:'Y/m/d H:i:s'},
        {type: 'float',name: 'time' },
        {type: 'float',name: 'amount'}
    ],

    proxy: {        //不加这个用不了Rest写法
        type: 'rest',
        url: '/roomOrder',
    }
});
