Ext.define('Admin.view.attence.AttenceViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.attenceViewController',

    beginHandler:function(p) {  
		p.getEl().on('click', function(p){ 
        // var date = new Date();
        // var format = 'Y-m-d H:i:s';                                          
        // var currentdateTime = Ext.Date.format(date, format);

        Ext.Ajax.request({
            url: 'work/add',
            method: 'post',
            // params: {
            //     currentdateTime: currentdateTime
            // },
            success: function(response, options) {
                var json = Ext.util.JSON.decode(response.responseText);
                if(json.success){
                    me.redirectTo('empManager', true);
                    Ext.getCmp('loginUserName').setText(json.map.userName);
                }else{
                    Ext.Msg.alert('登录失败', json.msg);
                }
            }
        });


        Ext.Msg.alert('上班',currentdateTime);
        });                                                                        
    },
    endWorkHandler:function(p) {  
		p.getEl().on('click', function(p){ 
        var date = new Date();
        var format = 'Y-m-d H:i:s';                                          
        var currentTime = Ext.Date.format(date, format);
        Ext.Ajax.request({
            url: 'work/update',
            method: 'post',
            params: {
                currentdateTime: currentdateTime
            },
            success: function(response, options) {
                var json = Ext.util.JSON.decode(response.responseText);
                if(json.success){
                    me.redirectTo('empManager', true);
                    Ext.getCmp('loginUserName').setText(json.map.userName);
                }else{
                    Ext.Msg.alert('登录失败', json.msg);
                }
            }
        });
        Ext.Msg.alert('上班',currentTime);
        });                                                                        
    }
    
// var currentDate = Ext.Date.format(date, 'Y-m-d');
//                                           var inputbegin1 = currentDate + ' ' + '06:00:00';
//                                           var inputend1 = currentDate + ' ' + '09:00:00';

//                                           var inputbegin1 = currentDate + ' ' + '20:00:00';
//                                           var inputend1 = currentDate + ' ' + '21:00:00';
//                                           var inputbegin2 = currentDate + ' ' + '18:00:00';
                                          
//                                           var begin1 = Ext.Date.parse(inputbegin1, format, true);
//                                           var end1 = Ext.Date.parse(inputend1, format, true);

//                                           var begindate1 = Ext.Date.format(begin1, format);
//                                           var enddate1 = Ext.Date.format(begin1, format);
});