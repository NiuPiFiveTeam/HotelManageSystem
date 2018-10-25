Ext.define('Admin.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    //TODO: implement central Facebook OATH handling here

    onFaceBookLogin : function() {
        this.redirectTo('dashboard', true);
    },

    onLoginButton: function(btn) {
        var me = this;
        Ext.Ajax.request({
            url: 'login',
            method: 'post',
            params: {
                userName: btn.up("form").getForm().findField("userid").getValue(),
                logintype: btn.up("form").getForm().findField("logintype").getValue(),
                password: btn.up("form").getForm().findField("password").getValue()
            },
            success: function(response, options) {
                var json = Ext.util.JSON.decode(response.responseText);
                if(json.success){
                    Ext.Ajax.request({
                        url: 'menu/findMenu',
                        method: 'post',
                        params: {
                            userName: btn.up("form").getForm().findField("userid").getValue(),
                            logintype: btn.up("form").getForm().findField("logintype").getValue(),
                        },
                        success: function(response1, options) {
                           
                            Ext.getCmp('loginUserName').setText(json.map.userName);

                            var naviTree = Ext.StoreManager.lookup('NavigationTree');
                            var selectmenu = Ext.util.JSON.decode(response1.responseText);
                            var deptName = selectmenu.map['deptName'];
                            var deptRole = selectmenu.map['groupName'];
                            console.log(selectmenu);
                            // naviTree.removeAll();
                              let frontTableService = {
                                expanded: true,
                                children: [
                                    {
                                        text: '员工自助管理',
                                        iconCls: 'x-fa fa-address-card',
                                        children: [
                                            {
                                                text: '信息管理',
                                                iconCls: 'x-fa fa-user-circle',
                                                viewType: 'selfEmpTab',
                                                leaf: true
                                            },{
                                                text: '考勤打卡',
                                                iconCls: 'x-fa fa-check',
                                                viewType: 'workTab',
                                                leaf: true
                                           },{
                                                text: '请假管理',
                                                iconCls: 'x-fa fa-address-card',
                                                viewType: 'leaveTab',
                                                leaf: true
                                            },{
                                                text: '出差管理',
                                                iconCls: 'x-fa fa-address-card',
                                                viewType: 'travelTab',
                                                leaf: true
                                            }
                                        ]
                                    },{
                                    text: '客房管理',
                                    iconCls: 'x-fa fa-home',
                                    expanded: false,
                                    selectable: false,
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
                                        },
                                ]
                                };
                                let frontTableServiceManager = {
                                    expanded: true,
                                    children: [
                                        {
                                            text: '员工自助管理',
                                            iconCls: 'x-fa fa-address-card',
                                            children: [
                                                {
                                                    text: '信息管理',
                                                    iconCls: 'x-fa fa-user-circle',
                                                    viewType: 'selfEmpTab',
                                                    leaf: true
                                                },{
                                                    text: '考勤打卡',
                                                    iconCls: 'x-fa fa-check',
                                                    viewType: 'workTab',
                                                    leaf: true
                                               },{
                                                    text: '请假管理',
                                                    iconCls: 'x-fa fa-address-card',
                                                    viewType: 'leaveTab',
                                                    leaf: true
                                                },{
                                                    text: '出差管理',
                                                    iconCls: 'x-fa fa-address-card',
                                                    viewType: 'travelTab',
                                                    leaf: true
                                                }
                                            ]
                                        },{
                                        text: '客房管理',
                                        iconCls: 'x-fa fa-home',
                                        expanded: false,
                                        selectable: false,
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
                                                        viewType: 'companyWorkTab',
                                                        leaf: true
                                                    },
                                                    {
                                                        text: '部门管理',
                                                        iconCls: 'x-fa fa-lightbulb-o',
                                                        viewType: 'deptTab',
                                                        leaf: true
                                                    }
                                                ]
                                            }
                                    ]
                                    };
                              let finaticMenu = {
                                expanded: true,
                                children: [
                                    {
                                        text: '员工自助管理',
                                        iconCls: 'x-fa fa-address-card',
                                        children: [
                                            {
                                                text: '信息管理',
                                                iconCls: 'x-fa fa-user-circle',
                                                viewType: 'selfEmpTab',
                                                leaf: true
                                            },{
                                                text: '考勤打卡',
                                                iconCls: 'x-fa fa-check',
                                                viewType: 'workTab',
                                                leaf: true
                                           },{
                                                text: '请假管理',
                                                iconCls: 'x-fa fa-address-card',
                                                viewType: 'leaveTab',
                                                leaf: true
                                            },{
                                                text: '出差管理',
                                                iconCls: 'x-fa fa-address-card',
                                                viewType: 'travelTab',
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
                                                viewType: 'roomOrderPanel',
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
                                    },
                                ]
                              };

                              let finaticMenuManager = {
                                expanded: true,
                                children: [
                                    {
                                        text: '员工自助管理',
                                        iconCls: 'x-fa fa-address-card',
                                        children: [
                                            {
                                                text: '信息管理',
                                                iconCls: 'x-fa fa-user-circle',
                                                viewType: 'selfEmpTab',
                                                leaf: true
                                            },{
                                                text: '考勤打卡',
                                                iconCls: 'x-fa fa-check',
                                                viewType: 'workTab',
                                                leaf: true
                                           },{
                                                text: '请假管理',
                                                iconCls: 'x-fa fa-address-card',
                                                viewType: 'leaveTab',
                                                leaf: true
                                            },{
                                                text: '出差管理',
                                                iconCls: 'x-fa fa-address-card',
                                                viewType: 'travelTab',
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
                                                viewType: 'roomOrderPanel',
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
                                                viewType: 'companyWorkTab',
                                                leaf: true
                                            },
                                            {
                                                text: '部门管理',
                                                iconCls: 'x-fa fa-lightbulb-o',
                                                viewType: 'deptTab',
                                                leaf: true
                                            }
                                        ]
                                    }
                                ]
                              };
                               
                              let roomService = {
                                expanded: true,
                                children: [
                                    {
                                        text: '员工自助管理',
                                        iconCls: 'x-fa fa-address-card',
                                        children: [
                                            {
                                                text: '信息管理',
                                                iconCls: 'x-fa fa-user-circle',
                                                viewType: 'selfEmpTab',
                                                leaf: true
                                            },{
                                                text: '考勤打卡',
                                                iconCls: 'x-fa fa-check',
                                                viewType: 'workTab',
                                                leaf: true
                                           },{
                                                text: '请假管理',
                                                iconCls: 'x-fa fa-address-card',
                                                viewType: 'leaveTab',
                                                leaf: true
                                            },{
                                                text: '出差管理',
                                                iconCls: 'x-fa fa-address-card',
                                                viewType: 'travelTab',
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
                                        text: '财务管理',
                                        iconCls: 'x-fa fa-money',
                                        expanded: false,
                                        selectable: false,
                                        children: [
                                             { 
                                                text: '后勤入库申请/审批',
                                                iconCls: 'x-fa fa-drivers-license-o',
                                                viewType: 'inStorageApplyCenterPanel',
                                                leaf: true
                                            }
                                        ]
                                    }
                                ]
                              };

                              let roomServiceManager = {
                                expanded: true,
                                children: [
                                    {
                                        text: '员工自助管理',
                                        iconCls: 'x-fa fa-address-card',
                                        children: [
                                            {
                                                text: '信息管理',
                                                iconCls: 'x-fa fa-user-circle',
                                                viewType: 'selfEmpTab',
                                                leaf: true
                                            },{
                                                text: '考勤打卡',
                                                iconCls: 'x-fa fa-check',
                                                viewType: 'workTab',
                                                leaf: true
                                           },{
                                                text: '请假管理',
                                                iconCls: 'x-fa fa-address-card',
                                                viewType: 'leaveTab',
                                                leaf: true
                                            },{
                                                text: '出差管理',
                                                iconCls: 'x-fa fa-address-card',
                                                viewType: 'travelTab',
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
                                        text: '财务管理',
                                        iconCls: 'x-fa fa-money',
                                        expanded: false,
                                        selectable: false,
                                        children: [
                                             { 
                                                text: '后勤入库申请/审批',
                                                iconCls: 'x-fa fa-drivers-license-o',
                                                viewType: 'inStorageApplyCenterPanel',
                                                leaf: true
                                            }
                                        ]
                                    },{
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
                                                viewType: 'companyWorkTab',
                                                leaf: true
                                            },
                                            {
                                                text: '部门管理',
                                                iconCls: 'x-fa fa-lightbulb-o',
                                                viewType: 'deptTab',
                                                leaf: true
                                            }
                                        ]
                                    }
                                ]
                              };
                            let emplyeeMenuManager = {
                                expanded: true,
                                children: [
                                    {
                                        text: '员工自助管理',
                                        iconCls: 'x-fa fa-address-card',
                                        children: [
                                            {
                                                text: '信息管理',
                                                iconCls: 'x-fa fa-user-circle',
                                                viewType: 'selfEmpTab',
                                                leaf: true
                                            },{
                                                text: '考勤打卡',
                                                iconCls: 'x-fa fa-check',
                                                viewType: 'workTab',
                                                leaf: true
                                           },{
                                                text: '请假管理',
                                                iconCls: 'x-fa fa-address-card',
                                                viewType: 'leaveTab',
                                                leaf: true
                                            },{
                                                text: '出差管理',
                                                iconCls: 'x-fa fa-address-card',
                                                viewType: 'travelTab',
                                                leaf: true
                                            }
                                        ]
                                    },{
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
                                            viewType: 'companyWorkTab',
                                            leaf: true
                                        },
                                        {
                                            text: '部门管理',
                                            iconCls: 'x-fa fa-lightbulb-o',
                                            viewType: 'deptTab',
                                            leaf: true
                                        }
                                    ]
                                }
                                ]
                            }

                            if(deptRole.trim() == "{仓库经理}" && deptName.trim() == "后勤仓库部门"){
                                    naviTree.setRoot(roomServiceManager);
                            }else if(deptRole.trim() == "{后勤员工}" && deptName.trim() == "后勤仓库部门"){
                                naviTree.setRoot(roomService);
                            }else if(deptRole.trim() == "{清洁部门经理}" && deptName.trim() == "后勤清洁部门"){
                                naviTree.setRoot(roomServiceManager);
                            }else if(deptRole.trim() == "{清洁部门员工}" && deptName.trim() == "后勤清洁部门"){
                                naviTree.setRoot(roomService);
                            }else if(deptRole.trim() == "{财务经理}" && deptName.trim() == "财务部"){
                                naviTree.setRoot(finaticMenuManager);
                            }else if(deptRole.trim() == "{财务员工}" && deptName.trim() == "财务部"){
                                naviTree.setRoot(finaticMenu);
                            }else if(deptRole.trim() == "{前台经理}" && deptName.trim() == "前台服务部门"){
                                naviTree.setRoot(frontTableServiceManager);
                            }else if(deptRole.trim() == "{前台服务员}" && deptName.trim() == "前台服务部门"){
                                naviTree.setRoot(frontTableService);
                            }else if(deptRole.trim() == "{Admin}" && deptName.trim() == "Admin管理部门"){
                                naviTree.setRoot(emplyeeMenuManager);
                            }
                                
                            alert('你好，加载好菜单了');
                            me.redirectTo('workTab', true);
                        }
                    });
                }else{
                    Ext.Msg.alert('登录失败', json.msg);
                }
            }
        });

    },

    onLoginAsButton: function() {
        this.redirectTo('login', true);
    },

    onNewAccount:  function() {
        this.redirectTo('register', true);
    },

    onSignupClick:  function() {
        this.redirectTo('dashboard', true);
    },

    onResetClick:  function() {
        this.redirectTo('dashboard', true);
    },
    onEditPWDButton: function(btn){
        var newPWD = btn.up("form").getForm().findField("newpassword").getValue();
        var newPWD2 = btn.up("form").getForm().findField("newpassword2").getValue();
        if(newPWD == newPWD2){
            Ext.Ajax.request({
            url: 'editPassword',
            method: 'post',
            params: {
                oldpassword: btn.up("form").getForm().findField("oldpassword").getValue(),
                newpassword: btn.up("form").getForm().findField("newpassword").getValue()
            },
            success: function(response, options) {
                var json = Ext.util.JSON.decode(response.responseText);
                if(json.success){
                    btn.up("form").getForm().reset();
                    Ext.Msg.alert('success', json.msg);
                }else{
                    Ext.Msg.alert('失败', json.msg);
                }
            }
            });
        }else{
            Ext.Msg.alert('失败', 密码不一致);
        }
    }
});