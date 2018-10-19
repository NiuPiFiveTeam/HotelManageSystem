// The data store containing the list of states
var genderType = Ext.create('Ext.data.Store', {
    fields: ['abbr', 'name'],
    data : [
        {"abbr":"male", "name":"男性"},
        {"abbr":"female", "name":"女性"},
    ]
});

/**
* 将阿拉伯数字转换成中文数字
* @param {} num 
*/
function toChinesNum(num){
    let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
    return changeNum[num];
}

function isCardNo(card) 
{ 
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
  if(reg.test(card) === false) 
  { 
    return false; 
  } 
}

var addGuestLabel = Ext.create('Ext.form.Label',{
    xtype:'label',
    html: '添加下一位客人信息',
    width:117,
    id:'addGuestLabel',
    margin:'5 0 0 970',
    style:"text-decoration: underline;color:#a5a5a5;",
});

var deleteGuestLabel = Ext.create('Ext.form.Label',{
    xtype:'label',
    html: '删除',
    width:31,
    hidden:true,
    id:'deleteGuestLabel',
    margin:'5 0 0 921',
    style:"text-decoration: underline;color:#a5a5a5;",
});

deleteGuestLabel.addListener("click", function (label) {
    let addGuestFormPanel = Ext.getCmp('addGuestPanel');  //let命令，用来声明局部变量
    let lastFiledSetIndex = addGuestFormPanel.items.length - 3 ;  //最后一个filedSet的索引
    addGuestFormPanel.remove(lastFiledSetIndex-1);
    if(lastFiledSetIndex-1 == 1){
        deleteGuestLabel.setHidden(true);
        addGuestLabel.setMargin('5 0 0 970');
    }
},null,{ element: 'el' });


/**
 *  给 添加下一位客人信息 添加点击事件
 */
