Ext.define('Admin.view.calendar.Daysweek', {
    extend: 'Ext.panel.Panel',
    xtype: 'calendar-panel-Daysweek',
    requires: [
        'Ext.calendar.panel.Panel',
        'Ext.calendar.panel.Days',
        'Ext.calendar.List'
    ],
    
    height:800,
    layout: 'fit',
    items: [{
        xtype: 'calendar',
        views: {
            day:{
                startTime: 0,
                endTime: 24,
                timezoneOffset: -480,
                listeners: {
                    eventadd: function(view, context) {
                    console.log('Event ' + context.event.data.calendarId+ ' was added');
                    var id = ' ';
                    var title = context.event.data.title;
                    var allDay = context.event.data.allDay;
                    var startDate = context.event.data.startDate;
                    var endDate = context.event.data.endDate;
                    var calendarId = context.event.data.calendarId;
                    var description = context.event.data.description;
                    var empName = context.event.data.empName;
                    var empNo = context.event.data.empNo;
                    Ext.Ajax.request({
                        url: '/CalendarEvent/add',
                        method: 'post',

                        params:{
                            id : id,
                            title : title,
                            allDay : allDay,
                            startDate : startDate,
                            endDate : endDate,
                            calendarId : calendarId,
                            description : description,
                            empName : empName,
                            empNo : empNo
                        },

                        success:function(){
                            var json = Ext.util.JSON.decode(response.responseText);
                            if(json.success){
                                Ext.Msg.alert('操作成功', json.msg);
                            }else{
                                 Ext.Msg.alert('操作失败', json.msg);
                            }
                        }

                    });
                    },
                    
                    eventedit:function(view, context) {//更新无法监听?
                     console.log('Event ' + context.event.data.calendarId+ ' was updated');
                    var id = context.event.data.id;
                    var title = context.event.data.title;
                    var allDay = context.event.data.allDay;
                    var startDate = context.event.data.startDate;
                    var endDate = context.event.data.endDate;
                    var calendarId = context.event.data.calendarId;
                    var description = context.event.data.description;
                    var empName = context.event.data.empName;
                    var empNo = context.event.data.empNo;
                    Ext.Ajax.request({
                        url: '/CalendarEvent/edit',
                        method: 'post',
                        params:{
                            id : id,
                            title : title,
                            allDay : allDay,
                            startDate : startDate,
                            endDate : endDate,
                            calendarId : calendarId,
                            description : description,
                            empName : empName,
                            empNo : empNo
                        },

                        success:function(){
                            var json = Ext.util.JSON.decode(response.responseText);
                            if(json.success){
                                Ext.Msg.alert('操作成功', json.msg);
                            }else{
                                 Ext.Msg.alert('操作失败', json.msg);
                            }
                        }

                    });
                    },
                    eventdrop: function(view, context) {
                    console.log("Event "+context.event.data.id + ' was delete');
                    var id = context.event.data.id;
                    Ext.Ajax.request({
                        url: 'CalendarEvent/delete',
                        method : 'post',
                        params : { 
                            //ids[] :selectIds
                            id :id
                        },
                        success:function(){
                            var json = Ext.util.JSON.decode(response.responseText);
                            if(json.success){
                                Ext.Msg.alert('操作成功', json.msg);
                            }else{
                                 Ext.Msg.alert('操作失败', json.msg);
                            }
                        }

                    });
                    }
                }
            },
            week:{
                startTime: 0,
                endTime: 24,
                timezoneOffset: -480,
                listeners: {
                    eventadd: function(view, context) {
                    console.log('Event ' + context.event.data.calendarId+ ' was added');
                    var id = ' ';
                    var title = context.event.data.title;
                    var allDay = context.event.data.allDay;
                    var startDate = context.event.data.startDate;
                    var endDate = context.event.data.endDate;
                    var calendarId = context.event.data.calendarId;
                    var description = context.event.data.description;
                    var empName = context.event.data.empName;
                    var empNo = context.event.data.empNo;
                    Ext.Ajax.request({
                        url: '/CalendarEvent/add',
                        method: 'post',
                        params:{
                            id : id,
                            title : title,
                            allDay : allDay,
                            startDate : startDate,
                            endDate : endDate,
                            calendarId : calendarId,
                            description : description,
                            empName : empName,
                            empNo : empNo
                        },

                        success:function(){
                            var json = Ext.util.JSON.decode(response.responseText);
                            if(json.success){
                                Ext.Msg.alert('操作成功', json.msg);
                            }else{
                                 Ext.Msg.alert('操作失败', json.msg);
                            }
                        }

                    });
                    },
                    
                    eventedit:function(view, context) {//更新无法监听?
                    console.log('Event ' + context.event.data.calendarId+ ' was updated');
                    var id = context.event.data.id;
                    var title = context.event.data.title;
                    var allDay = context.event.data.allDay;
                    var startDate = context.event.data.startDate;
                    var endDate = context.event.data.endDate;
                    var calendarId = context.event.data.calendarId;
                    var description = context.event.data.description;
                    var empName = context.event.data.empName;
                    var empNo = context.event.data.empNo;
                    Ext.Ajax.request({
                        url: '/CalendarEvent/edit',
                        method: 'post',

                        params:{
                            id : id,
                            title : title,
                            allDay : allDay,
                            startDate : startDate,
                            endDate : endDate,
                            calendarId : calendarId,
                            description : description,
                            empName : empName,
                            empNo : empNo
                        },

                        success:function(){
                            var json = Ext.util.JSON.decode(response.responseText);
                            if(json.success){
                                Ext.Msg.alert('操作成功', json.msg);
                            }else{
                                 Ext.Msg.alert('操作失败', json.msg);
                            }
                        }

                    });
                    },
                    eventdrop: function(view, context) {
                    console.log("Event "+context.event.data.id + ' was delete');
                    var id = context.event.data.id;
                    Ext.Ajax.request({
                        url: 'CalendarEvent/delete',
                        method : 'post',
                        params : { 
                            //ids[] :selectIds
                            id :id
                        },
                        success:function(){
                            var json = Ext.util.JSON.decode(response.responseText);
                            if(json.success){
                                Ext.Msg.alert('操作成功', json.msg);
                            }else{
                                 Ext.Msg.alert('操作失败', json.msg);
                            }
                        }

                    });
                    }
                }
            },

            month:{
                timezoneOffset:-480,
                listeners: {
                    eventadd: function(view, context) {
                    console.log('Event ' + context.event.data.calendarId+ ' was added');
                    var id = ' ';
                    var title = context.event.data.title;
                    var allDay = context.event.data.allDay;
                    var startDate = context.event.data.startDate;
                    var endDate = context.event.data.endDate;
                    var calendarId = context.event.data.calendarId;
                    var description = context.event.data.description;
                    var empName = context.event.data.empName;
                    var empNo = context.event.data.empNo;
                    Ext.Ajax.request({
                        url: '/CalendarEvent/add',
                        method: 'post',
                        params:{
                            id : id,
                            title : title,
                            allDay : allDay,
                            startDate : startDate,
                            endDate : endDate,
                            calendarId : calendarId,
                            description : description,
                            empName : empName,
                            empNo : empNo
                        },

                        success:function(){
                            var json = Ext.util.JSON.decode(response.responseText);
                            if(json.success){
                                Ext.Msg.alert('操作成功', json.msg);
                            }else{
                                 Ext.Msg.alert('操作失败', json.msg);
                            }
                        }

                    });
                    },
                    
                    eventedit:function(view, context) {//更新无法监听?
                     console.log('Event ' + context.event.data.calendarId+ ' was updated');
                    var id = context.event.data.id;
                    var title = context.event.data.title;
                    var allDay = context.event.data.allDay;
                    var startDate = context.event.data.startDate;
                    var endDate = context.event.data.endDate;
                    var calendarId = context.event.data.calendarId;
                    var description = context.event.data.description;
                    var empName = context.event.data.empName;
                    var empNo = context.event.data.empNo;
                    Ext.Ajax.request({
                        url: '/CalendarEvent/edit',
                        method: 'post',
                        params:{
                            id : id,
                            title : title,
                            allDay : allDay,
                            startDate : startDate,
                            endDate : endDate,
                            calendarId : calendarId,
                            description : description,
                            empName : empName,
                            empNo : empNo
                        },

                        success:function(){
                            var json = Ext.util.JSON.decode(response.responseText);
                            if(json.success){
                                Ext.Msg.alert('操作成功', json.msg);
                            }else{
                                 Ext.Msg.alert('操作失败', json.msg);
                            }
                        }

                    });
                    },
                    eventdrop: function(view, context) {
                    console.log("Event "+context.event.data.id + ' was delete');
                    var id = context.event.data.id;
                    Ext.Ajax.request({
                        url: 'CalendarEvent/delete',
                        method : 'post',
                        params : { 
                            //ids[] :selectIds
                            id :id
                        },
                        success:function(){
                            var json = Ext.util.JSON.decode(response.responseText);
                            if(json.success){
                                Ext.Msg.alert('操作成功', json.msg);
                            }else{
                                 Ext.Msg.alert('操作失败', json.msg);
                            }
                        }

                    });
                    }
                }
            }
        },
        timezoneOffset: -480,
   
        store: {
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'calendar/findCalendars',
                reader: {
                        type: 'json',
                        rootProperty: 'lists'
                }

            },
            eventStoreDefaults: {
                    proxy: {
                        type: 'ajax',
                        url:'CalendarEvent/findEvents',
                        reader: {
                            type: 'json',
                            rootProperty: 'lists'
                        }
                    }
            }
        }
        
    }]
});