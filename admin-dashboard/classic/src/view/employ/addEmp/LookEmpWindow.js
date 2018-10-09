Ext.QuickTips.init();
Ext.define('Admin.view.employ.addEmp.LookEmpWindow', {
    extend: 'Ext.window.Window',
    xtype: 'lookEmpWindow',
    
    reference: 'lookEmpwindow',
    
    id:'lookEmpwindow',
    title: '查看员工信息',
    border: true,
    layout: 'fit',
    plain: true,
    height:600,
    width:550,
    layout: {
            type: 'hbox',
            align: 'stretch'
        },
    items: [{
        xtype: 'form',
        reference: 'lookEmpForm',
        id: 'lookEmpForm',
        defaultType: 'textfield',
        margin: '0 5 0 30',
        bodyPadding: 5,

        defaults: {
            anchor: '100%'
        },
        labelWidth:200,

        items: [
                { allowBlank:false,editable:false,fieldLabel:'员工ID'  ,hidden: true , name:'emp_id'},
                { allowBlank:false,editable : false,fieldLabel: '员工姓名', name: 'empName' },
                { allowBlank:false,editable : false,fieldLabel: '员工用户名', name: 'userName' },
                { allowBlank:false,editable : false,fieldLabel: '员工密码',hidden: true , name: 'password' },
                {fieldLabel: '性别', editable : false,displayField: 'empSex',name:'empSex'},
                { allowBlank:false,editable : false, fieldLabel: '身份证号码', name: 'idcard'},
                { allowBlank:false,editable : false, fieldLabel: '籍贯', name: 'address'},
                {xtype : '',editable : false,  name:'deptName',fieldLabel:'部门'},
               { allowBlank:false, editable : false,fieldLabel: '职称', name: 'groupName'},
               { allowBlank:false, editable : false,fieldLabel: '类别', name: 'jobtype'},
                { allowBlank:false, editable : false,fieldLabel: '联系方式', name: 'tel'},
                { xtype:'datefield',editable : false,format: 'Y-m-d',allowBlank:false, fieldLabel: '入职时间', name: 'entryDate'},
                { xtype:'datefield',editable : false,format: 'Y-m-d',allowBlank:false, fieldLabel: '离职时间', name: 'endDate'},
                { xtype: 'textareafield', editable : false,name: 'introduce',fieldLabel: '员工简介'} 
               ]
    },{

            height: 650,
            width: 300,
            padding: '100 0 0 60',
            items:[{
                 
                xtype: 'image', name: 'profile_pic',
                id: 'imagelookId',
                src: '',
                }]
    }],

    buttons: [{
        text: '退出',
        handler:function(){  
            Ext.getCmp('lookEmpwindow').close();  
            }  
    }]
});