Ext.define('Admin.view.employ.addEmp.LookEmpWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.lookEmpWindow',
    xtype: 'lookEmpWindow',
    
    reference: 'lookEmpwindow',
    
    id:'lookEmpwindow',
    title: '查看员工信息',
    //margin:'',
    padding:'20 20 0 150',
    scrollable:true,
    width: 1000,
    autoHeight : true,
    region: "center",

    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 115,
        //labelAlign: 'top',
        msgTarget: 'side'
    },

    items: [{
        xtype:'form',
        reference: 'lookEmpForm',
        items:[
            {
        xtype: 'fieldset',
        title: '工作信息',
        defaultType: 'textfield',
        layout: 'hbox',
        defaults: {
            anchor: '100%',
            componentCls: ""
        },
        items: [{
            xtype: 'container',
            layout: 'vbox',
            defaultType: 'textfield',
            margin: '0 0 0 0',

            items: [{
                fieldLabel: '员工姓名',
                name: 'empName',
                editable : false,
                allowBlank: true
            }, {
                
                fieldLabel: '部门',
                name: 'deptName',           
                editable : false,
                allowBlank: true

                
            }, {
                
                fieldLabel: '性别',
                name: 'empSex',
                editable : false,
                allowBlank: true
            }, {
                fieldLabel: '类别',
                name: 'jobtype',              
                editable : false,

                allowBlank: true
            }, {
                fieldLabel: '离职时间',
                name: 'endDate',
                //labelWidth: 100,
                editable : false,
                allowBlank: true
            }]
            
        },{
            xtype: 'container',
            layout: 'vbox',
            defaultType: 'textfield',
            margin: '0 0 5 0',

            items: [{
                fieldLabel: '员工编号',
                name: 'empNo',
                editable : false,
                //labelWidth: 100,
                allowBlank: true
            }, {
                fieldLabel: '员工账户',
                name: 'userName',
                editable : false,
                //labelWidth: 100,
                allowBlank: true
            }, {
                
                fieldLabel: '职称',
                name: 'groupName',
                editable : false,
                allowBlank: true
                
            }, {
                fieldLabel: '入职日期',
                name: 'entryDate',
                //labelWidth: 100,
                editable : false,
                allowBlank: true
            }, {
                fieldLabel: '员工ID',
                name: 'emp_id',
                hidden:true,
                editable : false,
                //labelWidth: 100,
                allowBlank: true
            }]
        } ,{
            xtype: 'container',
            layout: 'vbox',
            defaultType: 'textfield',
            margin: '0 0 5 0',
            padding: '0 0 0 50',
            items:[{
                xtype: 'image',
                id: 'imagelookId',
                //name:"empImage",
                src: 'resources/images/user-profile/1.png',
                height: 160,
                width: 140 
                }]
             
        }   
        ]}, {

        xtype: 'fieldset',
        title: '个人信息',
        defaultType: 'textfield',
        layout: 'anchor',
        defaults: {
            anchor: '100%',
            componentCls: ""
        },
        items: [{
            xtype: 'container',
            layout: 'hbox',
            defaultType: 'textfield',
            margin: '0 0 5 0',

            items: [{
                fieldLabel: '身份证号码',
                name: 'idcard',
                editable : false,
                allowBlank: true

            }, {
                fieldLabel: '电话号码',
                name: 'tel',
                editable : false,
                allowBlank: true
                
            }]
        },{
            fieldLabel: '家庭住址',
            name: 'address',
            editable : false,
            allowBlank: true
        },{
            xtype:'textareafield',
            fieldLabel: '员工简介',
            name: 'introduce',
            editable : false,
            allowBlank: true
        }]    
        }
        ]
    }

    ],
    buttons: [{
        text: '退出',
        handler: function(btn) {
            btn.up('window').close();
        }
    }]

});