
Ext.define('Admin.view.room.inroom.EmptyRoomEditWindow', {
    extend:'Ext.window.Window',

    alias:'widget.emptyRoomEditWindow',
    id:'emptyRoomEditWindow',
    title: '房间入住登记',
   
    // draggable:false,//拖动
    resizable:false,	//变大小	
    height: 300,
    width: 550,
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
                    xtype: 'textfield',
                    fieldLabel: '房间类型',
                    name:'roomType',
                    readOnly: true,
                },
                {
                    xtype: 'datefield',
                    anchor: '100%',
                    fieldLabel: '入住时间',
                    id : 'checkInDate',  
                    name: 'checkInDate',
                    format : 'Y-m-d H:i:s',//日期格式  
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
    ],buttons: [{
        text: '确认',
        handler: function(btn) {
            
            let editform = btn.up('window').down('form'); 
            
            let SetSelectRoomNo = document.getElementById('selectRoomNo');
            let SetCheckInTime = document.getElementById('checkInTime');
            let SetCheckOutTime = document.getElementById('checkOutTime');
            let SetRoomType = document.getElementById('roomType');
            SetSelectRoomNo.innerText = editform.items.get(0).value+"号房";
            SetRoomType.innerText = editform.items.get(1).value;
            SetCheckInTime.innerText = editform.items.get(2).rawValue;
            SetCheckOutTime.innerText = editform.items.get(3).rawValue + " 12:00:00";
           
            let erPanel = Ext.getCmp('emptyRoomPanel');
            
             //collapsible: true,  //是否可折叠
            // collapsed: true,
            let showPanel = erPanel.items.get(3);
            let hiddenPanel = erPanel.items.get(2);
            hiddenPanel.setHidden(true);
            showPanel.setHidden(false);
            btn.up('window').destroy();
            
        }
           
        
    }]
    
});



