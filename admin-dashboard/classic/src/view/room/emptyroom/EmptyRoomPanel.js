// var store = Ext.create('Admin.store.room.EmptyRoomTreeStore');


function selectGuestMessage() {
    event.stopPropagation(); //防止冒泡
    
    var loadGuestWin = Ext.create('Admin.view.room.emptyRoom.LoadGuestMessage');
    loadGuestWin.show();
}

function selectAccountType() {
    event.stopPropagation(); //防止冒泡
    
    var loadGuestWin = Ext.create('Admin.view.room.emptyRoom.LoadAccountWindow');
    loadGuestWin.show();
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
            id:'emptyTreePanel',
           
            bind:'{emptyfloodList}',//viewModel
            // store:store,
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
                        var win = Ext.create('Admin.view.room.emptyroom.EmptyRoomEditWindow');
                        var form = win.down('form').getForm();
                        console.log(event);
                        form.findField('roomNo').setValue(event.data.roomNo); //设置表单中的房间号的value
                        if (event.data.type == 1) {
                            form.findField('roomType').setValue("单人房"); //设置房间类型
                        } else if(event.data.type == 2){
                            form.findField('roomType').setValue("双人房"); 
                        } else if(event.data.type == 3){
                            form.findField('roomType').setValue("三人房"); 
                        } else if(event.data.type == 4){
                            form.findField('roomType').setValue("钟点房"); 
                        }
                        form.findField('roomPrice').setValue(event.data.price);
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
                        '<img id="returnIcon" style="float:left;height:30px;width:30px;cursor:pointer;" onclick="returnRoomList()" onmousemove="changeColor(\'return\')" onmouseout="changeblackColor(\'return\')" src="classic/resources/images/return.png"></img>',
                        '<h2 id="selectRoomNo" style="margin-left:41px;padding-top: 6px;">505号房</h2>',
                    '</div>',
                '<hr style="opacity: 0.5;"/>',
                '<table style="height: 160px;width:731px; margin-left:20px;margin-bottom:15px;margin-top:15px;" >',
                      '<tr >',
                        '<td style="color:#7c8994;width: 70px; font-size: 12px; ">房单号</td>',
                        '<td style="font-size: 12px; width: 250px;" id="bookRoomNo">123456789456789133</td>',
                        '<td style="color:#7c8994;width: 70px; font-size: 12px;" >房型</td>',
                        '<td style="font-size: 12px; width: 250px;" id="roomType"></td>',
                      '</tr>',
                      '<tr >',
                        '<td style="color:#7c8994;width: 70px; font-size: 12px; ">预定人</td>',
                        '<td style="font-size: 12px; width: 250px;" id="bookGuest">非预定</td>',
                        '<td style="color:#7c8994;width: 70px; font-size: 12px; ">电话</td>',
                        '<td style="font-size: 12px; width: 250px;" id="bookPhone">无</td>',
                      '</tr>',
                      '<tr>',
                        '<td style="color:#7c8994;width: 70px; font-size: 12px; ">房价</td>',
                        '<td style="font-size: 12px; width: 250px;" id="roomPrice"></td>',
                        '<td style="color:#7c8994;width: 70px; font-size: 12px; ">来源</td>',
                        '<td style="font-size: 12px; width: 250px;" id="bookSource">到店订房</td>',
                      '</tr>',
                      '<tr >',
                        '<td style="color:#7c8994;width: 70px; font-size: 12px;">入住时间</td>',
                        '<td style="font-size: 12px; width: 250px;"><span id="checkInTime">2017-03-15 16：51：26</span></td>',
                        '<td style="color:#7c8994;width: 70px; font-size: 12px; ">离店时间</td>',
                        '<td style="font-size: 12px; width: 250px;"><span id="checkOutTime">2017-03-15 16：51：26</span></td>',
                      '</tr>',
                      '<tr >',
                        '<td style="color:#7c8994;width: 70px; font-size: 12px; ">备注信息</td>',
                        '<td style="font-size: 12px; width: 500px; "colspan="3"><textarea id="remark" style="width: 600px;resize:none;"></textarea></td>',
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
                            '<th style="padding-left:15px;"><strong>操作</strong></th>',
                        '</tr>',
                    '</table>',
                '</div>',
                '<hr style="opacity: 0.5;margin-left:20px;margin-right:20px; width:75%"/>',
                '<div style="width:738px; margin-top:8px; margin-bottom:15px;">',
                '<span style="float: right; font-size: 11px; color: #19b9ed; cursor:pointer;" onclick="selectAccountType()" >添加收入操作</span>',
                    '<h5 style="margin-left:20px;margin-top:15px;">消费明细</h5>',
                    '<table id="cashInfoTable" style="width: 720px; margin-left:20px;  border-left: 1px solid #E3E6EA;border-bottom: 1px solid #E3E6EA;" cellspacing="0" >',
                        '<tr style="text-align: left;font-size:12px;color:#7c8994;height:35px; background-color: #ececec;">',
                            '<th style="width:20px"><input type="checkbox"></input></th>',
                            '<th style="padding-left:15px;"><strong>入账科目</strong></th>',
                            '<th style="padding-left:15px;"><strong>金额</strong></th>',
                            '<th style="padding-left:15px;"><strong>时间</strong></th>',
                            '<th style="padding-left:15px;"><strong>操作员</strong></th>',
                        '</tr>',
                        '<tr>',
                            '<td style=" height:30px;border-left: 1px solid #E3E6EA; border-top: 1px solid #E3E6EA;" ><input checked="checked" disabled="true"  type="checkbox"></input></td>',
                            '<td style="border-left: 1px solid #E3E6EA; border-top: 1px solid #E3E6EA;padding-left:15px;">押金</td>',
                            '<td style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;padding-left:15px;">100</td>',
                            '<td style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;padding-left:15px;">'+new Date().toLocaleString().replace(/\//g,"-")+'</td>',
                            '<td style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;border-right: 1px solid #E3E6EA;padding-left:15px;">陈子打</td>',
                        '</tr>',
                    '</table>',
                '</div>',
                '<span>',
                '<label style="font-size:13px;color:#7c8994;margin-left:20px;">应收(含押金)：</label>',
                '<strong style="font-size:15px;color:#ff5813;" id="totalPrice">0</strong>',
                '</span>',
                '<span style="margin-left:62px;">',
                '<label style="font-size:13px;color:#7c8994;margin-left:20px;">实收：</label>',
                '<strong style="font-size:15px;color:#ff5813;" id="realGetPrice">0</strong>',
                '</span>',
                '<span style="margin-left:297px;">',
                '<label style="font-size:13px;color:#7c8994;margin-right:6px;">找回:</label>',
                '<strong style="font-size:15px;color:#ff5813;" id="backPrice">0</strong>',
                '</span>',
                '<hr style="opacity: 0.5;margin-left:20px;margin-right:20px;margin-top:15px; width:75%"/>',
                '<div style="width:750px;">',
                '<div style="border-radius:5px;float:left;border:1px solid #35baf6;width:80px;height:30px;text-align:center;padding-top:7px;margin-right:10px;margin-left:20px;color: #35baf6;cursor:pointer;" onclick="enterAccount()">入账</div>',
                '<div style="border-radius:5px;float:left;border:1px solid #35baf6;width:80px;height:30px;text-align:center;padding-top:7px;margin-right:10px;color: #35baf6;cursor:pointer;">续住</div>',
                '<div style="border-radius:5px;float:left;border:1px solid #35baf6;width:80px;height:30px;text-align:center;padding-top:7px;margin-right:10px;color: #35baf6;cursor:pointer;">查看日志</div>',
               
                '<div style="border-radius:5px;float:right;border:1px solid #63a8eb;background-color:#63a8eb;width:80px;height:30px;text-align:center;padding-top:7px;margin-right:10px;color: #fff;cursor:pointer;pointer-events: none;">结账</div>',
                '<div style="border-radius:5px;float:right;border:1px solid #35baf6;width:80px;height:30px;text-align:center;padding-top:7px;margin-right:10px;color: #35baf6;cursor:pointer;">保存修改</div>',
                '</div>'
            ]
        }
    ]
});

