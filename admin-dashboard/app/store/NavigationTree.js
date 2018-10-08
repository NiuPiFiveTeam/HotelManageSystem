Ext.define('Admin.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',

    fields: [{
        name: 'text'
    }],

    root: {
        expanded: true,
        children: [
            {
                text: 'Dashboard',
                iconCls: 'x-fa fa-desktop',
                rowCls: 'nav-tree-badge nav-tree-badge-new',
                viewType: 'admindashboard',
                routeId: 'dashboard', // routeId defaults to viewType
                leaf: true
            },{
                text: '财务管理',
                iconCls: 'x-fa fa-leanpub',
                expanded: false,
                selectable: false,
                children: [
                    {
                        text: '财务收入管理',
                        iconCls: 'x-fa fa-file-o',
                        viewType: 'income',
                        leaf: true
                    },
                    {
                        text: '财务支出管理',
                        iconCls: 'x-fa fa-exclamation-triangle',
                        viewType: 'cost',
                        leaf: true
                    }
                ]
            },{
                text: '酒店报表',
                iconCls: 'x-fa fa-times-circle',
                expanded: false,
                selectable: false,
                children: [
                    {
                        text: '财务报表',
                        iconCls: 'x-fa fa-file-o',
                        viewType: 'financeReport',
                        leaf: true
                    },
                    {
                        text: '财务详细',
                        iconCls: 'x-fa fa-exclamation-triangle',
                        viewType: 'financeReportDaily',
                        leaf: true
                    }
                ]
            },{
                text: '酒店后勤',
                iconCls: 'x-fa fa-building',
                rowCls: 'nav-tree-badge nav-tree-badge-hot',
                leaf: false,
                children: [
                    {
                        text: '客房内务',
                        iconCls: 'x-fa fa-university',
                        viewType: 'roomClean',
                        leaf: true,
                    },
                    {
                        text: '房卡管理',
                        iconCls: 'x-fa fa-credit-card',
                        viewType: 'roomCard',
                        leaf: true
                    },
                    {
                        text: '库存管理',
                        iconCls: 'x-fa fa-truck',
                        viewType: 'inventory',
                        leaf: true
                    },
                ]  
            }
        ]
    }
});
