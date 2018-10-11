
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
                                    Ext.Ajax.request({			
                                        url : 'room/getDaily',
                                        //从数据库中请求数据，动态获取items中的数据			
                                        method : 'Get',			
                                        success : function(result) {
                                            var resultArray = Ext.decode(result.responseText); //得到我们需要的数组
                                            //给form表单添加组件
                                            for (var index = 0; index < resultArray.length; index++) {
                                                var dailyShow = resultArray[index].show; //日用品展示的名称
                                                var dailyName = resultArray[index].name; //日用品的真实名称
                                                var dailyNumber = 0; //日用品的数量，初始化为0
                                                var dailyId = resultArray[index].id; //日用品的Id
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
                                        }}
                                    });
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
                        text: '清零',
                        handler: function() {
                            var form = this.up('form');
                            var size = form.items.length;
                            for (var index = 0; index < size; index++) {
                                var filedName = form.items.items[index].name;
                                var filedString = '[name='+filedName+']';
                                this.up('form').down(filedString).setValue(0);
                            }
                        }
                    },{
                        text: '标配',
                        handler: function() {
                            var form = this.up('form');
                            var size = form.items.length;
                            for (var index = 0; index < size; index++) {
                                var filedName = form.items.items[index].name;
                                var filedString = '[name='+filedName+']';
                                this.up('form').down(filedString).setValue(1);
                            }
                        }
                    },{
                        text: '确认',
                        handler: function() {
                            var tag = Ext.getCmp("dailyResult");   //获取父window中的tag组件
                            var store = Ext.create("Admin.store.room.DailyStore");  //给tag组件创建一个 store
                            

                            var form = this.up('form');
                            var size = form.items.length;
                            var data = new Array();
                            var tagvalue = new Array();  //用于标签的显示
                            for (var index = 0; index < size; index++) {
                                var record = form.items.items[index];
                                var number = record.value;
                                if(number != 0){
                                    var name = record.name;
                                    var id = record.id;
                                    tagvalue[index] = id;
                                    var show = record.fieldLabel;
                                    data[index] = {'id':id,'show':show,'number':number,'name':name};
                                    store.add(data[index]);  //给store插入数据
                                }
                            }
                            tag.setStore(store); //给tag添加store
                            tag.setValue(tagvalue);  //给tag设置标签显示
                            var win = Ext.getCmp("inRoomDailyWindow");
                                win.hide();
                        }
                    },'->']
    });
    return form;
}