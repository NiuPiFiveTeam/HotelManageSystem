Ext.define('Admin.store.room.DailyStore', {
    extend:'Ext.data.Store',
    alias: 'store.dailyStore',

    fields: ['id','show','number','name'],
    
    autoLoad:true  //这个话不能注释掉
});
