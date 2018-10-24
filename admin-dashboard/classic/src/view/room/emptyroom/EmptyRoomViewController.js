Ext.define('Admin.view.room.emptyroom.EmptyRoomViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.emptyRoomViewController',
	
    loadEmptyHomeItem:function(node,event){
            var id = event.data.id; //节点
            console.log(event.data);
            if(id>1000000){//说明是楼层Id，进行加载客房的操作
                loadAllEmptyRoom(id);
            }else{  //说明是客房Id，需要进行客房相关操作
                // loadAllRoom(event.data.parentId);
                removeEmptyBorder();
                addEmptyBorder(id);
            }   
    },

});


/** 给Room添加边框，显示选中状态 */
function addEmptyBorder(roomId){
    var div = document.getElementById(roomId); //得到room的DIV
    div.setAttribute('style','cursor:pointer;width:50px;height:70px;margin-left:15px;margin-top:5px;float:left;border:1px dashed #35baf6;');
    //style="cursor:pointer;width:50px;height:70px;margin-left:15px;margin-top:10px;float:left;border:1px dashed white;"
    // div.style.border="1px dashed blue";
}

/** 给Room移除边框，显示未选中状态 */
function removeEmptyBorder(){
    var div = document.getElementsByClassName("dataview-multisort-item"); //得到room的DIV
    for (let index = 0; index < div.length; index++) {
        div[index].setAttribute('style','cursor:pointer;width:50px;height:70px;margin-left:15px;margin-top:5px;float:left;border:1px dashed white;');
    }
}

/** 加载出全部客房 */
function loadAllEmptyRoom(id){
    var proxy = {
        type: 'ajax',
        url: 'room/findRoom?floorId='+id+"&type=empty",	//后台Controller中的接口url地址
        reader: {
            type:'json'
        }
    };
    var store = Ext.create('Admin.store.room.EmptyRoomStore');
    store.setProxy(proxy);
    store.load();

    var room = Ext.getCmp('emptyRoomdataview');
    console.log(room);
    room.setStore(store);
    room.store.load();
}

function changeColor(type,currentRows) {
    if(type=="return"){
        document.getElementById('returnIcon').src="classic/resources/images/returnblue.png";
    }else if(type=="delete"){
        document.getElementById('deleteGuest'+currentRows).src="classic/resources/images/deleteblue.png";
    }
}


function changeblackColor(type,currentRows) {
    console.log(123223);
    if(type=="return"){
        document.getElementById('returnIcon').src="classic/resources/images/return.png";
    }else if(type=="delete"){
        document.getElementById('deleteGuest'+currentRows).src="classic/resources/images/deleteGuest.png";
    }
}

function deleteGuest(currentRows){
    let table = document.getElementById("guestInfoTable");
    let tr = document.getElementsByClassName('guest'+currentRows)[0];
    console.log(tr);
    table.deleteRow(tr.rowIndex);
}

