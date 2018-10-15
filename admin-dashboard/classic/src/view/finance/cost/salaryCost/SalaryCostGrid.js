Ext.define('Admin.view.finance.cost.salaryCost.SalaryCostGrid', {
    extend: 'Ext.panel.Panel',
    xtype: 'salaryCostGrid',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date',
        'Ext.form.field.ComboBox',  //下拉列表框
        'Ext.grid.column.RowNumberer',
        'Ext.grid.filters.Filters',

        'Ext.picker.Date',
        'Ext.picker.Month',
    ],


    layout: 'fit',
    items: [{
            xtype: 'gridpanel',
            scrollable: true,  
            itemId:'salaryCostGrid',
            bind: '{salaryOrderGridStroe}',
            columns: [{   
                header:'工资单id',
                dataIndex:'salaryOrderId',
                hidden:true
            },{   
            	header:'员工编号',
            	dataIndex:'empNo'
            },{
            	header:'姓名',
            	dataIndex:'empName'
            },{
            	header:'部门',
            	dataIndex:'deptName'
            },{
            	header:'基本工资',
            	dataIndex:'basicwage'
            },{
            	header:'加班工资',
            	dataIndex:'overtimefee'
            },{
            	header:'出差工资',
            	dataIndex:'allowance'
            },{
            	header:'请假所扣工资',
            	dataIndex:'reducemoney'
            },{ 
            	header: '实发工资' ,
                dataIndex: 'realwage'
            },{ 
                header: '日期' ,
                dataIndex: 'date',
                renderer: Ext.util.Format.dateRenderer('Y年m月')
            }],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                bind: '{salaryOrderGridStroe}'
            },{
                xtype:'toolbar',
                dock:'top',
                items:[{
                    xtype:'textfield',
                    emptyText:'按名称搜索...',
                    width:140,
                    enableKeyEvents: true,
                    itemId: 'queryEmpName',
                    triggers:{
                        bar:{
                            cls:'x-form-clear-trigger',
                            handler:'filterSalaryOrderAfterReset',
                        }
                    },
                    listeners:{
                        keyup:'filterSalaryOrder',
                        buffer: 250
                    }
                },{
                    xtype : 'combobox',
                    width:140,
                    itemId:'queryDeptName',
                    store: deptParents,
                    valueField : 'deptParent',
                    displayField: 'deptParent',
                    forceSelection:true,                
                    editable : false,
                    emptyText: '按部门搜索..',
                    listeners:{
                        select:'filterSalaryOrder'
                    }
                },{
                    xtype: 'checkboxfield',
                    itemId:'queryAllDept',
                    boxLabel: '显示所有部门',
                    listeners:{
                        change:'filterSalaryOrder'
                    }
                },'->',{
                    xtype : 'salaryDateSelect',
                }]
            }]
    }]
});

