Ext.define('Admin.view.finance.cost.inStorageCost.InStorageOrderGrid', {
    extend: 'Ext.panel.Panel',
    xtype: 'inStorageOrderGrid',

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
            itemId:'inStorageCostGrid',
            bind: '{inStorageOrderStore}',
            columns: [{   
                header:'入库单号',
                dataIndex:'inStorageId',
                align:'center',
                flex:1
            },{   
            	header:'申请人',
                dataIndex:'employeeId',
                align:'center',
                flex:1
            },{
                header:'总金额', 
                dataIndex:'amount',
                align:'center',
                flex:1
            },{
                header:'供货商', 
                dataIndex:'vender',
                align:'center',
                flex:1
            },{
                header:'申请时间', 
                dataIndex:'applyTime',
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i'),
                align:'center',
                flex:1
            },{
                header:'入库时间', 
                dataIndex:'inStorageDate',
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i'),
                align:'center',
                flex:1
            },{
                header:'入库状态', 
                dataIndex:'processStatus',
                renderer:function(value, metaData, record){
                    return '<span style="color:green;">已入库</span>';
                },
                flex:1
            }],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                bind: '{inStorageOrderStore}'
            },{
                xtype:'toolbar',
                dock:'top',
                items:[{
                    xtype:'textfield',
                    emptyText:'申请人搜索...',
                    width:140,
                    enableKeyEvents: true,
                    itemId: 'queryUserName',
                    triggers:{
                        bar:{
                            cls:'x-form-clear-trigger',
                            handler:'filterInStorageOrderAfterReset',
                        }
                    },
                    listeners:{
                        keyup:'filterInStorageOrder',
                        buffer: 250
                    }
                },{
                    xtype: 'datefield',
                    format: 'Y/m/d',
                    labelAlign:'right',
                    itemId: 'queryApplyTime',
                    fieldLabel: '申请时间',
                    listeners:{
                        change:'filterInStorageOrder'
                    }
                },{
                    text:'重置',
                    handler:'resetApplyTime'
                },{
                    xtype: 'datefield',
                    format: 'Y/m/d',
                    labelAlign:'right',
                    itemId: 'queryInStorageTime',
                    fieldLabel: '入库时间',
                    listeners:{
                        change:'filterInStorageOrder'
                    }
                },{
                    text:'重置',
                    handler:'resetInStorageTime'
                }]
            }]
    }]
});

