Ext.define('Admin.view.Paiban.PaibanViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.paibanViewModel',

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
        paibanLists: {type: 'paibanStore'}
    }
  
});
