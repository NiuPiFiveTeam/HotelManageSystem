Ext.define('Admin.view.logistics.roomClean.RoomCardPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'roomCardPanel',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
    ],
    cls: 'shadow',
    activeTab: 0,

    items: [
        {
            xtype: 'gridpanel',
            cls: 'user-grid',
            title: '遗漏物品管理',
            bind: '{roomCardContent}',
            scrollable: false,
            columns: [
                {xtype: 'gridcolumn',width: 60,dataIndex: 'id',text: '编号',align:'center', hidden :true,},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'goodsName',  text: '物品名', align:'center',flex: 1,},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'goodsRepresent',  text: '物品描述', align:'center',flex: 1,},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'goodsPut',  text: '物品拾取人', align:'center',flex: 1,},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'goodsGet',  text: '物品领取人', align:'center',flex: 1,},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'goodsGetNo',  text: '领取人身份证号', align:'center',flex: 1,},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'goodsGetPhone',  text: '领取人电话号码', align:'center',flex: 1,},
                {xtype: 'actioncolumn',cls: 'content-column', width: 150,dataIndex: 'bool',text: '领取操作',align:'center',
                items: [{xtype: 'button',handler: 'onOutCleanButton',tooltip : '退房清洁', //iconCls: 'x-fa fa-close'	,
                        getClass : function (v, metadata, r, rowIndex, colIndex, store) {
                        var goodsGet = r.data.goodsGet;
                        if(goodsGet == ''){
                            return 'x-fa fa-refresh';
                        }
                        else{
                            return 'x-hidden';
                        }
                            },
                        },
        ],
            }
            ],
            tbar: [
            '->',
            {
                text:"Add",
                handler:"add"
            },
            '->',
        ],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                itemId: 'userPaginationToolbar',
                displayInfo: true,
                bind: '{roomCardContent}'
            }]
        }
    ]
});
