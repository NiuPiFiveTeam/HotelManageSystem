
var store = Ext.create('Admin.store.room.InRoomTreeStore');

Ext.define('Admin.view.room.inroom.InRoomPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'inRoomPanel',
    id:'inRoomPanel',
    
    requires: [
        'Ext.layout.container.Border',
        'Ext.toolbar.TextItem',
        'Ext.view.View',
        'Ext.ux.BoxReorderer',
        'Ext.ux.DataView.Animated',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.ux.DataView.DragSelector',
        'Ext.ux.DataView.LabelEditor'
    ],
    // title:'当天入住情况',
    //controller: 'searchresults',
   
    layout: 'border',
    width:800, 
    height:700,   //必须设置高，否则无法使用border布局
   
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
            collapsible: true,  //是否可折叠
            minWidth: 100,
            width: 215,
            split: true,
            listeners:{itemclick:'loadHomeItem'},
        },{
            xtype:'panel',
            region:'center',
            title: '客房情况',
            width: 540,
            // html:'数据视图....'
            
            items: {
                xtype: 'dataview',
                reference: 'dataview',
                id:'roomdataview',
                // plugins: {
                //     'ux-animated-dataview': true
                // },
                bind: '{roomLists}',   //注意，bing属性只能写到dataview里面
                itemSelector: 'div.dataview-multisort-item',
                tpl: [
                    '<div style="width:300px;height:30px;float:right">',
                        '<img style="width:20px;height:20px;margin-right:5px; margin-top:5px;" src="classic/resources/images/room/1.png" /><strong style="position:relative; bottom:4px;font-size:15px;margin-right:10px;">已入住</strong>',
                        '<img style="width:20px;height:20px;margin-right:5px; margin-top:5px;" src="classic/resources/images/room/3.png" /><strong style="position:relative; bottom:4px;font-size:15px;margin-right:10px;">需要日用品</strong>',
                        '<img style="width:20px;height:20px;margin-right:5px; margin-top:5px;" src="classic/resources/images/room/2.png" /><strong style="position:relative; bottom:4px;font-size:15px;">需要清洁</strong>',
                    '</div>',
                    '<div style="clear:both;"></div>',
                    '<tpl for=".">',
                        '<div id="{roomId}" style="cursor:pointer;width:50px;height:70px;margin-left:15px;margin-top:5px;float:left;border:1px dashed white;" class="dataview-multisort-item">',
                        '<tpl if="state == 1 ">', //表示正常入住状态
                            '<img style="width:50px;height:50px;margin-bottom=0px;" src="classic/resources/images/room/1.png" />',
                        '</tpl>',  
                        '<tpl if="state == 2 ">', //表示需要清洁状态
                            '<img style="width:50px;height:50px;margin-bottom=0px;" src="classic/resources/images/room/2.png" />',
                        '</tpl>',    
                        '<tpl if="state == 3 ">', //表示需要日用品状态
                            '<img style="width:50px;height:50px;margin-bottom=0px;" src="classic/resources/images/room/3.png" />',
                        '</tpl>',  
                            '<h3 style="margin-top:0px;margin-left:11px;margin-bottom:0px;">{roomNo}</h3>',
                        '</div>',
                    '</tpl>'
                ],
                listeners:{'itemclick':function(node,event){
                    console.log(event.data);
                    var win = Ext.create('Admin.view.room.inroom.InRoomEditWindow');
                    //var win = this.up('container').add(Ext.widget('fullRoomEditWindow')).show();
                    var form = win.down('form').getForm();
                    // Ext.getCmp('roomNo').setValue(event.data.roomNo);
                    form.findField('roomNo').setValue(event.data.roomNo);
                    win.show();
                   
                }},
            }
        }

    ]
   
});