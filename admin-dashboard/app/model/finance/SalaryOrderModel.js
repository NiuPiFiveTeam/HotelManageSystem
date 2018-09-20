Ext.define('Admin.model.finance.SalaryOrderModel', {
    extend: 'Admin.model.Base',
    idProperty:'salaryOrderId',
    requires: [
        'Ext.data.proxy.Rest'   //数据层 代理 Rest模式的工具类
    ],

    fields: [
        {type: 'int',name: 'salaryOrderId'},
        {type: 'string',name: 'deptId'},
        {type: 'string',name: 'userId'},
        {type: 'string',name: 'userName'}, 

        {type: 'float',name: 'basicwage'},
        {type: 'float',name: 'overtimefee'},
        {type: 'float',name: 'allowance'},
        {type: 'float',name: 'bonus'},

        {type: 'float',name: 'reducemoney'},
        {type: 'float',name: 'realwage'},
        
        {type: 'int',name: 'month'},
    ],

    proxy: {        //不加这个用不了Rest写法
        type: 'rest',
        url: '/salaryOrder',
    }
});