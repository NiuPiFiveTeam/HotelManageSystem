Ext.define('Admin.view.work.WorkViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workViewController',

    OnclickAttence:function(btn){
    	Ext.Ajax.request({
            url: 'work/add',
            method: 'post',
            success: function(response, options) {
                var json = Ext.util.JSON.decode(response.responseText);
                if(json.success){
                    var store = Ext.data.StoreManager.lookup('workStoreId');
                    store.reload();
                    Ext.Msg.alert('打卡成功', json.msg);
                }else{
                    Ext.Msg.alert('打卡失败', json.msg);
                }
            }
        });
    }





});
