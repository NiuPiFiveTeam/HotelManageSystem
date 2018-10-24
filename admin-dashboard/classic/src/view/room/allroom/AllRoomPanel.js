Ext.define('Admin.view.room.allroom.AllroomPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'allroomPanel',
    id:'allroomPanel',
    // title:'总体房态'
   
    listeners:{ afterrender:'loadTotalStatus'},
    html:[
        '<div class="huangxinjian" >',
            '<div id="roomStatusDiv" style="width: 96%; margin-left:2%; height: 82%;border-radius:12px; background-color: #fff;">',
                '<h5 style="margin-left: 23px;padding-top: 22px;margin-bottom: 0px;">今日房态</h5>',
                '<div style="width:100%; margin-top:14px;">',
                '<table id="allRoomStatus" style="width: 96%; margin-left:20px;  border-left: 1px solid #E3E6EA;border-bottom: 1px solid #E3E6EA;" cellspacing="0" >',
                    '<tr style="text-align: left;font-size:12px;color:#7c8994;height:37px; background-color: #ececec;">',
                        '<th style="padding-left:15px;width:12%;"><strong>房型</strong></th>',
                        '<th style="padding-left:15px;width:12%;"><strong>房间总数</strong></th>',
                        '<th style="padding-left:15px;width:12%;"><strong>今日房价</strong></th>',
                        '<th style="padding-left:15px;width:12%;"><strong>在住</strong></th>',
                        '<th style="padding-left:15px;width:12%;"><strong>未支付订单</strong></th>',
                        '<th style="padding-left:15px;width:12%;"><strong>已支付订单</strong></th>',
                        '<th style="padding-left:15px;width:12%;"><strong>停售房</strong></th>',
                        '<th style="padding-left:15px;width:12%;"><strong>当前可售</strong></th>',
                    '</tr>',
                '</table>',
                '</div>',
            '</div>',
            '<h5 style="position:relative;bottom:48%;left:45px;">楼层房态</h5>',
            '<div id="bar-chart" >',
            '<div class="graph">',
                '<ul class="x-axis">',
                    '<li><span>一楼</span></li>',
                    '<li><span>二楼</span></li>',
                    '<li><span>三楼</span></li>',
                    '<li><span>四楼</span></li>',
                    '<li><span>五楼</span></li>',
                    '<li><span>六楼</span></li>',
                 '</ul>',
                '<ul class="y-axis">',
                    '<li><span>35</span></li>',
                    '<li><span>30</span></li>',
                    '<li><span>25</span></li>',
                    '<li><span>20</span></li>',
                    '<li><span>15</span></li>',
                    '<li><span>10</span></li>',
                    '<li><span>5</span></li>',
                    '<li><span>0</span></li>',
                '</ul>',
            '<div class="bars">',
                '<div class="bar-group" style="margin-left: 0.8%;">',
                    '<div class="bar bar-1 stat-1" id="firstFloorNumber"  style="height: 51%;">',
                    '<span>4080</span>',
                    '</div>',
                    '<div class="bar bar-2 stat-2" id="firstFloorCINumber" style="height: 71%;">',
                    '<span>5680</span>',
                    '</div>',
                '</div>',
                '<div class="bar-group" style="margin-left: 0.8%;">',
                    '<div class="bar bar-4 stat-1" id="secondFloorNumber"  style="height: 76%;">',
                    '<span>6080</span>',
                    '</div>',
                    '<div class="bar bar-5 stat-2" id="secondFloorCINumber"  style="height: 86%;">',
                    '<span>6880</span>',
                    '</div>',
                '</div>',
                '<div class="bar-group" style="margin-left: 1.8%;">',
                    '<div class="bar bar-7 stat-1" id="thirdFloorNumber" style="height: 78%;">',
                    '<span>6240</span>',
                    '</div>',
                    '<div class="bar bar-8 stat-2" id="thirdFloorCINumber" style="height: 72%;">',
                    '<span>5760</span>',
                    '</div>',
                '</div>',
                '<div class="bar-group" style="margin-left: 1.5%;">',
                    '<div class="bar bar-10 stat-1" id="fourFloorNumber" style="height: 44%;">',
                    '<span>3520</span>',
                    '</div>',
                    '<div class="bar bar-11 stat-2" id="fourFloorCINumber" style="height: 64%;">',
                    '<span>5120</span>',
                    '</div>',
                '</div>',
                '<div class="bar-group" style="margin-left: 1.5%;">',
                    '<div class="bar bar-13 stat-1" id="fiveFloorNumber" style="height: 28%;">',
                    '<span>2240</span>',
                    '</div>',
                    '<div class="bar bar-14 stat-2" id="fiveFloorCINumber" style="height: 33%;">',
                    '   <span>2640</span>',
                    '</div>',
                '</div>',
                '<div class="bar-group" style="margin-left: 1.5%">',
                    '<div class="bar bar-3 stat-1" id="sixFloorNumber" style="height: 78%;">',
                    '<span>6240</span>',
                    '</div>',
                    '<div class="bar bar-9 stat-2" id="sixFloorCINumber" style="height: 72%;">',
                    '<span>5760</span>',
                    '</div>',
                '</div>',
            '</div>',
            '</div>',
            '</div>',
            '<div style="text-align:center;clear:both">',
            '</div>',
            
        '</div>',
       
    ]
});