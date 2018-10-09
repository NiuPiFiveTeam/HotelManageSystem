Ext.define('Admin.view.logistics.roomClean.InventoryPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'inventoryPanel',

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
            title: '入库记录',
            bind: '{roomCleanContent}',
            scrollable: false,
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                itemId: 'userPaginationToolbar',
                displayInfo: true,
                bind: '{roomCleanContent}'
            }]
        },
        {
            xtype: 'gridpanel',
            cls: 'user-grid',
            title: '出库记录',
            bind: '{roomCleanContent}',
            scrollable: false,
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                itemId: 'userPaginationToolbar',
                displayInfo: true,
                bind: '{roomCleanContent}'
            }]
        },
        {
            xtype: 'gridpanel',
            cls: 'user-grid',
            title: '库存',
            bind: '{roomCleanContent}',
            scrollable: false,
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                itemId: 'userPaginationToolbar',
                displayInfo: true,
                bind: '{roomCleanContent}'
            }]
        }
    ]
});
