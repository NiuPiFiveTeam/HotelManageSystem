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
                    },
                    {
                        text: '季度报表',
                        iconCls: 'x-fa fa-times-circle',
                        // viewType: 'order',
                        leaf: true
                    }
                ]
            }
        ]
    }
});
