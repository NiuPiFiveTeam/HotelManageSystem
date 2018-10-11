Ext.define('Admin.model.room.RoomModel', {
    extend: 'Admin.model.Base',
    
    fields: [
        {
            type: 'int',
            name: 'roomId'
        },
        {
            type:'string',
            name: 'roomNo'
        },
        {
            type:'int',
            name: 'type'
        },
        {
            type: 'int',
            name: 'state' // 0是空闲，1是入住，2是需要清洁，3是需要日用品
        },
        {
            type: 'string',
            name: 'roomPass'
        }
    ]
});
