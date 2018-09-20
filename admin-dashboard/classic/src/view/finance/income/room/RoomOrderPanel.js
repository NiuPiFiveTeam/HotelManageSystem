Ext.define('Admin.view.finance.income.room.RoomOrderPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'roomOrderPanel',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date',

        'Ext.form.field.ComboBox',  //下拉列表框
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.RowNumberer',
    ],

    layout: 'fit',
    items: [{
            xtype: 'gridpanel',
            selType: 'checkboxmodel',   //复选框
            cls: 'order-grid',
            // title: '订单管理模块',
            headerBorders: true, //边框
            //routeId: 'user',
            bind: '{roomOrderLists}',
            scrollable: true,  //可滚动的
            columns: [{             //hidden:true
                text: '订单Id',
                flex:1,
                name:'orderId',
                dataIndex: 'orderId'
            }, {
                text: '客户编号',   
                flex:1,
                formatter: 'usMoney',
                dataIndex: 'userId'
            }, {
                text: '客房号',
                name:'roomId',
                flex:1,
                // renderer: 'renderChange',
                dataIndex: 'roomId'
            },{
                text: '住     房     时     间',
                flex:4,
                columns:[{
                    text: '入住日期',
                    xtype:'datecolumn',
                    flex:1,
                    // renderer: 'renderPercent',
                    formatter: 'date("Y/m/d H:i:s")',
                    dataIndex: 'comeDate'
                }, {
                    text: '结算日期',
                    xtype:'datecolumn',
                    flex:1,
                    formatter: 'date("Y/m/d H:i:s")',
                    dataIndex: 'leftDate'
                },  {
                    text: '总天数',
                    flex:1,
                    // formatter: 'date("m/d/Y")',
                    dataIndex: 'time'
                }]
            }, {
                text: '房费',
                flex:1,
                dataIndex: 'amount'
            }, {
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

        
            tbar: [{      
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

            dockedItems: [ 
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                bind: '{roomOrderLists}'
            }]

        }]
});

