Ext.define('Admin.view.authentication.Login', {
    extend: 'Admin.view.authentication.LockingWindow',
    xtype: 'login',

    requires: [
        'Admin.view.authentication.Dialog',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],

    title: 'Let\'s Log In',
    defaultFocus: 'authdialog', // Focus the Auth Form to force field focus as well

    items: [
        {
            xtype: 'authdialog',
            defaultButton : 'loginButton',
            autoComplete: true,
            bodyPadding: '20 20',
            cls: 'auth-dialog-login',
            header: false,
            width: 415,
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
                    text: 'Sign into your account'
                },
               
                { xtype : 'combobox',allowBlank:false, name: 'logintype',
                    store : new Ext.data.ArrayStore({
                    fields : ['id', 'logintype'],
                    data : [["1", '管理员'], ["2", '员工']]
                    }),
              
                valueField : 'logintype',
                displayField: 'logintype',
                forceSelection:true,                
                editable : false,
                emptyText: '登入方式'
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    name: 'userid',
                    bind: '{userid}',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    emptyText: 'user id',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-email-trigger'
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    height: 55,
                    hideLabel: true,
                    emptyText: 'Password',
                    inputType: 'password',
                    name: 'password',
                    bind: '{password}',
                    allowBlank : false,
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-password-trigger'
                        }
                    }
                },
                
                {
                    xtype: 'button',
                    reference: 'loginButton',
                    scale: 'large',
                    ui: 'soft-green',
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-angle-right',
                    text: 'Login',
                    formBind: true,
                    listeners: {
                        click: 'onLoginButton'
                    }
                }
                //,
                // {
                //     xtype: 'box',
                //     html: '<div class="outer-div"><div class="seperator">OR</div></div>',
                //     margin: '10 0'
                // },
                // {
                //     xtype: 'button',
                //     scale: 'large',
                //     ui: 'facebook',
                //     iconAlign: 'right',
                //     iconCls: 'x-fa fa-facebook',
                //     text: 'Login with Facebook',
                //     listeners: {
                //         click: 'onFaceBookLogin'
                //     }
                // },
                // {
                //     xtype: 'box',
                //     html: '<div class="outer-div"><div class="seperator">OR</div></div>',
                //     margin: '10 0'
                // },
                // {
                //     xtype: 'button',
                //     scale: 'large',
                //     ui: 'gray',
                //     iconAlign: 'right',
                //     iconCls: 'x-fa fa-user-plus',
                //     text: 'Create Account',
                //     listeners: {
                //         click: 'onNewAccount'
                //     }
                // }
            ]
        }
    ],

    initComponent: function() {
        this.addCls('user-login-register-container');
        this.callParent(arguments);
    }
});
