Ext.define('Admin.view.room.inroom.InRoomViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.inRoomViewModel',

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

        roomLists: {type: 'roomStore'},
        floodList: {
            type: 'inroomTreeStore',//Store reference ==Store的属性 alias: 'store.orderStore',	
            autoLoad: true
        }
        
    }
});
