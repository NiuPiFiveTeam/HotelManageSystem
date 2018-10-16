
Ext.define('Admin.view.room.inroom.EmptyRoomEditWindow', {
    extend:'Ext.window.Window',

    alias:'widget.emptyRoomEditWindow',
    id:'emptyRoomEditWindow',
    title: '房间入住登记',
   
    // draggable:false,//拖动
    resizable:false,	//变大小	
    height: 300,
    width: 450,
    layout: 'fit',

    items:[
        {
            xtype: 'form',
            layout: 'form',
            id:'roomCheckIn',
            padding: '10px',
            items:[
                {
                    xtype: 'textfield',
                    id:'roomNo',
                    fieldLabel: '房 间 号',
                    name:'roomNo',
                    readOnly: true,
                },
                {
                    xtype: 'datefield',
                    anchor: '100%',
                    fieldLabel: '入住时间',
                    id : 'checkInDate',  
                    name: 'checkInDate',
                    format : 'Y-m-d',//日期格式  
                    value: new Date() , // defaults to today
                    minValue: new Date(),
                    // maxValue: new Date()  // limited to the current date or prior
                },{
                    xtype: 'datefield',
                    anchor: '100%',
                    emptyText:'请选择',
                    fieldLabel: '退房时间',
                    id : 'checkOutDate',  
                    format : 'Y-m-d',//日期格式  
                    name: 'checkOutDate',
                    minValue: new Date(),  // limited to the current date or prior
                }
            ]
        }
    ]
    
});



