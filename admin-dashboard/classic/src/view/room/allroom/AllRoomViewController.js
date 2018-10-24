Ext.define('Admin.view.room.allroom.AllRoomViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.allRoomViewController',
	
    loadTotalStatus:function(){
        alert(123);
        Ext.Ajax.request({     
            url : '/room/findAllRoom',
            method : 'Get',     
            success : function(result) {
              let mapArray = Ext.decode(result.responseText);
              console.log(mapArray['map']);
              let roomNumber = mapArray['map']['roomNumber'].toString();
              let roomCheckInNumber = mapArray['map']['roomCheckInNumber'].toString();
              let roomPrice = mapArray['map']['roomPrice'].toString();
              let roomType = mapArray['map']['roomType'].toString();
              let floorNumber = mapArray['map']['floorNumber'].toString();
              let floorCINumber = mapArray['map']['floorCINumber'].toString();

              let roomTypeArr = roomType.split(",");
              let roomPriceArr = roomPrice.split(",");
              let roomNumberArr = roomNumber.split(",");
              let roomCheckInNumberArr = roomCheckInNumber.split(",");
            
              let floorNumberArr = floorNumber.split(",");
              let floorCINumberArr = floorCINumber.split(",");
            // console.log(roomTypeArr);
            // console.log(roomPriceArr);
            // console.log(roomNumberArr);
            // console.log(roomCheckInNumberArr);

              addRoomStatusTable(roomTypeArr,roomPriceArr,roomNumberArr,roomCheckInNumberArr);
              addRoomStatusChart(floorNumberArr,floorCINumberArr);
            }
        });
    },

});

function addRoomStatusTable(roomTypeArr,roomPriceArr,roomNumberArr,roomCheckInNumberArr,){
    let roomstatusTable = document.getElementById("allRoomStatus");
    let currentRows = document.getElementById("allRoomStatus").rows.length;  //当前表格的行数

    // '<td style="border-left: 1px solid #E3E6EA; border-top: 1px solid #E3E6EA;padding-left:15px;"><span id="singleRoom">单人房</span></td>',
    // '<td style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;padding-left:15px;">40</td>',
    // '<td style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;padding-left:15px;">100</td>',
    // '<td style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;padding-left:15px;">20</td>',
    // '<td style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;padding-left:15px;">20</td>',
    // '<td style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;padding-left:15px;">20</td>',
    // '<td style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;padding-left:15px;">20</td>',
    // '<td style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;border-right: 1px solid #E3E6EA;padding-left:15px;">20</td>',
    
    for (let index = 0; index < roomTypeArr.length; index++) {

        let roomTypeIndex = roomTypeArr[index];
        let roomNumbetIndex = roomNumberArr[index];
        let roomPriceIndex = roomPriceArr[index];
        let roomCheckInNumberIndex = roomCheckInNumberArr[index];
        
        if(index == 0){
            roomTypeIndex = roomTypeIndex.replace("[","");
            roomNumbetIndex = roomNumbetIndex.replace("[","");
            roomPriceIndex = roomPriceIndex.replace("[","");
            roomCheckInNumberIndex = roomCheckInNumberIndex.replace("[","");
        }

        if(index == (roomTypeArr.length-1)){
            roomTypeIndex = roomTypeIndex.replace("]","");
            roomNumbetIndex = roomNumbetIndex.replace("]","");
            roomPriceIndex = roomPriceIndex.replace("]","");
            roomCheckInNumberIndex = roomCheckInNumberIndex.replace("]","");
        }

        let nowCanSold = parseInt(roomNumbetIndex)-parseInt(roomCheckInNumberIndex);

        let insertTr = roomstatusTable.insertRow(currentRows);
        insertTr.style = "height:44px;";
        let insertTd = insertTr.insertCell(0);
        insertTd.style="border-left: 1px solid #E3E6EA; border-top: 1px solid #E3E6EA;padding-left:15px;";
        if(roomTypeIndex.trim() == 'SINGLEROOM'){
            insertTd.innerHTML = '<span>单人房</span>';
        }else if(roomTypeIndex.trim() == 'DOUBLEROOM'){
            insertTd.innerHTML = '<span>双人房</span>';
        }else if(roomTypeIndex.trim() == 'TRIPLEROOM'){
            insertTd.innerHTML = '<span>三人房</span>';
        }else if(roomTypeIndex.trim() == 'HOURROOM'){
            insertTd.innerHTML = '<span>钟点房</span>';
        }
        
        insertTd = insertTr.insertCell(1);
        insertTd.style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;padding-left:15px;";
        insertTd.innerHTML = '<span>'+roomNumbetIndex+'</span>';

        insertTd = insertTr.insertCell(2);
        insertTd.style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;padding-left:15px;";
        insertTd.innerHTML = '<span>'+roomPriceIndex+'</span>';

        insertTd = insertTr.insertCell(3);
        insertTd.style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;padding-left:15px;";
        insertTd.innerHTML = '<span>'+roomCheckInNumberIndex+'</span>';

        insertTd = insertTr.insertCell(4);
        insertTd.style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;padding-left:15px";
        insertTd.innerHTML = '<span>0</span>';

        insertTd = insertTr.insertCell(5);
        insertTd.style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;padding-left:15px";
        insertTd.innerHTML = '<span>0</span>';

        insertTd = insertTr.insertCell(6);
        insertTd.style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;padding-left:15px";
        insertTd.innerHTML = '<span>0</span>';

        insertTd = insertTr.insertCell(7);
        insertTd.style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;border-right: 1px solid #E3E6EA;padding-left:15px;"
        insertTd.innerHTML = '<span>'+nowCanSold+'</span>';

        // let oldHeight = document.getElementById('roomStatusDiv').height;
        // console.log(oldHeight);
        // document.getElementById(roomStatusDiv).setAttribute('height',oldHeight);
    }
}

