var store = Ext.create('Admin.store.room.EmptyRoomTreeStore');


function selectGuestMessage() {
    event.stopPropagation(); //防止冒泡

    

    //原来的行数    比如：此处获得表格的行数是5，则每一行对应的index是0~4，所以下面在insertRow时，使用的是表格的当前行数
    // var currentRows = document.getElementById("guestInfoTable").rows.length; 
    // var insertTr = document.getElementById("guestInfoTable").insertRow(currentRows);  
    // var insertTd = insertTr.insertCell(0);
    // insertTd.style="height: 30px;width: 120px;border-top: 1px solid #E3E6EA;";
    // insertTd.innerHTML = '<div style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">黄欣健</div>';
           
    // insertTd = insertTr.insertCell(1);
    // insertTd.style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;";
    // insertTd.innerHTML = '<div style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">441225199608130076</div>';
        
    // insertTd = insertTr.insertCell(2);
    // insertTd.style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;";
    // insertTd.innerHTML ='<div  style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">男性</div>';
        
    // insertTd = insertTr.insertCell(3);
    // insertTd.style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;";
    // insertTd.innerHTML = '<div  style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">13538364468</div>';

    // insertTd = insertTr.insertCell(4);
    // insertTd.style="border-left: 1px solid #E3E6EA;border-right: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;"
    // insertTd.innerHTML = '<div style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">星标会员</div>';

    // let emptyRoomPanel = Ext.getCmp('emptyRoomPanel');
    // console.log(emptyRoomPanel);
    // let oldHeight = emptyRoomPanel.height;
    // console.log(oldHeight);
    // emptyRoomPanel.setHeight(oldHeight+50);
}

function returnRoomList() {
    // history.go(-1);
    let emptyRoomPanel = Ext.getCmp('emptyRoomPanel');
//     //collapsible: true,  //是否可折叠
//    // collapsed: true,
   console.log(emptyRoomPanel);
   let showPanel = emptyRoomPanel.items.get(3);
   console.log(showPanel);
   let hiddenPanel = emptyRoomPanel.items.get(2);
   console.log(hiddenPanel);
   
   hiddenPanel.setHidden(false);
   showPanel.setHidden(true);
}

function changeColor() {
    document.getElementById('returnIcon').src="classic/resources/images/returnblue.png";
}

function changeblackColor() {
    document.getElementById('returnIcon').src="classic/resources/images/return.png";
}


