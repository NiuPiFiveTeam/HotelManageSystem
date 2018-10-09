Ext.define('Admin.view.group.GroupViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.groupViewModel',
    requires: [
        'Ext.data.Store',
        'Ext.data.proxy.Memory',
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Date',
        'Ext.data.field.Boolean',
        'Ext.data.reader.Json'
    ],
    stores: {
        groupLists: {type: 'groupStore'}
    }
});
