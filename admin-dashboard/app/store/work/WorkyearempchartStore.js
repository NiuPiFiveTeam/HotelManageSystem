Ext.define('Admin.store.work.WorkyearempchartStore', {
    extend: 'Ext.data.Store',
    alias: 'store.WorkyearempchartStore',
    storeId:'WorkyearempchartStoreid',
    fields: [
         {type: 'int'   ,name: 'quarter'}
        ,{type: 'int'   ,name: 'late'}
        ,{type: 'int'   ,name: 'leaveEarly'}
        ,{type: 'int'   ,name: 'lackcard'}
        ,{type: 'int'   ,name: 'leave'}
        ,{type: 'int'   ,name: 'travel'}
    ],
    proxy: {
        type: 'ajax',
        url: '/work/workEmpChart',
        extraParams : {year: 2018},
	    reader:{
	    	type:'json'
	    }  
    },

    autoLoad: true,
    autoSync: true,
});