﻿Ext.define('Admin.view.finance.inStorage.InStorageApplyViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.inStorageApplyViewModel',
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
    	inStorageApplyStore: {type: 'inStorageApplyStore'},
        inStorageDetailedStore:{type:'inStorageDetailedStore'}
    }
});
