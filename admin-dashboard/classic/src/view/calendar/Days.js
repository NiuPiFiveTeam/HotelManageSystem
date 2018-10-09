Ext.define('Admin.view.calendar.Days', {
    extend: 'Ext.panel.Panel',
    xtype: 'calendar-days-view',

    requires: [
        'Ext.calendar.panel.Week',
        'Ext.calendar.List'
    ],
    viewModel: {
        data: {
            value: new Date()
        },
        stores: {
            calStore: {
                type: 'calendar-calendars',
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
        }
    },

   
    items: [{
        //region: 'west',
        title: 'Calendars',
        ui: 'light',
        width: 150,
        bodyPadding: 5,
        collapsible: true,
        items: {
            xtype: 'calendar-list',
            bind: '{calStore}'
        }
    }, {
        //region: 'center',
        xtype: 'calendar-week',
        height: 700,
        startTime: 0,
        endTime: 24,
        timezoneOffset: 0,
        gestureNavigation: false,
        bind: {
            value: '{value}',
            store: '{calStore}'
        },
        listeners: {
           eventadd: function(view, context) {
                    console.log('Event ' + context.event.data.title+ ' was added');
                    //Ext.Ajax.request({url: '/add'});
            },
            eventedit:function(view, context) {//更新无法监听?
                     console.log('Event ' + context.event.data.id+ ' was updated');
            },
            eventdrop: function(view, context) {
                console.log("Event "+context.event.data.id + ' was delete');
                //Ext.Ajax.request({url: '/delete'});
            }
        }
    }]
});

