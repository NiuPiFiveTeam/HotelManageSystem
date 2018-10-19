Ext.define('Admin.view.attence.AttenceViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.attenceViewModel',
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
        //attenceLists: {type: 'attenceStore'}
    }
});
