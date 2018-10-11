
// The data store containing the list of states
var states = Ext.create('Ext.data.Store', {
    fields: ['abbr', 'name'],
    data : [
        {"abbr":"clean", "name":"清洁"},
        {"abbr":"commodity", "name":"日用品"},
        // {"abbr":"AZ", "name":"Arizona"}
    ]
});

// var shows = Ext.create('Ext.data.Store', {
//     fields: ['id','show','number'],
//     data: [
//         {id: 0, show: '牙膏',number:2},
//         {id: 1, show: '牙刷',number:3},
//         {id: 2, show: '浴巾',number:4},
//         {id: 3, show: '毛巾',number:5},
//         {id: 4, show: '沐浴露',number:6}
//     ]
    
// });

Ext.define('Admin.view.room.inroom.InRoomEditWindow', {
    extend:'Ext.window.Window',

    alias:'widget.inRoomEditWindow',
    id:'inRoomEditWindow',
    title: '房间状态变更',
   
    // draggable:false,//拖动
    resizable:false,	//变大小	
    height: 300,
    width: 450,
    layout: 'fit',

    items:[
            {
                xtype: 'form',
                layout: 'form',
                id:'roomStateChange',
                padding: '10px',
                ariaLabel: 'Enter your name',
                items: [{
                    xtype: 'textfield',
                    id:'roomNo',
                    fieldLabel: '房 间 号',
                    name:'roomNo',
                    // hidden: true,
                    readOnly: true,
                    // disabled:true
                    // value:roomNo
                },{
                    xtype:'combobox',
                    fieldLabel: '服务类型', 
                    store: states,
                    displayField: 'name', //states中要显示的字段
                    valueField: 'abbr', //后台读取到的字段
                    editable:false, //是否可编辑
                    emptyText : '请选择服务类型',
                    listeners :{
                      
                        select:function(combo, record, eOpts){
                      
                            var selectValue = record.get('name');
                            if(selectValue == "日用品"){
                                var form = Ext.getCmp('roomStateChange');
                                form.items.get(2).setHidden(false); //
                                var win1 = Ext.getCmp("inRoomEditWindow");
                                var win = Ext.getCmp("inRoomDailyWindow");
                                if(win == null){

                                    win = Ext.create('Admin.view.room.inroom.InRoomDailyWindow');

                                    var form = createForm(); //创建表单
                               
                                    var store = Ext.create('Admin.store.room.DailyStore');
                                    store.load();
                                    var size = store.getCount();
                                    for (var index = 0; index < size; index++) {
                                        var dailyShow = store.getAt(index).data.show; //日用品展示的名称
                                        var dailyName = store.getAt(index).data.name; //日用品的真实名称
                                        var dailyNumber = 0; //日用品的数量，初始化为0
                                        var dailyId = store.getAt(index).data.id; //日用品的Id
                                        var dailyfield = {   //日用品文本域
                                                xtype: 'numberfield',
                                                name: dailyName,
                                                id:dailyId,
                                                fieldLabel: dailyShow,
                                                value: dailyNumber,
                                                maxValue: 99,
                                                minValue: 0,
                                                labelWidth: 45,
                                                width: 130,
                                                colmunWidth:0.5,
                                                margin:'0 8 5 0',
                                            };
                                        form.add(dailyfield);
                                    }
                                    win.add(form);
                                }
                                win.x=win1.x+450;
                                win.y=win1.y;
                                win.show();
                               
                            }else if(selectValue == "清洁"){
                                var form = Ext.getCmp('roomStateChange');
                                form.items.get(2).setHidden(true); //
                                var win = Ext.getCmp("inRoomDailyWindow");
                                win.hide();
                            }
                        }
                    }
                },{
                    xtype: 'tagfield',
                    fieldLabel: '选择结果',
                    // store: shows,
                    // bind: '{dailyLists}',
                    id:'dailyResult',
                    displayField: 'show',
                    valueField: 'id',
                    // value:'{id}',
                    // queryMode: 'local',  关闭这个就可以禁止下拉
                    readOnly:true,
                    hidden:true,
                    // filterPickList: true //在下拉列表中取消选中的tag
                    tipTpl:[
                        '<tpl for=".">',
                            '<span>{number}</span>',
                        '</tpl>'
                    ]
                }]
            },
            {

            }
          
    ],
    listeners:{
        close:function(){
            var win1 = Ext.getCmp("inRoomDailyWindow");
            if(win1!=null){
                win1.destroy();
            }
        }
    }
});




function createForm(){
    var form = Ext.create({
        xtype:'form',
        // id:'dailyform',
        width: 300,
        bodyPadding: 10,
        layout:'column',
        buttons: ['->',{
                        text: '标配',
                        handler: function() {
                            this.up('form').down('[name=toothbrush]').spinUp();
                            this.up('form').down('[name=toothpaste]').spinUp();
                            this.up('form').down('[name=towel]').spinUp();
                            this.up('form').down('[name=bathtowel]').spinUp();
                            this.up('form').down('[name=showergel]').spinUp();
                        }
                    },{
                        text: '确认',
                        handler: function() {
                            var tag = Ext.getCmp("dailyResult");   //获取父window中的tag组件
                            var store = Ext.create("Admin.store.room.DailyStore");  //给tag组件创建一个 store
            
                            var toothbrushNum = this.up('form').down('[name=toothbrush]').value; //牙刷数量
                            var toothpasteNum = this.up('form').down('[name=toothpaste]').value; //牙膏数量
                            var towel = this.up('form').down('[name=towel]').value; //毛巾数量
                            var bathtowel = this.up('form').down('[name=bathtowel]').value; //浴巾数量
                            var showergel = this.up('form').down('[name=showergel]').value; //沐浴露
            
                            var size = store.getCount();
                            for (var index = 0; index < size; index++) {
                               var record = store.getAt(index);
                               var recordName = record.data.show;
                               if(recordName == "牙膏"){
            
                               }else if(recordName == "牙刷"){
            
                               }else if(recordName == "浴巾"){
                                   
                               }else if(recordName == "毛巾"){
                                   
                               }else if(recordName == "沐浴露"){
                                   
                               }
                            }
                            store.getAt(1).set("number",66);
                            store.load();
                            tag.setStore(store);
                            var value = [1,2,3,4];
                            tag.setValue(value);
                        }
                    },'->']
    });
    return form;
}