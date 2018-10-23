Ext.define('Admin.model.guest.GuestModel', {
    extend: 'Admin.model.Base',
    
    fields: [
      
        {
            type:'string',
            name: 'realName'
        },
        {
            type:'string',
            name: 'idCard'
        },
        {
            type: 'string',
            name: 'gender' // 0是空闲，1是入住，2是需要清洁，3是需要日用品
        },
        {
            type: 'string',
            name: 'phone'
        },{
            type: 'string',
            name: 'state'
        }
    ]
});
