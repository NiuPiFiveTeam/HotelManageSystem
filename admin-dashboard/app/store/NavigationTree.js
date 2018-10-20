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
                text: '客房管理',
                iconCls: 'x-fa fa-home',
                //rowCls: 'nav-tree-badge nav-tree-badge-new',
                expanded: false,
                selectable: false,
                // viewType: 'room',
                children: [
                    {
                        text: '查看空闲房间',
                        iconCls: 'x-fa fa-hotel',
                        viewType: 'emptyRoom',
                        leaf: true
                    },

                    {
                        text: '查看入住情况',
                        iconCls: 'x-fa fa-exclamation-triangle',
                        viewType: 'inRoom',
                        leaf: true
                    },
                    {
                        text: '查看总体情况',
                        iconCls: 'x-fa fa-area-chart',
                        viewType: 'allRoom',
                        leaf: true
                    }
                ]
                
            },{
                text: '客户管理',
                iconCls: 'x-fa fa-user-o',
                //rowCls: 'nav-tree-badge nav-tree-badge-new',
                expanded: false,
                selectable: false,
                // viewType: 'room',
                children: [
                    {
                        text: '客人信息登记',
                        iconCls: 'x-fa fa-user-plus',
                        viewType: 'addGuest',
                        leaf: true
                    },
                    {
                        text: 'VIP客户信息',
                        iconCls: 'x-fa fa-handshake-o',
                        viewType: 'vipGuest',
                        leaf: true
                    },
                    {
                        text: '查看入住客户',
                        iconCls: 'x-fa fa-group',
                        viewType: 'lookCheckInGuest',
                        leaf: true
                    }
                ]
                
            },{
                text: '财务管理',
                iconCls: 'x-fa fa-money',
                expanded: false,
                selectable: false,
                children: [
                    {
                        text: '财务收入管理',
                        iconCls: 'x-fa fa-usd',
                        // viewType: 'income',
                        leaf: true
                    },
                    {
                        text: '财务支出管理',
                        iconCls: 'x-fa fa-calendar-minus-o',
                        viewType: 'cost',
                        leaf: true
                    },     
                    {               
                        text: '后勤入库申请/审批',
                        iconCls: 'x-fa fa-drivers-license-o',
                        viewType: 'inStorageApplyCenterPanel',
                        leaf: true
                    }
                ]
            },{
                text: '酒店报表',
                iconCls: 'x-fa fa-area-chart',
                expanded: false,
                selectable: false,
                children: [
                    {
                        text: '财务报表',
                        iconCls: 'x-fa fa-bar-chart-o',
                        viewType: 'financeReport',
                        leaf: true
                    },
                    {
                        text: '财务详细',
                        iconCls: 'x-fa fa-file-text-o',
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
            },{
                text: 'Login',
                iconCls: 'x-fa fa-check',
                viewType: 'login',
                leaf: true
           },{
                text: '流程定义模块',
                iconCls: 'x-fa fa-address-card',
                viewType: 'processDefinitionCenterPanel',
                leaf: true
            },
           {
                text: '员工自助管理',
                iconCls: 'x-fa fa-address-card',
                children: [
        
                    {
                        text: '账户管理',
                        iconCls: 'x-fa fa-user-circle',
                        viewType: 'editPassword',
                        leaf: true
                    },{
                        text: '考勤打卡',
                        iconCls: 'x-fa fa-check',
                        viewType: 'workTab',
                        leaf: true
                   },{
                        text: '请假管理模块',
                        iconCls: 'x-fa fa-address-card',
                        viewType: 'leaveCenterPanel',
                        leaf: true
                        
                    },{
                        text: '请假审批',
                        iconCls: 'x-fa fa-address-card',
                        viewType: 'leaveApproveCenterPanel',
                        leaf: true
                    },{
                        text: '出差管理模块',
                        iconCls: 'x-fa fa-address-card',
                        viewType: 'travelCenterPanel',
                        leaf: true
                        
                    },{
                        text: '出差审批',
                        iconCls: 'x-fa fa-address-card',
                        viewType: 'travelApproveCenterPanel',
                        leaf: true
                    }
                ]
                
            },
            
            {
                text: '员工管理',
                iconCls: 'x-fa fa-address-card',
                children: [
        
                    {
                        text: '人员信息管理',
                        iconCls: 'x-fa fa-user-circle',
                        viewType: 'empTab',
                        leaf: true
                    },
                    {
                        text: '排班管理',
                        iconCls: 'x-fa fa-lock',
                        viewType: 'paiBanTab',
                        leaf: true
                    },

                    {
                        text: '考勤统计',
                        iconCls: 'x-fa fa-check',
                        //viewType: 'login',
                        
                        leaf: true
                    },
                    
                    {
                        text: '部门管理',
                        iconCls: 'x-fa fa-lightbulb-o',
                        viewType: 'deptTab',
                        leaf: true
                    },
                    {
                        text: '员工意见',
                        iconCls: 'fa fa-envelope-open-o',
                       // viewType: 'passwordreset',
                        
                        leaf: true
                    }
                    

                ]
                
            }
        ]
    }
});