function addTableItems(data){
    // 原来的行数    比如：此处获得表格的行数是5，则每一行对应的index是0~4，所以下面在insertRow时，使用的是表格的当前行数
    for (let index = 0; index < data.length; index++) {

        let currentRows = document.getElementById("guestInfoTable").rows.length; 
        let roomType = document.getElementById('roomType');
        if(roomType.innerText == "单人房"){
            if(currentRows> 1){
                 Ext.MessageBox.alert('错误提示','单人房最多入住一人!');
                return;
            }
        }else if(roomType.innerText == "双人房"){
            if(currentRows > 2){
                 Ext.MessageBox.alert('错误提示','双人房最多入住两人!');
                return;
            }
        }else if(roomType.innerText == "三人房"){
            if(currentRows > 3){
                 Ext.MessageBox.alert('错误提示','三人房最多入住三人!');
                return;
            }
        }else if(roomType.innerText == "钟点房"){
            if(currentRows > 2){
                Ext.MessageBox.alert('错误提示','钟点房最多入住两人!');
                return;
            }
        }
        let length = document.getElementById("guestInfoTable").rows.length;
        while(length > 1){
            let thisId = data[index].idCard;
            let frontId = document.getElementById("guestInfoTable").rows[length-1].cells[1].innerText;
            console.log(thisId);console.log(frontId);
           console.log(thisId.trim() == frontId.trim());
            if(thisId.trim() == frontId.trim()){
                Ext.MessageBox.alert('错误提示','该客人信息已选择！请选择另外的客人信息!');
                return;
            }
            length--;
        }
        let insertTr = document.getElementById("guestInfoTable").insertRow(currentRows);
        insertTr.setAttribute('class',"guest"+currentRows);
        let insertTd = insertTr.insertCell(0);
        insertTd.style="height: 30px;width: 120px;border-top: 1px solid #E3E6EA;";
        insertTd.innerHTML = '<div style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">'+data[index].realName+'</div>';
            
        insertTd = insertTr.insertCell(1);
        insertTd.style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;";
        insertTd.innerHTML = '<div style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">'+data[index].idCard+'</div>';
            
        insertTd = insertTr.insertCell(2);
        insertTd.style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;";
        insertTd.innerHTML ='<div  style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">'+data[index].gender+'</div>';
            
        insertTd = insertTr.insertCell(3);
        insertTd.style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;";
        insertTd.innerHTML = '<div  style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">'+data[index].phone+'</div>';

        insertTd = insertTr.insertCell(4);
        insertTd.style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;"
        insertTd.innerHTML = '<div style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">'+data[index].state+'</div>';

        insertTd = insertTr.insertCell(5);
        insertTd.style="border-left: 1px solid #E3E6EA;border-right: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;"
        insertTd.innerHTML = '<img id="deleteGuest'+currentRows+'" title="删除" style="width:20px;height:20px;margin-left: 12px;margin-top: 3px; cursor:pointer" onclick="deleteGuest('+currentRows+')" onmousemove="changeColor(\'delete\','+currentRows+')" onmouseout="changeblackColor(\'delete\','+currentRows+')" src="classic/resources/images/deleteGuest.png" />';

        let emptyRoomPanel = Ext.getCmp('emptyRoomPanel');
        let oldHeight = emptyRoomPanel.height;
        emptyRoomPanel.setHeight(oldHeight+50);
        
    }
}

