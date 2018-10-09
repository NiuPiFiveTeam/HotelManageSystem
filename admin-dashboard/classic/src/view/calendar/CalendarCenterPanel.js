Ext.define('Admin.view.calendar.CalendarCenterPanel', {
    extend: 'Ext.container.Container',
    xtype: 'calendarCenterPanel',
    controller: 'calendarViewController',
    viewModel: {type: 'calendarViewModel'},
    layout: 'fit',
    items: [{xtype:'calendarGridPanel'}]
});