Ext.define('Admin.view.room.emptyroom.EmptyRoomPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'emptyRoomPanel',
    id:'emptyRoomPanel',

    layout: 'border',
    width:800, 
    height:680,   //必须设置高，否则无法使用border布局

    items: [
        {    
            xtype: 'treepanel',    //菜单树
            region: 'west',
            title:'<b>楼层</b>',
           
            // bind:'{floodList}',//viewModel
            store:store,
            animate:true,
            animateShadow:true,
            animCollapse:true,
            rootVisible: true,
            splitterResize: false,
            // collapsible: true,  //是否可折叠
            // collapsed: false,
            minWidth: 100,
            width: 215,
            split: true,
            listeners:{itemclick:'loadEmptyHomeItem'},
        },{
            xtype:'panel',
            region:'center',
            title: '客房情况',
            width: 540,
            // html:'数据视图....'
            // hidden:true,
            items: {
                xtype: 'dataview',
                reference: 'dataview',
                id:'emptyRoomdataview',
                
                // plugins: {
                //     'ux-animated-dataview': true
                // },
                bind: '{emptyRoomLists}',   //注意，bing属性只能写到dataview里面
                itemSelector: 'div.dataview-multisort-item',
                tpl: [
                    '<div style="width:300px;height:30px;float:right">',
                        '<img  style="width:20px;height:20px;margin-right:5px; margin-top:5px;" src="classic/resources/images/room/0.png" /><strong style="position:relative; bottom:4px;font-size:15px;margin-right:10px;">空闲房间</strong>',
                    '</div>',
                    '<div style="clear:both;"></div>',
                    '<tpl for=".">',
                        '<div id="{roomId}" style="cursor:pointer;width:50px;height:70px;margin-left:15px;margin-top:5px;float:left;border:1px dashed white;" class="dataview-multisort-item">',
                            '<img style="width:50px;height:50px;margin-bottom=0px;" src="classic/resources/images/room/0.png" />',
                            '<h3 style="margin-top:0px;margin-left:11px;margin-bottom:0px;">{roomNo}</h3>',
                        '</div>',
                    '</tpl>'
                ],   
                listeners:{
                    'itemclick':function(node,event){
                        var win = Ext.create('Admin.view.room.inroom.EmptyRoomEditWindow');
                        var form = win.down('form').getForm();
                        form.findField('roomNo').setValue(event.data.roomNo); //设置表单中的房间号的value
                        if (event.data.type == 1) {
                            form.findField('roomType').setValue("单人房"); //设置表单中的房间号的value
                        } else if(event.data.type == 2){
                            form.findField('roomType').setValue("双人房"); //设置表单中的房间号的value
                        } else if(event.data.type == 3){
                            form.findField('roomType').setValue("三人房"); //设置表单中的房间号的value
                        } else if(event.data.type == 4){
                            form.findField('roomType').setValue("钟点房"); //设置表单中的房间号的value
                        }
                        
                        win.show();
                        
                    }
                },
            }
        },{
            xtype:'panel',
            height:1000,
            width:1200,
            id:'roomOrderPanel',
            hidden:true,
            html:[  
                '<div style="width:90%;border-top:3px solid #35baf6;">',
                    '<div style="width:84%;">',  //96%
                        '<img id="returnIcon" style="float:left;height:30px;width:30px;cursor:pointer;" onclick="returnRoomList()" onmousemove="changeColor()" onmouseout="changeblackColor()" src="classic/resources/images/return.png"></img>',
                        '<h2 id="selectRoomNo" style="margin-left:41px;padding-top: 6px;">505号房</h2>',
                    '</div>',
                '<hr style="opacity: 0.5;"/>',
                '<table style="height: 160px;width:731px; margin-left:20px;margin-bottom:15px;margin-top:15px;" >',
                      '<tr >',
                        '<td style="color:#7c8994;width: 70px; font-size: 12px; ">房单号</td>',
                        '<td style="font-size: 12px; width: 250px;">123456789456789133</td>',
                        '<td style="color:#7c8994;width: 70px; font-size: 12px;" >房型</td>',
                        '<td style="font-size: 12px; width: 250px;" id="roomType">大床房</td>',
                      '</tr>',
                      '<tr >',
                        '<td style="color:#7c8994;width: 70px; font-size: 12px; ">预定人</td>',
                        '<td style="font-size: 12px; width: 250px;">黄欣健</td>',
                        '<td style="color:#7c8994;width: 70px; font-size: 12px; ">电话</td>',
                        '<td style="font-size: 12px; width: 250px;">13538364468</td>',
                      '</tr>',
                      '<tr>',
                        '<td style="color:#7c8994;width: 70px; font-size: 12px; ">房价</td>',
                        '<td style="font-size: 12px; width: 250px;">500</td>',
                        '<td style="color:#7c8994;width: 70px; font-size: 12px; ">来源</td>',
                        '<td style="font-size: 12px; width: 250px;">个人预订</td>',
                      '</tr>',
                      '<tr >',
                        '<td style="color:#7c8994;width: 70px; font-size: 12px;">入住时间</td>',
                        '<td style="font-size: 12px; width: 250px;"><span id="checkInTime">2017-03-15 16：51：26</span></td>',
                        '<td style="color:#7c8994;width: 70px; font-size: 12px; ">离店时间</td>',
                        '<td style="font-size: 12px; width: 250px;"><span id="checkOutTime">2017-03-15 16：51：26</span></td>',
                      '</tr>',
                      '<tr >',
                        '<td style="color:#7c8994;width: 70px; font-size: 12px; ">备注信息</td>',
                        '<td style="font-size: 12px; width: 500px; "colspan="3"><textarea style="width: 600px;resize:none;"></textarea></td>',
                      '</tr>',
                '</table>',
                '</div>',
                '<hr style="opacity: 0.5;margin-left:20px;margin-right:20px; width:75%"/>',
                '<div style="width:738px; margin-top:10px;">',
                    '<span style="float: right; font-size: 11px; color: #19b9ed; cursor:pointer;" onclick="selectGuestMessage()" >添加客人信息</span>',
                    '<h5 id="selectRoomNo" style="margin-left:20px;margin-top:15px;">客人信息</h5>',
                    '<table id="guestInfoTable" style="width: 720px; margin-left:20px;  border-left: 1px solid #E3E6EA;border-bottom: 1px solid #E3E6EA;" cellspacing="0" >',
                        '<tr style="text-align: left;font-size:12px;color:#7c8994;height:35px; background-color: #ececec;">',
                            '<th style="padding-left:15px;"><strong>姓名</strong></th>',
                            '<th style="padding-left:15px;"><strong>证件号码</strong></th>',
                            '<th style="padding-left:15px;"><strong>性别</strong></th>',
                            '<th style="padding-left:15px;"><strong>手机号码</strong></th>',
                            '<th style="padding-left:15px;"><strong>状态</strong></th>',
                        '</tr>',
                        '<tr>',
                            '<td style=" height: 30px;width: 120px;" ><div style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">黄欣健</div></td>',
                            '<td style="border-left: 1px solid #E3E6EA;"><div  style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">441225199608130076</div></td>',
                            '<td style="border-left: 1px solid #E3E6EA;"><div  style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">男性</div></td>',
                            '<td style="border-left: 1px solid #E3E6EA;"><div  style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">13538364468</div></td>',
                            '<td style="border-left: 1px solid #E3E6EA;border-right: 1px solid #E3E6EA;"><div style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">星标会员</div></td>',
                        '</tr>',
                    '</table>',
                '</div>',
                '<hr style="opacity: 0.5;margin-left:20px;margin-right:20px; width:75%"/>',
                '<div style="width:738px; margin-top:8px; margin-bottom:15px;">',
                    '<h5 style="margin-left:20px;margin-top:15px;">消费明细</h5>',
                    '<table id="guestInfoTable" style="width: 720px; margin-left:20px;  border-left: 1px solid #E3E6EA;border-bottom: 1px solid #E3E6EA;" cellspacing="0" >',
                        '<tr style="text-align: left;font-size:12px;color:#7c8994;height:35px; background-color: #ececec;">',
                            '<th style="width:20px"><input type="checkbox"></input></th>',
                            '<th style="padding-left:15px;"><strong>入账科目</strong></th>',
                            '<th style="padding-left:15px;"><strong>金额</strong></th>',
                            '<th style="padding-left:15px;"><strong>时间</strong></th>',
                            '<th style="padding-left:15px;"><strong>操作员</strong></th>',
                        '</tr>',
                        '<tr>',
                            '<td style=" height:30px;" ><input type="checkbox"></input></td>',
                            '<td style="border-left: 1px solid #E3E6EA;padding-left:15px;">现金</td>',
                            '<td style="border-left: 1px solid #E3E6EA;padding-left:15px;">500</td>',
                            '<td style="border-left: 1px solid #E3E6EA;padding-left:15px;">2017-03-15 16：51</td>',
                            '<td style="border-left: 1px solid #E3E6EA;border-right: 1px solid #E3E6EA;padding-left:15px;">陈子打</td>',
                        '</tr>',
                        '<tr>',
                            '<td style=" height:30px;" ><input type="checkbox"></input></td>',
                            '<td style="border-left: 1px solid #E3E6EA; border-top: 1px solid #E3E6EA;padding-left:15px;">押金</td>',
                            '<td style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;padding-left:15px;">100</td>',
                            '<td style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;padding-left:15px;">2017-03-15 16：51</td>',
                            '<td style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;border-right: 1px solid #E3E6EA;padding-left:15px;">陈子打</td>',
                        '</tr>',
                    '</table>',
                '</div>',
                '<span>',
                '<label style="font-size:13px;color:#7c8994;margin-left:20px;">总消费：</label>',
                '<strong style="font-size:15px;color:#ff5813;">-600</strong>',
                '</span>',
                '<span style="margin-left:50px;">',
                '<label style="font-size:13px;color:#7c8994;margin-left:20px;">总收入：</label>',
                '<strong style="font-size:15px;color:#ff5813;">500</strong>',
                '</span>',
                '<span style="margin-left:347px;">',
                '<label style="font-size:13px;color:#7c8994;margin-left:20px;">找回:</label>',
                '<strong style="font-size:15px;color:#ff5813;">20</strong>',
                '</span>',
                '<hr style="opacity: 0.5;margin-left:20px;margin-right:20px;margin-top:15px; width:75%"/>',
                '<div style="width:750px;">',
                '<div style="float:left;border:1px solid #35baf6;width:80px;height:30px;text-align:center;padding-top:7px;margin-right:10px;margin-left:20px;color: #35baf6;">入账</div>',
                '<div style="float:left;border:1px solid #35baf6;width:80px;height:30px;text-align:center;padding-top:7px;margin-right:10px;color: #35baf6;">续住</div>',
                '<div style="float:left;border:1px solid #35baf6;width:80px;height:30px;text-align:center;padding-top:7px;margin-right:10px;color: #35baf6;">查看日志</div>',

                '<div style="float:right;border:1px solid #63a8eb;background-color:#63a8eb;width:80px;height:30px;text-align:center;padding-top:7px;margin-right:10px;color: #fff;">结账</div>',
                '<div style="float:right;border:1px solid #35baf6;width:80px;height:30px;text-align:center;padding-top:7px;margin-right:10px;color: #35baf6;">保存修改</div>',
                '</div>'
            ]
        }
    ]
});

