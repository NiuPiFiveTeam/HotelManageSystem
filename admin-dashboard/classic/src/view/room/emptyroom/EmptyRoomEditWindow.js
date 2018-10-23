
Ext.define('Admin.view.room.emptyroom.EmptyRoomEditWindow', {
    extend:'Ext.window.Window',

    alias:'widget.emptyRoomEditWindow',
    id:'emptyRoomEditWindow',
    title: '房间入住登记',
   
    // draggable:false,//拖动
    resizable:false,	//变大小	
    height:350,
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
                    minValue: Ext.util.Format.date(Ext.Date.add(new Date(),Ext.Date.DAY,1),"Y-m-d"),  // limited to the current date or prior
                },{
                    xtype: 'textfield',
                    fieldLabel: '单价',
                    name:'roomPrice',
                    readOnly: true,
                }
            ]
        }
    ],buttons: [{
        text: '确认',
        handler: function(btn) {
            
            let editform = btn.up('window').down('form'); 
            
            if(editform.items.get(3).rawValue == "" || editform.items.get(3).rawValue == null ){
                alert("请选择退房时间");
                return;
            }

            let SetBookRoomNo = document.getElementById('bookRoomNo');
            let SetSelectRoomNo = document.getElementById('selectRoomNo');
            let SetCheckInTime = document.getElementById('checkInTime');
            let SetCheckOutTime = document.getElementById('checkOutTime');
            let SetRoomType = document.getElementById('roomType');
            let SetRoomPrice = document.getElementById('roomPrice');
            let SetTotalPrice = document.getElementById('totalPrice');
           
            let bookTime = new Date();
            let bookTimeString = bookTime.getFullYear().toString()+(bookTime.getMonth()+1).toString()+bookTime.getDate().toString()+bookTime.getHours().toString()+bookTime.getMinutes().toString()+bookTime.getSeconds().toString();
            SetBookRoomNo.innerText = bookTimeString;
            SetSelectRoomNo.innerText = editform.items.get(0).value+"号房";
            SetRoomType.innerText = editform.items.get(1).value;
            SetCheckInTime.innerText = editform.items.get(2).rawValue;
            SetCheckOutTime.innerText = editform.items.get(3).rawValue + " 12:00:00";

            let checkOutMonthDay = SetCheckOutTime.innerText.substring(5,10).replace("-","");//退房时间
            let checkInMonthDay = SetCheckInTime.innerText.substring(5,10).replace("-",""); //入住时间
            let checkInMonth = parseInt(checkInMonthDay.substring(0,2)); //入住月份
            let checkOutMonth = parseInt(checkOutMonthDay.substring(0,2)); //退房月份
            let checkInDay = parseInt(checkInMonthDay.substring(2,4)); //入住day
            let checkOutDay = parseInt(checkOutMonthDay.substring(2,4)); //退房day
            let nowRoomPrice = editform.items.get(4).value;

            let GuestListTable1 = document.getElementById('guestInfoTable');
            let guestLength1 = GuestListTable1.rows.length;
            while(guestLength1 > 1){
                if(guestLength1-1 > 0){
                    GuestListTable1.deleteRow(guestLength1-1);
                }
                guestLength1--;   
            }

            let CashTable1 = document.getElementById('cashInfoTable');
            let cashLength1 = CashTable1.rows.length;
            while(cashLength1 > 2){
                CashTable1.deleteRow(cashLength1-1);
                cashLength1--;   
            }
            document.getElementById('realGetPrice').innerText = 0;
            document.getElementById('backPrice').innerText = 0;

            Array.prototype.in_array = function (e) {
                var r=new RegExp(','+e+',');
                 return (r.test(',' + this.join(this.S) + ','));
            };

            var bigMonth=new Array([1,3,5,7,8,10,12]);  //大月
            var littelMonth=new Array([4,6,9,11]);  //小月
        
            let monthGap = checkOutMonth - checkInMonth; //月份差距
            let checkValidDay = 0;
            if(monthGap == 1){  //说明是下一个月才退房
               if(bigMonth.in_array(checkInMonth)){ //说明入住月份是大月
                    checkValidDay = 31 - checkInDay + checkOutDay; //入住的实际天数
               }else if(littelMonth.in_array(checkInMonth)) { //说明入住月份是小月
                    checkValidDay = 30 - checkInDay + checkOutDay; //入住的实际天数
               }else {  //说明是二月,按28算
                    checkValidDay = 28 - checkInDay + checkOutDay; //入住的实际天数
               }
            }else if(monthGap == 0){  //说明是同一个月
                checkValidDay =  checkOutDay -  checkInDay;
            }
            console.log(checkValidDay);

            SetRoomPrice.innerText = editform.items.get(4).value ;

            SetTotalPrice.innerText = -(checkValidDay * nowRoomPrice)-100;
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



