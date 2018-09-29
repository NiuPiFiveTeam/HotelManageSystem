Ext.define('Admin.view.finance.financeReportDaily.FinanceReportDailyGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'financeReportDailyGrid',
    selModel: {
          selType: 'checkboxmodel'
    },
    layout: 'fit',
    bind: '{financeReportDailyStore}',
    columns: [{
        text: '财务详情id',
        flex: 1,
        dataIndex: 'financeReportDailyId'
    }, {
        text: '日期',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('Y/m/d'),
        dataIndex: 'date'
    }, {
        text: '客房收入',
        flex: 1,
        dataIndex: 'roomIncome'
    }, {
        text: '后勤支出',
        flex: 1,
        dataIndex: 'logisticstCost'
    }, {
        text: '工资支出',
        flex: 1,
        dataIndex: 'salaryCost'
    }, {
        text: '总收入',
        flex: 1,
        dataIndex: 'totalIncome'
    }, {
        text: '总支出',
        flex: 1,
        dataIndex: 'totalCost'
    }, {
        text: '利润',
        flex: 1,
        dataIndex: 'profit'
    }],

    tbar: [{
        xtype:'dateSelect',     //年月查询
    },'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'
    ,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'
    ,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'
    ,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'
    ,{
       // xtype: 'exporterbutton'   
        xtype: "combobox",
        width: 120,
        reference:'searchFieldName',
        editable: false,
        queryMode: 'local',
        store: [
             { name: '已选择记录', value: 'a' },
             { name: '本月', value: 'b' },
             { name: '全年', value: 'c' },
             { name: '全部数据', value: 'd' }
        ],
        displayField: 'name',
        valueField:'value',
        value:'请选择时间',
    }, {
        text:'导出 Excel',
        handler:'exportExcel'
    }],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: true,
        bind: '{financeReportDailyStore}'
    }]
    
});


