// var store = Ext.create('Admin.store.room.EmptyRoomTreeStore');
Ext.define('Admin.view.room.emptyroom.EmptyRoomPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'emptyRoomPanel',
    id:'emptyRoomPanel',

    layout: 'border',
    width:800, 
    height:700,   //必须设置高，否则无法使用border布局

    items: [
        {    
            xtype: 'treepanel',    //菜单树
            region: 'west',
            title:'<b>楼层</b>',
           
            bind:'{floodList}',//viewModel
            // store:store,
            animate:true,
            animateShadow:true,
            animCollapse:true,
            rootVisible: true,
            splitterResize: false,
            collapsible: true,  //是否可折叠
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
                        '<img style="width:20px;height:20px;margin-right:5px; margin-top:5px;" src="classic/resources/images/room/0.png" /><strong style="position:relative; bottom:4px;font-size:15px;margin-right:10px;">空闲房间</strong>',
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
                        win.show();
                    }
                },
            }
        }
    ]
});