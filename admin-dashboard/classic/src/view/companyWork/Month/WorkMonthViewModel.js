Ext.define('Admin.view.companyWork.Month.WorkMonthViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.workMonthViewModel',

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
        workLists: {type: 'workStore'}
    }
  
});
