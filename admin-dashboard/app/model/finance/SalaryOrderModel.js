Ext.define('Admin.model.finance.SalaryOrderModel', {
    extend: 'Admin.model.Base',
    idProperty:'salaryOrderId',

    fields: [
    
        {type: 'int',name: 'salaryOrderId'},
        {type: 'string',name: 'empNo'},//员工编号
        {type: 'string',name: 'empName'}, //员工姓名
		{type: 'string',name: 'deptName'},//员工部门

        {type: 'float',name: 'basicwage'},//基本工资
        {type: 'float',name: 'overtimefee'},//加班工资
        {type: 'float',name: 'allowance'},//出差工资

        {type: 'float',name: 'reducemoney'},//请假所扣工资
        {type: 'float',name: 'realwage'},//实发工资

        {type: 'date',name: 'date'},//工资发放日期


    ]
});