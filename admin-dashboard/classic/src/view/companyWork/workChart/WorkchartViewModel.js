Ext.define('Admin.view.companyWork.workChart.WorkchartViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.workchartViewModel',

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
        workchartLists: {type: 'workempchartStore'}
    }
  
});
