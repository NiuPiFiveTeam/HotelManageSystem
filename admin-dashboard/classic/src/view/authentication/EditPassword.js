Ext.define('Admin.view.authentication.EditPassword', {
    extend: 'Ext.form.Panel',
    xtype: 'editPassword',

    requires: [
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.button.Button',
        'Ext.layout.container.VBox'
    ],
    controller: 'authentication',
    title: '修改密码',
    defaultFocus: 'authdialog', // Focus the Auth Form to force field focus as well
    layout: {
        type: 'vbox',
        align: 'center'
        //pack: 'center'
    },
    items: [
        {
            xtype: 'form',
            defaultButton : 'loginButton',
            defaultType: 'textfield',
            autoComplete: true,
            bodyPadding: '20 20',
            cls: 'auth-dialog-login',
            header: false,
            //width: 600,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            defaults : {
                margin : '5 0'
            },

            items: [
                {
                    xtype: 'label',
                    text: 'Sign into your massage'
                }, 
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            cls: 'auth-textbox',
                            fieldLabel: '旧密码',
                            //id: 'oldPWD',
                            height: 40,
                            id: 'oldpassword',
                            //hideLabel: true,
                            emptyText: 'Password',
                            inputType: 'password',
                            name: 'oldpassword',
                            //bind: '{password}',
                            allowBlank : false,
                            triggers: {
                                glyphed: {
                                    cls: 'trigger-glyph-noop auth-password-trigger'
                                }
                            },
                            listeners: {
                                blur: function(){
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
                                        }
                                    }
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'box',
                            id:'oldPWD',
                            html:''
                        }
                    ]
                    
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            cls: 'auth-textbox',
                            fieldLabel: '新的密码',
                            id: 'newCheckPWD',
                            height: 40,
                            //hideLabel: true,
                            emptyText: 'Password',
                            inputType: 'password',
                            name: 'newpassword',
                            //bind: '{password}',
                            allowBlank : false,
                            triggers: {
                                glyphed: {
                                    cls: 'trigger-glyph-noop auth-password-trigger'
                                }
                            }
                        },
                        {
                            xtype: 'box',
                            id:'newPWD',
                            html:'' 
                        }

                    ]
                    
                },
                {
                    xtype: 'container',
                    layout:'hbox',
                    items:[
                        {
                            xtype: 'textfield',
                            cls: 'auth-textbox',
                            fieldLabel: '请确认密码',
                            id: 'newCheckPWD2',
                            height: 40,
                            //hideLabel: true,
                            emptyText: 'Password',
                            inputType: 'password',
                            name: 'newpassword2',
                            //bind: '{password}',
                            allowBlank : false,
                            triggers: {
                                glyphed: {
                                    cls: 'trigger-glyph-noop auth-password-trigger'
                                }
                            },
                            listeners: {
                                blur: function(){
                                    var newPWD = Ext.getCmp('newCheckPWD').getValue();
                                    var newPWD2 = Ext.getCmp('newCheckPWD2').getValue();
                                    if(newPWD != newPWD2){
                                        Ext.getCmp('newPWD').update("<span style='font-size:16px;line-height:30px;color:red;'>*两次输入的密码不一致</span>");
                                         Ext.getCmp('newPWD2').update("<span style='font-size:16px;line-height:30px;color:red;'>*两次输入的密码不一致</span>");
                                        //Ext.Msg.alert('','两次输入的密码不一致');
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'box',
                            id:'newPWD2',
                            html:''
                        }

                    ]

                    
                },
                {
                    xtype: 'button',
                    reference: 'loginButton',
                    scale: 'large',
                    ui: 'soft-green',
                    width:300,
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-angle-right',
                    text: '确认修改',
                    //formBind: true,
                    listeners: {
                        click: 'onEditPWDButton'
                    }
                }

            ]
        }
    ]
});
