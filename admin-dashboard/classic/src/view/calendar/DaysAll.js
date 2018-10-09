// Ext.define('Admin.view.calendar.DaysAll', {
//     extend: 'Ext.panel.Panel',
//     xtype: 'calendar-panel-DaysAll',

//     requires: [
//         'Ext.calendar.panel.Panel',
//         'Ext.calendar.panel.Days',
//         'Ext.calendar.List',
//         'Ext.layout.container.Border'
//     ],
//     viewModel: {
//         data: {
//             value: new Date()
//         },
//         stores: {
//             calStore: {
//                 type: 'calendar-calendars',
//                 autoLoad: true,
//                 proxy: {
//                     type: 'ajax',
//                     url: 'calendar/findCalendars',
//                     reader: {
//                         type: 'json',
//                         rootProperty: 'lists'
//                     }
//                 },
//                 eventStoreDefaults: {
//                     proxy: {
//                         type: 'ajax',
//                         url:'calendar/findEvents',
//                         reader: {
//                             type: 'json',
//                             rootProperty: 'lists'
//                         }
//                     }
//                 }
//             }
//         }
//     },    
//     width: 1200,
//     height: 600,

//     layout: 'fit',
//     items: [{
//         xtype: 'calendar',
//         views: {
 
//         },
//         timezoneOffset: 0,
//         store: {
//             autoLoad: true,
//             proxy: {
//                 type: 'ajax',
//                 url: '/KitchenSink/CalendarFull'
//             }
//         }
//     }]
// });