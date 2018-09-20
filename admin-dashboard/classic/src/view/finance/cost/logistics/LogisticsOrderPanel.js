Ext.define('Admin.view.finance.cost.logisticst.LogisticstOrderPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'logisticsPanel',

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

            bind: '{logisticsOrderLists}',
            scrollable: true,  //可滚动的
            columns: [{             //hidden:true
                text: 'id',
                flex:1,
                name:'logisticstOrderId',
                dataIndex: 'logisticstOrderId'
            }, {
                text: '采购单号',
                name:'purchaseId',
                flex:1,
                dataIndex: 'purchaseId'
            },{
                text: '入库日期',
                xtype:'datecolumn',
                flex:1,
                formatter: 'date("Y/m/d H:i:s")',
                dataIndex: 'inDate'
            }, {
                text: '总金额',
                flex:1,
                dataIndex: 'amount'
            }, {
                text: '时间',
                xtype:'datecolumn',
                flex:1,
                formatter: 'date("Y/m/d H:i:s")',
                dataIndex: 'time'
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
                bind: '{logisticsOrderLists}'
            }]

        }]
});

