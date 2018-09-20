Ext.define('Admin.view.finance.cost.salary.SalaryPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'salaryPanel',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date',

        'Ext.form.field.ComboBox',  //下拉列表框
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.RowNumberer'
    ],

    layout: 'fit',
    items: [{
            xtype: 'gridpanel',
            selType: 'checkboxmodel',   //复选框
            // cls: 'order-grid',

            headerBorders: true, //边框

            bind: '{orderLists}',
            scrollable: true,  //可滚动的
            columns: [{             //hidden:true
                text: 'id',
                flex:1,
                name:'salaryOrderId',
                dataIndex: 'salaryOrderId'
            }, {
                text: '部门',
                name:'deptName',
                flex:1,
                dataIndex: 'deptName'
            },{
                text: '员工编号',
                name:'userId',
                flex:1,
                dataIndex: 'userId'
            },{
                text: '员工姓名',
                xtype:'userName',
                flex:1,
                dataIndex: 'userName'
            }, {
                text: '工     资     项     目',
                flex:3,
                columns:[{
                    text: '基本工资',
                    flex:1,
                    dataIndex: 'basicwage'
                },{
                    text: '加班费',
                    flex:1,
                    dataIndex: 'overtimefee'
                }, {
                    text: '出差费',
                    flex:1,
                    dataIndex: 'allowance'
                },  {
                    text: '奖金',
                    flex:1,
                    dataIndex: 'bonus'
                }]
            },  {
                text: '扣发款项(请假)',
                flex:1,
                dataIndex: 'reducemoney'
            },{
                text: '实际工资',
                flex:1,
                dataIndex: 'reducemoney'
            },{
                text: '扣发款项(请假)',
                flex:1,
                dataIndex: 'realwage'
            },{
                text: '月份',
                flex:1,
                dataIndex: 'month'
            },{
                text: '操作',
                align: 'center', 
                flex:2,
                cls:'content-column',
                xtype: 'actioncolumn',

                items: [{
                    iconCls: 'x-fa fa-pencil',
                    tooltip: '修改',  //提示
                    handler: 'openEditWindow',
                },{
                    iconCls: 'x-fa fa-trash-o',
                    tooltip: '删除',
                    handler: 'deleteOneOrder'
                }]
            }],

        
            tbar: [{      //Short for 'Top Bar'.
                xtype: 'combobox',
                reference:'searchFieldName',  //重要
                // hideLabel: true,
                store:Ext.create("Ext.data.Store", {
                    fields: ["name", "value"],
                    data: [
                        { name: '订单编号', value: 'orderId' },
                        { name: '入住时间', value: 'comeDate' }
                    ]
                }),
                displayField: 'name',
                valueField:'value',
                value:'orderId',
                editable: false,
                queryMode: 'local',
                triggerAction: 'all',
                // emptyText: 'Select a state...',
                width: 135,
                listeners:{
                    select: 'searchComboboxSelectChuang'
                }
            }, '-',{
                xtype:'textfield',
                reference:'searchId',
                // name:'orderPanelSearchField'
            }, {
                xtype: 'datefield',
                // hideLabel: true,
                hidden:true,
                format: 'Y/m/d H:i:s',
                reference:'searchcomeDateFrom',
                fieldLabel: 'From',
                labelWidth:'4'
                // value:'From'
                // name: 'from_date'
                //,id:'from_date',
                //vtype: 'daterange',
                //endDateField: 'to_date'
            }, {
                xtype: 'datefield',
                // hideLabel: true,
                hidden:true,
                format: 'Y/m/d H:i:s',
                reference:'searchcomeDateTo',
                fieldLabel: 'To',
                labelWidth:'2'
                // name: 'to_date'
                //,id:'to_date',
                //vtype: 'daterange',
                //startDateField: 'from_date'
            },'-',{
                text: 'Search',
                cls: 'order-tbar',
                iconCls: 'x-fa fa-search',
                handler: 'quickSearch'
            }, '-',{
                cls: 'order-tbar',
                text: 'Search More',
                iconCls: 'x-fa fa-search-plus',  
                handler: 'openSearchWindow' 
            }, '->',{
                text: '手动添加订单',
                cls: 'order-tbar',
                tooltip: 'Add a new row',
                iconCls: 'x-fa fa-plus',
                handler: 'openAddWindow'    
            },'-',{
                text: 'Removes', 
                cls: 'order-tbar',
                tooltip: '删除选中的多条订单',
                iconCls:'x-fa fa-trash',
                handler: 'deleteMoreRows'   
            }],  

            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                bind: '{orderLists}'
            }]

        }]
});

