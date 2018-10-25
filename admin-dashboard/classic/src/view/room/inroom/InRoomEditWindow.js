
// The data store containing the list of states
var serviceType = Ext.create('Ext.data.Store', {
    fields: ['abbr', 'name'],
    data : [
        {"abbr":"cleanService", "name":"清洁服务"},
        {"abbr":"dailyNecessaryService", "name":"日用品补充"},
        {"abbr":"roomcardService", "name":"房卡服务"},
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
                    store: serviceType,
                    displayField: 'name', //serviceType中要显示的字段
                    valueField: 'abbr', //后台读取到的字段
                    editable:false, //是否可编辑
                    emptyText : '请选择服务类型',
                    listeners :{
                      
                        select:function(combo, record, eOpts){
                            var selectValue = record.get('name');
                            var functionName = record.get('abbr');
                            // if(selectValue == "日用品补充"){
                            //     dailyNecessaryService();
                            // }else if(selectValue == "清洁服务"){
                            //     cleanService();
                            // }else if(selectValue == "房卡服务"){}
                            eval(functionName+"()");  //替换繁琐的 if else 语句，通过命名的规范来提高程序的低耦合性
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
                },{
                        xtype      : 'radiogroup',
                        fieldLabel : '清洁类型',
                        width:300,
                        hidden:true,
                        defaults: {
                            flex: 1, //flex只在当layOut为vbox,hbox中起作用。grid的默认layOut应该为vbox
                            //在这里 flex表示 每一列占用1/3的宽度
                            listeners :{
                                change:function(radio, newValue,oldValue){ //当选中的时候就执行这个函数
                                 
                                    // console.log(radio);
                                    // console.log(newValue);  //新的值
                                    // console.log(oldValue);  //原来的值
                                    // console.log(radio.inputValue);
                                    if(newValue==true && radio.id == "checkoutClean"){
                                        var win = radio.up("window");
                                        var form = win.down('form');
                                        form.items.get(4).setHidden(false); //
                                        console.log(form);
                                        win.setHeight(350);
                                    }else if(newValue==true && radio.id == "roomserviceClean"){
                                        var win = radio.up("window");
                                        var form = win.down('form');
                                        form.items.get(4).setHidden(true); //
                                        console.log(form);
                                        win.setHeight(300);
                                    }
                                }
                            }
                        },
                        layout: 'hbox',
                        items: [
                            {
                                boxLabel  : '退房清洁',
                                name      : 'cleanType',
                                inputValue: 'checkoutClean',
                                id        : 'checkoutClean',
                               
                            },{
                                boxLabel  : '客房清洁',
                                name      : 'cleanType',
                                inputValue: 'roomserviceClean',
                                id        : 'roomserviceClean'
                            }
                        ],
                       
                },{
                    xtype     : 'textareafield',
                    grow      : true,
                    name      : 'remark',
                    fieldLabel: '备　注',
                    anchor    : '100%',
                    hidden:true
                }]
            },
    ],
    buttons: ['->',{
        text: '提交服务请求',
        handler: function() {
            var form = Ext.getCmp('roomStateChange');
            roomNo = form.items.get(0).value; //  获取房间号码
            var selectValue = form.items.get(1).value; //选择的服务类型
            if(selectValue == null){
                alert("请选择一项服务后再提交");
            }else {
                var submitfunctionName = selectValue+"Submit";
                eval(submitfunctionName+"(roomNo)");
            }
           
        }
    }],
    listeners:{
        close:function(){
            var win1 = Ext.getCmp("inRoomDailyWindow");
            if(win1!=null){
                win1.destroy();
            }
        }
    }
});




