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
        items:[
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
                        handler: function() {
                            console.log('foo trigger clicked');
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
                xtype:addGuestLabel
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
                                        url : 'guest/findGuestByIdcard',
                                        //从数据库中请求数据，动态获取items中的数据
                                        params : {
                                            'cardNumber':cardNumber,
                                        },			
                                        method : 'Get',			
                                        success : function(result) {
                                            
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
                'click':function(){
                    alert(123);
                }
          }
    }
   
],

});