addGuestLabel.addListener("click", function () {
        
    let addGuestFormPanel = Ext.getCmp('addGuestPanel');  //let命令，用来声明局部变量
    let lastFiledSetIndex = addGuestFormPanel.items.length - 3 ;  //最后一个filedSet的索引

    let name = addGuestFormPanel.items.get(lastFiledSetIndex-1).name;
    let arr = name.split("_");
    let oldNum = parseInt(arr[1]);
    let num = oldNum+1;
    if(num > 4){
        alert("一次性只能添加4位客人信息！");
        return;
    }
    let title = toChinesNum(num);
    let addGuestFiledSetTitle = "第"+title+"个客人信息";
    let addGuestFiledSetName = "guestfieldset_"+num
    let addGuestFiledSet = {
        xtype: 'fieldset',
        title: addGuestFiledSetTitle,
        name:addGuestFiledSetName,
        collapsible: true,
        colmunWidth:1,
        width:1000, 
        margin:'0 0 0 90',
        defaults: {
            labelWidth: 90,
            layout: 'hbox'
        }, 
        items:[{
            xtype: 'form', 
            width:530,
            height:300,
            reference: 'firstForm',
            style:{
                float:'right',
                backgroundColor:'#f6f6f6'
            },
            items:[{
                    xtype:'image',
                    src: 'classic/resources/images/uploadPhoto.png',
                    width: 250,
                    height: 250,
                    style:{
                        border:'1px solid black'
                    }
                },
                {
                    xtype: 'fileuploadfield', // Same as filefield above
                    buttonOnly: true,
                    hideLabel: true,
                    name:'file',
                    buttonConfig: {
                        text : '拍摄照片',
                    },
                    listeners: {
                        change: function(field, filePath){  //点击upload后开始上传图片
                          
                           let form = field.up('form');
                           form.getForm().submit({       
                                url:'guest/uploadPhoto',
                                method : 'POST',
                                waitMsg: '正在上传，请耐心等待....',
                                success: function(form, action){  
                                    console.log(action);  
                                    Ext.Msg.alert('Success', action.result.map.msg,function(){
                                        form.owner.items.items[0].setSrc(action.result.map.src);    
                                    });       
                                }, 
                                failure: function(form, action){
                                    Ext.Msg.alert('Error', action.result.msg);
                                }
                            });
                
                        }
                    },
                    
                }
            ]
        },
            {
                xtype:'textfield',
                fieldLabel: '身份证号',
                name: 'idCard',
                allowBlank: false,
                width:400,
                triggers:{
                    bar: {
                        cls: 'fa-refresh' ,
                        width:20,
                        handler: function(idcard) {
                           
                            let cardNumber = idcard.value; 
                            if (cardNumber == '' || cardNumber == null) {
                                alert('请输入身份证号');
                                return;
                            } else {
                                if (isCardNo(cardNumber) == false) {
                                    alert('身份证输入不合法');
                                    return;
                                }else {
                                    let thisFieldSet = idcard.up('fieldset');
                                    let thisFieldSetName = thisFieldSet.name;
                                    console.log(thisFieldSetName);
                                    let thisArr = thisFieldSetName.split("_");
                                    let thisIndex = parseInt(thisArr[1])-1;
                                    console.log(thisIndex);
                                    while(thisIndex > 0){  //最多检验到第一个fieldset
                                        let FrontfieldSet = addGuestFormPanel.items.get(thisIndex-1); //上一个fieldset
                                        console.log(FrontfieldSet);
                                        let frontIdCard = FrontfieldSet.items.get(1).value; //取到上一个fieldSet的身份证号，判断是否相同
                                        thisIndex--;
                                        if(cardNumber == frontIdCard){
                                            alert("身份证号重复！请核对后重新输入！");
                                            return;
                                        }
                                    }
                                    alert(cardNumber);
                                    Ext.Ajax.request({
                                        url:'guest/findGuestByIdCard', 
                                        params:{'cardNumber':cardNumber}, 
                                        method:'Get', success:function(result) {
                                            loadGuestInfo(idcard, result);
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            },{
                xtype:'textfield',
                fieldLabel: '真实姓名',
                name: 'realName',
                allowBlank: false, //指定false以验证值的长度必须 > 0
                width:400,
                
            },{
                xtype:'textfield',
                fieldLabel: '户口所在地',
                name: 'address',
                allowBlank: false,
                width:400
            },{
                xtype:'textfield',
                fieldLabel: '手机号码',
                name: 'phone',
                allowBlank: false,
                width:400 
            },{
                xtype:'combobox',
                fieldLabel: '性别', 
                store: genderType,
                displayField: 'name', //serviceType中要显示的字段
                valueField: 'abbr', //后台读取到的字段
                editable:false, //是否可编辑
                emptyText : '请选择性别',
                width:400
            },{
                xtype:'textfield',
                fieldLabel: '客户状态',
                name: 'state',  
                allowBlank: false,
                width:400 
            },{
                xtype: 'datefield',
                fieldLabel: '注册时间',
                name: 'registerTime',
                readOnly:true,
                format : 'Y-m-d',//日期格式  
                value: new Date() , // defaults to today
                width:400 
            }
        ]
    }
    var addGuestFormPanelHeight = addGuestFormPanel.getHeight();
    addGuestFormPanel.setHeight(addGuestFormPanelHeight+352);
    addGuestFormPanel.insert(oldNum,addGuestFiledSet);
    deleteGuestLabel.setHidden(false);
    addGuestLabel.setMargin('5 0 0 20');
    
    console.log(lastFiledSetIndex);
    
},null,{ element: 'el' });


function loadGuestInfo(idcard,result){

    let fatherFiledSet = idcard.up('fieldset');

    if(result.responseText == null || result.responseText == ""){
        alert("这是酒店的新用户");
        fatherFiledSet.items.get(5).setValue("临时客人");
    }else{
        let resultArray = Ext.decode(result.responseText); //得到我们需要的数组
        console.log(resultArray);
        fatherFiledSet.items.get(2).setValue(resultArray['realName']);
        fatherFiledSet.items.get(3).setValue(resultArray['address']);
        fatherFiledSet.items.get(4).setValue(resultArray['phone']);
        if(resultArray['gender'] == "MALE"){
            fatherFiledSet.items.get(5).setValue("男性");
        }else{
            fatherFiledSet.items.get(5).setValue("女性");
        }
        //CASUAL,MEMBER,STARMEMBER,BLACKLIST
        if(resultArray['guestState'] == "STARMEMBER"){
            fatherFiledSet.items.get(6).setValue("星标会员");
        }else if(resultArray['guestState'] == "MEMBER"){
            fatherFiledSet.items.get(6).setValue("普通会员");
        }else if(resultArray['guestState'] == "BLACKLIST"){
            fatherFiledSet.items.get(6).setValue("黑名单");
        }else if(resultArray['guestState'] == "CASUAL"){
            fatherFiledSet.items.get(6).setValue("临时客人");
        }
        var registerDate = resultArray['registerTime'].substr(0,10);
        fatherFiledSet.items.get(7).setValue(registerDate);
    }

}


Ext.define('Admin.view.guest.addguest.AddGuestPanel', {
extend: 'Ext.form.Panel',
xtype: 'addGuestPanel',
id:'addGuestPanel',

height:700,   //必须设置高，否则无法使用border布局
title:'客人信息录入',
layout:'column',
items:[
    {
        xtype: 'fieldset',
        title: '第一个客人信息',
        name:'guestfieldset_1',
        // collapsed: true
        collapsible: true,
        colmunWidth:1,
        width:1000, 
        margin:'0 0 0 90',
        defaults: {
            labelWidth: 90,
            layout: 'hbox'
        }, 
        items:[
            {
                xtype: 'form', 
                width:530,
                height:300,
                reference: 'firstForm',
                style:{
                    float:'right',
                    backgroundColor:'#f6f6f6'
                },
                items:[{
                        xtype:'image',
                        src: 'classic/resources/images/uploadPhoto.png',
                        width: 250,
                        height: 250,
                        style:{
                            border:'1px solid black'
                        }
                    },
                    {
                        xtype: 'fileuploadfield', // Same as filefield above
                        buttonOnly: true,
                        hideLabel: true,
                        name:'file',
                        buttonConfig: {
                            text : '拍摄照片',
                        },
                        listeners: {
                            change: function(field, filePath){  //点击upload后开始上传图片
                              
                               let form = field.up('form');
                               form.getForm().submit({       
                                    url:'guest/uploadPhoto',
                                    method : 'POST',
                                    waitMsg: '正在上传，请耐心等待....',
                                    success: function(form, action){  
                                        console.log(action);  
                                        Ext.Msg.alert('Success', action.result.map.msg,function(){
                                            form.owner.items.items[0].setSrc(action.result.map.src);    
                                        });       
                                    }, 
                                    failure: function(form, action){
                                        Ext.Msg.alert('Error', action.result.msg);
                                    }
                                });
                    
                            }
                        },
                        
                    }
                ]
            },
            {
                xtype:'textfield',
                fieldLabel: '身份证号',
                name: 'idCard',
                allowBlank: false,
                width:400,
                triggers:{
                    bar: {
                        cls: 'fa-refresh' ,
                        width:20,
                        handler: function(idcard) {
                            var cardNumber = idcard.value;
                            if(cardNumber == "" || cardNumber == null){
                                alert("请输入身份证号");
                                return;
                            }else {
                               if(isCardNo(cardNumber) == false){
                                    alert("身份证输入不合法"); 
                                    return ;
                               }else{  //ajax进去后台查询
                                    alert(cardNumber);
                                    Ext.Ajax.request({			
                                        url : 'guest/findGuestByIdCard',
                                        //从数据库中请求数据，动态获取items中的数据
                                        params : {
                                            'cardNumber':cardNumber,
                                        },			
                                        method : 'Get',			
                                        success : function(result) {
                                            loadGuestInfo(idcard,result);
                                        }
                                    }); 
                               }
                            }
                        }
                    }
                }
            },{
                xtype:'textfield',
                fieldLabel: '真实姓名',
                name: 'realName',
                allowBlank: false, //指定false以验证值的长度必须 > 0
                width:400,
                
            },{
                xtype:'textfield',
                fieldLabel: '户口所在地',
                name: 'address',
                allowBlank: false,
                width:400
            },{
                xtype:'textfield',
                fieldLabel: '手机号码',
                name: 'phone',
                allowBlank: false,
                width:400 
            },{
                xtype:'combobox',
                fieldLabel: '性别', 
                store: genderType,
                displayField: 'name', //serviceType中要显示的字段
                valueField: 'abbr', //后台读取到的字段
                editable:false, //是否可编辑
                emptyText : '请选择性别',
                width:400
            },{
                xtype:'textfield',
                fieldLabel: '客户状态',
                name: 'state',  
                allowBlank: false,
                readOnly:true,
                width:400 
            },{
                xtype: 'datefield',
                fieldLabel: '注册时间',
                name: 'registerTime',
                readOnly:true,
                format : 'Y-m-d',//日期格式  
                value: new Date() , // defaults to today
                width:400 
            }
        ]
    },{
        xtype:deleteGuestLabel
    },{
        xtype:addGuestLabel
    },
    {     xtype: 'button', 
          text: '确认录入' ,
          width:100,
          height:30,
          margin:'0 0 0 90',
          listeners:{
                'click':function(btn){
                    let guestInfoAddPanel = btn.up('form');
                    let guestNumber = guestInfoAddPanel.items.length - 3;
                    var guestList = new Array();
                    let index = 0;
                    while(guestNumber > 0){
                        let guestInfor = guestInfoAddPanel.items.get(guestNumber - 1);
                        let data = {
                          'idCard':guestInfor.items.items[1].value,
                          'realName':guestInfor.items.items[2].value,
                          'address':guestInfor.items.items[3].value,
                          'phone':guestInfor.items.items[4].value,
                          'gender':guestInfor.items.items[5].value,
                          'state':guestInfor.items.items[6].value,
                          'registerTime':guestInfor.items.items[7].value,
                          'photoUrl':guestInfor.items.items[0].items.items[0].src
                        };
                        guestList[index] = data;
                        guestNumber--;
                        index++;
                    }
                    for (let i = 0; i < guestList.length; i++) {
                        for (let j = i+1; j < guestList.length; j++) {
                            if(guestList[i]['idCard'] == guestList[j]['idCard']){
                                alert("身份证号码:\""+guestList[j]['idCard']+"\"存在重复,请重新确认是否输入错误!");
                                return;
                            }
                        }
                    }
                    Ext.Ajax.request({			
                        url : 'guest/saveGuest',
                        //从数据库中请求数据，动态获取items中的数据			
                        method : 'Get',		
                        params:{
                            'guestList':JSON.stringify(guestList)
                        },
                        success : function(result) {
                            if(result.responseText == "success"){
                                Ext.MessageBox.alert("录入结果","信息录入成功！请安排客房！",function(){
                                    let cleanGuestNumber = guestInfoAddPanel.items.length - 3;
                                    while(cleanGuestNumber > 0){
                                        let cleanguestInfor = guestInfoAddPanel.items.get(guestNumber - 1);
                                        cleanguestInfor.items.items[1].setValue(" "),
                                        cleanguestInfor.items.items[2].setValue(" "),
                                        cleanguestInfor.items.items[3].setValue(" "),
                                        cleanguestInfor.items.items[4].setValue(" "),
                                        cleanguestInfor.items.items[5].setValue(" "),
                                        cleanguestInfor.items.items[6].setValue(" "),
                                        cleanguestInfor.items.items[0].items.items[0].setSrc("classic/resources/images/uploadPhoto.png");
                                        guestNumber--;
                                    }
                                   
                                    document.location.href="#emptyRoom";
                                });
                            }else{
                                Ext.MessageBox.alert("录入结果","信息录入失败！请重新录入！",function(){
                                    //code...
                                    //关闭后执行的动作
                                });
                            }
                        }
                    });
                }
          }
    }
   
],

});