/**
 * 生成 日用品表单
 */
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
                                var number = record.value; //得到日用品的数量
                                if(number != 0){  //如果日用品数量不为0，才生成标签
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

/**
 *  日用品补充选择函数
 */
function dailyNecessaryService(){
    var form = Ext.getCmp('roomStateChange');
    form.items.get(3).setHidden(true); //
    form.items.get(2).setHidden(false); //
    form.items.get(4).setHidden(true);
    var win1 = Ext.getCmp("inRoomEditWindow");
    win1.setHeight(300);
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
}



/**
 *  客房清洁服务选择函数
 */
function cleanService(){
    var form = Ext.getCmp('roomStateChange');
    form.items.get(2).setHidden(true); //
    form.items.get(3).setHidden(false); //
    var win = Ext.getCmp("inRoomDailyWindow");
    if(win!=null){
        win.hide();
    }
}

/**
 *  房卡服务选择函数
 */
function roomcardService(){
    alert("房卡服务");
}


/**
 * 日用品补充请求提交函数
 */
function dailyNecessaryServiceSubmit(roomNo){
    
    var form = Ext.getCmp('roomStateChange');
    var dailyResult = form.items.get(2); //取到日用品的那个表单域
    var dailyStore = dailyResult.getStore(); //取到表单域的store
    var length = dailyStore.data.items.length;  //取到表单域的store的条目数量
    // var dailyTagData = new Array(); //封装好的数据
    // for(var i = 0; i < length ; i++){
    //   var data = dailyStore.data.items[i].data;
    //   dailyTagData[i] = data;
    // }
    // console.log(dailyTagData);
    var listString = []; //封装好的数据
    Ext.each(dailyStore.getRange(), function(record) {
        listString.push(record.data);
    });
    var dailyTagData=Ext.util.JSON.encode(listString);
    /**
     *  封装好数据后，开始转发到后台
     */
    Ext.Ajax.request({			
        url : 'roomClean/dailyNecessarySupplement',
        //从数据库中请求数据，动态获取items中的数据	
        params : {
            'dailyTagData':dailyTagData,
            'roomNo':roomNo
        },                //如果未配置任何方法，则在未发送参数时为“GET”，如果正在发送参数，则为“POST”。
        method : 'POST', //方法名称区分大小写，应该全部大写。			
        success : function(result) {  //这里取回来房间最新的状态值

            var state = result.responseText;
            var roomdataview = Ext.getCmp('roomdataview');
            var roomstore = roomdataview.getStore();
            var record = roomstore.findRecord('roomNo',roomNo);  //findRecord ，返回值是一个 model

            if(state=="NEED_DAILY_NECESSITIES"){ //说明后台返回的是房间需要日用品的状态
                record.set('state',2);
            }
            // roomstore.load();
            alert("请求已提交");
            var fatherwin = form.up('window');
            fatherwin.close();
        }
    });
    

}


/**
 * 清洁服务请求提交函数
 */
function cleanServiceSubmit(roomNo){
    var form = Ext.getCmp('roomStateChange');
   var radio1 = Ext.getCmp("checkoutClean");  //获取哪个radio被选中
   var radio2 = Ext.getCmp("roomserviceClean");

   var selectValue = null;
   var remark = null;
   if(radio1.getValue()){
       selectValue = radio1.inputValue;  //说明需要退房
       var form = Ext.getCmp("roomStateChange");
       remark = form.items.get(4).value;   //得到输入的备注
   }else if(radio2.getValue()){
       selectValue = radio2.inputValue;  //说明需要清洁
   }

   if(selectValue != null){
        Ext.Ajax.request({			
            url : 'roomClean/changeRoomState',
            //从数据库中请求数据，动态获取items中的数据	
            params : {
                'roomNo':roomNo,
                'selectValue':selectValue,
                'remark':remark,
            },                //如果未配置任何方法，则在未发送参数时为“GET”，如果正在发送参数，则为“POST”。
            method : 'Get', //方法名称区分大小写，应该全部大写。			
            success : function(result) {  //这里取回来房间最新的状态值

                var state = result.responseText;
                var roomdataview = Ext.getCmp('roomdataview');
                var roomstore = roomdataview.getStore();
                var record = roomstore.findRecord('roomNo',roomNo);  //findRecord ，返回值是一个 model

                if(state=="NEEDCLEAN"){ //说明后台返回的是房间需要清洁的状态
                    record.set('state',3);
                }
                // roomstore.load();
                alert("请求已提交");
                var fatherwin = form.up('window');
                fatherwin.close();
                if(selectValue == 'checkoutClean'){
                    //跳转到订单
                    let GuestListTable1 = document.getElementById('CheckOutGuestInfoTable');
                    if(typeof(GuestListTable1) != 'undefined' ){
                        let guestLength1 = GuestListTable1.rows.length;
                        while(guestLength1 > 1){
                            if(guestLength1-1 > 0){
                                GuestListTable1.deleteRow(guestLength1-1);
                            }
                            guestLength1--;   
                        }
                    }
                   
                    overOrder(roomNo);
                   
                }
            }
        });
   }else{
        alert("请选择一项清洁服务！");
   }
}


/**
 * 房卡服务请求提交函数
 */
function roomcardServiceSubmit(){
    alert("房卡服务提交");
}

/**
 * 结账
 */
function overOrder(roomNo){

    let setCheckOutBookRoomNo = document.getElementById('CheckOutbookRoomNo');
    let setCheckOutSelectRoomNo = document.getElementById('CheckOutselectRoomNo');
    let setCheckOutCheckInTime = document.getElementById('CheckOutcheckInTime');
    let setCheckOutCheckOutTime = document.getElementById('CheckOutcheckOutTime');
    let setCheckOutRoomType = document.getElementById('CheckOutroomType');
    let setCheckOutRoomPrice = document.getElementById('CheckOutroomPrice');
    let setCheckOutTotalPrice = document.getElementById('CheckOuttotalPrice');
    let setCheckOutrealGetPrice = document.getElementById('CheckOutrealGetPrice');
    /**
     * 访问后台获取订单信息
     */

    Ext.Ajax.request({			
        url : '/roomOrder/getOrderInfo',
        //从数据库中请求数据，动态获取items中的数据			
        params : {
            'roomNo':roomNo,
        }, 
        method : 'Get',			
        success : function(result) {
            var resultArray = Ext.decode(result.responseText);  //成功获取订单信息后，开始填充，然后再去获取用户信息
            console.log(resultArray);
            setCheckOutSelectRoomNo.innerText = roomNo+"号房";
            setCheckOutBookRoomNo.innerText = resultArray[0]['bookRoomNo'];
            setCheckOutRoomType.innerText = resultArray[0]['roomType'];
            setCheckOutRoomPrice.innerText = resultArray[0]['roomPrice'];
            setCheckOutCheckInTime.innerText = resultArray[0]['checkInTime'];
            setCheckOutCheckOutTime.innerText =  resultArray[0]['checkOutTime'];
            setCheckOutTotalPrice.innerText = resultArray[0]['totalIncome'];
            setCheckOutrealGetPrice.innerText = resultArray[0]['shouldIncome'];
        
            Ext.Ajax.request({			
                url : '/guest/findGuestByRoomNo',
                //从数据库中请求数据，动态获取items中的数据			
                params : {
                    'roomNo':roomNo,
                },   
                method : 'Get',			
                success : function(result1) {
                    var resultArray1 = Ext.decode(result1.responseText);  //成功获取订单信息后，开始填充，然后再去获取用户信息
                    console.log(resultArray1);
                    loadCheckOutGuestInfoTable(resultArray1);
                }
            });
        }
    });

    let inroompanel = Ext.getCmp('inRoomPanel');
    let showPanel = inroompanel.items.get(3);
    let hiddenPanel = inroompanel.items.get(2);
    hiddenPanel.setHidden(true);
    showPanel.setHidden(false);

}

function loadCheckOutGuestInfoTable(data){
     // 原来的行数    比如：此处获得表格的行数是5，则每一行对应的index是0~4，所以下面在insertRow时，使用的是表格的当前行数
     for (let index = 0; index < data.length; index++) {

        let currentRows = document.getElementById("CheckOutGuestInfoTable").rows.length; 
 
        let insertTr = document.getElementById("CheckOutGuestInfoTable").insertRow(currentRows);

        let insertTd = insertTr.insertCell(0);
        insertTd.style="height: 30px;width: 120px;border-top: 1px solid #E3E6EA;";
        insertTd.innerHTML = '<div style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">'+data[index].realName+'</div>';
            
        insertTd = insertTr.insertCell(1);
        insertTd.style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;";
        insertTd.innerHTML = '<div style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">'+data[index].idCard+'</div>';
            
        insertTd = insertTr.insertCell(2);
        insertTd.style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;";
        if (data[index].gender.trim()=="FEMALE") {
            insertTd.innerHTML ='<div  style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">'+'女性'+'</div>';
        }else if(data[index].gender.trim()=="MALE"){
            insertTd.innerHTML ='<div  style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">'+'男性'+'</div>';
        }
            
        insertTd = insertTr.insertCell(3);
        insertTd.style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;";
        insertTd.innerHTML = '<div  style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">'+data[index].phone+'</div>';

        insertTd = insertTr.insertCell(4);
        insertTd.style="border-left: 1px solid #E3E6EA;border-top: 1px solid #E3E6EA;border-right: 1px solid #E3E6EA;"
        if (data[index].guestState == 'CASUAL') {
            insertTd.innerHTML = '<div style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">'+'临时客人'+'</div>';
        }else if(data[index].guestState == 'STARMEMBER'){
             insertTd.innerHTML = '<div style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">'+'星标会员'+'</div>';
        }else if(data[index].guestState == 'MEMBER'){
             insertTd.innerHTML = '<div style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">'+'普通会员'+'</div>';
        }else if(data[index].guestState == 'BLACKLIST'){
             insertTd.innerHTML = '<div style="margin: 10px;padding: 4px;padding-left: 10px;border: 1px solid #E3E6EA;">'+'黑名单'+'</div>';
        }

        

        let inRoomPanel = Ext.getCmp('inRoomPanel');
        let oldHeight = inRoomPanel.height;
        inRoomPanel.setHeight(oldHeight+50);
        
    }
}