function addCashTableItems(data){
    let realGetPrice = document.getElementById('realGetPrice');
    let getPirce = 0;
    let backPrice = document.getElementById('backPrice');
    let totalPrice = document.getElementById('totalPrice');
    wc:for (let index = 0; index < data.length; index=index+2) {

        let cashTable = document.getElementById("cashInfoTable");
        let currentRows = cashTable.rows.length;  //当前表格的行数
        let forEachRows = cashTable.rows.length; 
        
        
        // 原来的行数    比如：此处获得表格的行数是5，则每一行对应的index是0~4，所以下面在insertRow时，使用的是表格的当前行数
        
        while(forEachRows > 2){
            let thisCashType = data[index];
            let frontCashType = cashTable.rows[forEachRows-1].cells[1].innerText;
            console.log(thisCashType);console.log(frontCashType);
            if(thisCashType == frontCashType){
                cashTable.rows[forEachRows-1].cells[2].innerText=data[index+1];
                getPirce += parseInt(data[index+1]);
                continue wc;
            }
            forEachRows--;
        }
            let insertTr = cashTable.insertRow(currentRows);
            let insertTd = insertTr.insertCell(0);
            insertTd.style="height:30px;border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;";
            insertTd.innerHTML = '<input type="checkbox"></input>';
                
            insertTd = insertTr.insertCell(1);
            insertTd.style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;padding-left:15px;";
            insertTd.innerHTML = data[index];
                
            insertTd = insertTr.insertCell(2);
            insertTd.style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;padding-left:15px;";
            insertTd.innerHTML = data[index+1];
                
            insertTd = insertTr.insertCell(3);
            insertTd.style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;padding-left:15px;";
            insertTd.innerHTML = new Date().toLocaleString().replace(/\//g,"-");

            insertTd = insertTr.insertCell(4);
            insertTd.style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;border-right: 1px solid #E3E6EA;padding-left:15px;";
            let empName = Ext.getCmp('loginUserName');
            insertTd.innerHTML = empName.html;

            let emptyRoomPanel = Ext.getCmp('emptyRoomPanel');
            let oldHeight = emptyRoomPanel.height;
            emptyRoomPanel.setHeight(oldHeight+50);
            getPirce += parseInt(data[index+1]);
            
    }      
    realGetPrice.innerText = getPirce;
    backPrice.innerText = getPirce + parseInt(totalPrice.innerText);
    Ext.getCmp('loadAccountWindow').destroy();
}

/**
 * 入账
 */
function enterAccount(){
    let GuestListTable = document.getElementById('guestInfoTable');
    let guestLength = GuestListTable.rows.length;
    let guestList = new Array();
    if(guestLength == 1){
        //说明只有表头，并没有选择用户，需要提示
        Ext.MessageBox.alert('错误提示','请选择入住人信息');
        return;
    }
    while(guestLength > 1){
        if(guestLength-1 > 0){
            let idcard = GuestListTable.rows[guestLength-1].cells[1].innerText;
            guestList.push(idcard.trim());  
        }
        guestLength--;   
    }


    let CashTable = document.getElementById('cashInfoTable');
    if(CashTable.rows.length == 2){
        Ext.MessageBox.alert('错误提示','请添加收入类型！');
        return;
    }
    let roomNo = document.getElementById('selectRoomNo').innerText;
    let bookRoomNo = document.getElementById('bookRoomNo').innerText;
    let selectRoomNo = (document.getElementById('selectRoomNo').innerText).substring(0,3);
    let roomType = document.getElementById('roomType').innerText;
    let booksource = document.getElementById('bookSource').innerText;
    let roomPrice = document.getElementById('roomPrice').innerText;
    let checkInTime = document.getElementById('checkInTime').innerText;
    let checkOutTime = document.getElementById('checkOutTime').innerText;
    let bookGuest = document.getElementById('bookGuest').innerText;  //预定人
    let bookPhone = document.getElementById('bookPhone').innerText;  //预订电话
    let remark = document.getElementById('remark').innerText;
    let backPirce = document.getElementById('backPrice').innerText;
    let totalMoney = document.getElementById('totalPrice').innerText;
    let realGetPrice = document.getElementById('realGetPrice').innerText;
    console.log(backPirce);
    if(parseInt(backPirce) < 0){
        Ext.MessageBox.alert('错误提示','请重新核对输入金额是否正确！');
        return;
    }
    var dataArray = {
        'bookRoomNo':bookRoomNo,
        'roomType':roomType,
        'booksource':booksource,
        'roomPrice':roomPrice,
        'checkInTime':checkInTime,
        'checkOutTime':checkOutTime,
        'bookGuest':bookGuest,
        'bookPhone':bookPhone,
        'remark':remark,
        'totalMoney':totalMoney,
        'realGetPrice':realGetPrice,
        'roomNo':roomNo.substring(0,3).trim()
    };

    console.log(dataArray);
    Ext.Ajax.request({			
        url : '/roomOrder/save',
        //从数据库中请求数据，动态获取items中的数据			
        params : {
            'dataArray':dataArray,
        },  
        method : 'Get',			
        success : function(result) {
            Ext.Ajax.request({			
                url : '/room/changeEmptyToCheckIn',
                //从数据库中请求数据，动态获取items中的数据			
                params : {
                    'selectRoomNo':selectRoomNo,
                    'guestList':guestList
                },  
                method : 'Get',			
                success : function(success) {
                    // var inroomTreepanel = Ext.StoreManager.lookup('inroomTree');
                    // inroomTreepanel.load();
                    var resultArray = Ext.decode(success.responseText); //得到我们需要的数组
                    Ext.MessageBox.alert('成功提示',resultArray['msg']);
                    let erPanel = Ext.getCmp('emptyRoomPanel');
                    //collapsible: true,  //是否可折叠
                   // collapsed: true,
                   let showPanel = erPanel.items.get(3);
                   let hiddenPanel = erPanel.items.get(2);
                   hiddenPanel.setHidden(false);
                   showPanel.setHidden(true);

                  
                   var emptyTree = Ext.getCmp('emptyTreePanel');
                   emptyTree.getStore().load();
                   var emptyRoom = Ext.getCmp('emptyRoomdataview');
                   emptyRoom.getStore().load();
                   document.location.href = '#inRoom';
                   var inroomTree = Ext.getCmp('inroomTreepanel');
                   inroomTree.getStore().load();
                }
            });
        }
    });
    
}

function loadEmptyTree(){
    var emptyRoomTree = Ext.StoreManager.lookup('emptyRoomTree');
    console.log(emptyRoomTree);
}