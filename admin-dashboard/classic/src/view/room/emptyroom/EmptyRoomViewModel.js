Ext.define('Admin.view.room.emptyroom.EmptyRoomViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.emptyRoomViewModel',

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

        emptyRoomLists: {type: 'emptyRoomStore'},
        floodList: {
            type: 'emptyRoomTreeStore',//Store reference ==Store的属性 alias: 'store.emptyRoomTreeStore',	
            autoLoad: true
        },
        guestList:{
            type: 'guestStore',//Store reference ==Store的属性 alias: 'store.guestStore',	
        }
    }
});