function addRoomStatusChart(floorNumberArr,floorCINumberArr){

    let firnumber = floorNumberArr[0].replace("[","").trim();
    let fircinumber = floorCINumberArr[0].replace("[","").trim();

    let secnumber = floorNumberArr[1].trim();
    let seccinumber = floorCINumberArr[1].trim();

    let thinumber = floorNumberArr[2].trim();
    let thicinumber = floorCINumberArr[2].trim();

    let founumber = floorNumberArr[3].trim();
    let foucinumber = floorCINumberArr[3].trim();

    let fivnumber = floorNumberArr[4].trim();
    let fivcinumber = floorCINumberArr[4].trim();

    let sixnumber = floorNumberArr[5].replace("]","").trim();
    let sixinumber = floorCINumberArr[5].replace("]","").trim();

    let firstFloorNumber = document.getElementById('firstFloorNumber');
    firstFloorNumber.style.height= '86%';
    let firstFloorCINumber = document.getElementById('firstFloorCINumber');
    firstFloorCINumber.style.height= fircinumber+'%';

    let secondFloorNumber = document.getElementById('secondFloorNumber');
    secondFloorNumber.style.height='86%';
    let secondFloorCINumber = document.getElementById('secondFloorCINumber');
    secondFloorCINumber.style.height= seccinumber +'%';
    
    let thirdFloorNumber = document.getElementById('thirdFloorNumber');
    thirdFloorNumber.style.height= '86%';
    let thirdFloorCINumber = document.getElementById('thirdFloorCINumber');
    thirdFloorCINumber.style.height= thicinumber +'%';

    let fourFloorNumber = document.getElementById('fourFloorNumber');
    fourFloorNumber.style.height='86%';
    let fourFloorCINumber = document.getElementById('fourFloorCINumber');
    fourFloorCINumber.style.height= foucinumber +'%';

    let fiveFloorNumber = document.getElementById('fiveFloorNumber');
    fiveFloorNumber.style.height= '86%';
    let fiveFloorCINumber = document.getElementById('fiveFloorCINumber');
    fiveFloorCINumber.style.height= fivcinumber +'%';

    let sixFloorNumber = document.getElementById('sixFloorNumber');
    sixFloorNumber.style.height= '86%';
    let sixFloorCINumber = document.getElementById('sixFloorCINumber');
    sixFloorCINumber.style.height=sixinumber  +'%';

}