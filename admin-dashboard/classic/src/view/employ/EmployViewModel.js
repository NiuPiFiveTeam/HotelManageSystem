Ext.define('Admin.view.employ.EmployViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.employViewModel',

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
        //empDepLists: {type: 'deptStore'},
        empLists: {type: 'employStore'}
    }
  
});
