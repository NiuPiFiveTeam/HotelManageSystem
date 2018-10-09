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
                password: btn.up("form").getForm().findField("password").getValue()
            },
            success: function(response, options) {
                var json = Ext.util.JSON.decode(response.responseText);
                if(json.success){
                    me.redirectTo('dashboard', true);
                    Ext.getCmp('loginUserName').setText(json.map.userName);
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
        if(newPWD != newPWD2){
            Ext.getCmp('newPWD').update("<span style='font-size:16px;line-height:30px;color:red;'>*两次输入的密码不一致</span>");
             Ext.getCmp('newPWD2').update("<span style='font-size:16px;line-height:30px;color:red;'>*两次输入的密码不一致</span>");
            //Ext.Msg.alert('','两次输入的密码不一致');
        }else{
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
        }
    }
});