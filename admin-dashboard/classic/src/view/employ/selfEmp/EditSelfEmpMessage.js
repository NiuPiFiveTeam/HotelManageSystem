Ext.define('Admin.view.employ.selfEmp.EditSelfEmpMessage', {
    extend: 'Ext.form.Panel',
    xtype: 'editSelfEmpMessage',
    //controller: 'empTabController',
    id:'editSelfEmpMessage',

    frame: true,
    //title: 'Register',
    bodyPadding: 10,
    scrollable:true,
    width: 800,
    anchor: '100%',
    layout: {
        type: 'vbox',
        align: 'center'
        //pack: 'center'
    },
    listeners: {
       'render': function(form) {
           form.getForm().load({  
                        url: '/employ/lookselfmassage',  
                        waitTitle : '请等待' ,   
                        success:function(form,action){
                            Ext.getCmp('imagelookId3').setSrc('resources/images/employee/'+action.result.data.empImage);
                        },  
                        failure:function(form,action){  
                        Ext.Msg.alert('提示','保存失败！');  
                        }  
          });                                 
        }
    },

    fieldDefaults: {
        labelAlign: 'left',
        fieldWidth: 115,
        labelWidth: 115,
        labelhight:30,
        msgTarget: 'side'
    },
    items: [{
        xtype:'form',
        reference: 'editselfEmpForm',

        items:[{
            xtype: 'fieldset',
            title: '个人信息',
            defaultType: 'textfield',
            layout: 'hbox',
            defaults: {
                anchor: '100%',
                componentCls: ""
            },
            items:[{
                xtype: 'container',
                layout: 'vbox',
                defaultType: 'textfield',
                margin: '0 0 0 0',
                width:500,
                items: [{
                    fieldLabel: '员工ID',
                    name: 'emp_id',
                    hidden:true,
                    //labelWidth: 100,
                    allowBlank: true
                },{
                    fieldLabel: '员工姓名',
                    name: 'empName',
                    allowBlank: true
                }, {
                    xtype: 'displayfield',
                    fieldLabel: '员工编号',
                    name: 'empNo',
                    //labelWidth: 100,
                    allowBlank: true
                },{
                    xtype: 'displayfield',
                    fieldLabel: '员工账户',
                    name: 'userName',
                    //labelWidth: 100,
                    allowBlank: true
                },{
                    xtype: 'combobox',
                    fieldLabel: '性别',
                    name: 'empSex',
                    store : new Ext.data.ArrayStore({
                        fields : ['empSexid', 'empSex'],
                        data : [["1", '男'], ["2", '女']]
                        }),
                    valueField : 'empSex',
                    displayField: 'empSex',
                    editable : false,
                    emptyText: '请选性别',
                    queryMode: 'local',    

                    allowBlank: true
                },{
                    fieldLabel: '身份证号码',
                    name: 'idcard',
                    allowBlank: true,
                    listeners: {
                                keyup: function(){
                                    Ext.Ajax.request({
                                    url: 'checkpwd',
                                    method: 'post',
                                    params: {
                                        oldpassword: Ext.getCmp('oldpassword').getValue()
                                    },
                                    success: function(response, options) {
                                        var json = Ext.util.JSON.decode(response.responseText);
                                        if(!json.success){
                                            Ext.getCmp('oldPWD').update("<span style='font-size:16px;line-height:30px;color:red;'>*输入密码有误</span>");
                                        }else{
                                            Ext.getCmp('oldPWD').update("<span style='font-size:16px;line-height:30px;color:red;'>*密码正确</span>");
                                        }
                                    }
                                    });
                        }
                    }

                },{
                    fieldLabel: '电话号码',
                    name: 'tel',
                    allowBlank: true
                        
                },{
                    fieldLabel: '家庭住址',
                    name: 'address',
                    allowBlank: true
                },{
                    xtype:'textareafield',
                    fieldLabel: '员工简介',
                    name: 'introduce',
                    allowBlank: true
                }, {
                fieldLabel: '员工ID',
                name: 'empImage',
                hidden:true,
                editable : false,
                //labelWidth: 100,
                allowBlank: true
                }, {
                    fieldLabel: '员工ID',
                    name: 'password',
                    hidden:true,
                    editable : false,
                    //labelWidth: 100,
                    allowBlank: true
                }]
                
            },{
                xtype: 'container',
                layout: 'vbox',
                defaultType: 'displayfield',
                margin: '0 0 5 0',

                items: [{
                    xtype: 'image',
                    id: 'imagelookId3',
                    alt:'电子照',
                    //name:"empImage",
                    src: 'resources/images/user-profile/1.png',
                    height: 160,
                    width: 140 
                }

                // , {
                //     name: 'entryDate1',
                //     //labelWidth: 100,
                //     allowBlank: true
                // }, {
                //     name: 'emp_id1',
                //     allowBlank: true
                // }, {
                //     name: 'empImage1',
                //     allowBlank: true
                // }
                ]
            }]

            },{
                xtype: 'fieldset',
                title: '其他信息',
                defaultType: 'displayfield',
                layout: 'anchor',
                defaults: {
                    anchor: '100%',
                    componentCls: ""
                },
                items: [{
                    
                    fieldLabel: '部门',
                    name: 'deptName',

                }, {
                    
                    fieldLabel: '类别',
                    name: 'jobtype',               
                    editable : false,
                    allowBlank: true
                }, {
                    //xtype:'datefield',
                    format:'Y-m-d',
                    fieldLabel: '入职日期',
                    name: 'entryDate',
                    //labelWidth: 100,
                    allowBlank: true
                },{
                   // xtype:'datefield',
                    format:'Y-m-d',
                    fieldLabel: '离职时间',
                    name: 'endDate',
                    //labelWidth: 100,
                    allowBlank: true
                },{
                  
                    fieldLabel: '职称',
                    name: 'groupName',
                    allowBlank: true
                }] 
            }

        ]
    }],
    buttons: [{
        xtype:'button',
        text: '修改',
        handler:function()  
            {  
                // if(!Ext.getCmp('addEmpPanel').getForm().isValid()) 
                //     return;  
                var record = Ext.create('Admin.model.employ.EmployModel');
                var values =Ext.getCmp('addEmpPanel').getForm().getValues();//获取form数据
                record.set(values);
                record.save();
                Ext.data.StoreManager.lookup('EmployStoreid').load();
                Ext.MessageBox.alert('修改成功');
                Ext.getCmp('addEmpPanel').getForm().reset();
                //Ext.getCmp('AddEmpWindow').close(); 
        }
    },{
        xtype:'button',
        text: '重置',
        handler:function(){  
            Ext.getCmp('addEmpPanel').getForm().reset();  
        } 
    }]

    

});