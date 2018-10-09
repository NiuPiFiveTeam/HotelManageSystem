Ext.QuickTips.init();
Ext.define('Admin.view.employ.addEmp.EditEmpPanel', {
    extend: 'Ext.window.Window',
    xtype: 'form-vboxlayout',
    
    reference: 'EditEmpwindow',
    

    title: '修改员工信息',
    border: true,
    layout: 'fit',
    plain: true,
    height:600,
    width:600,
    layout: {
            type: 'hbox',
            align: 'stretch'
        },
    items: [{
        xtype: 'form',
        reference: 'EditEmpForm',
        defaultType: 'textfield',
        margin: '0 5 0 30',
        bodyPadding: 5,

        defaults: {
            anchor: '100%'
        },
        labelWidth:200,

        items: [
                { allowBlank:false,fieldLabel:'员工ID' ,hidden: true , name:'emp_id'},
                { allowBlank:false,fieldLabel: '员工姓名', name: 'empName', emptyText: '员工姓名' },
                { allowBlank:false,fieldLabel: '员工编号', name: 'empNo', emptyText: '员工编号' },
                { allowBlank:false,fieldLabel: '员工登入账户', name: 'userName', emptyText: '员工登入账户' },
                { allowBlank:false,fieldLabel: '员工登入密码', name: 'password', emptyText: '员工登入密码' },
                {
                    //下拉列表框
                    xtype: 'combobox', //9
                    fieldLabel: '性别',
                    displayField: 'empSex',
                    name:'empSex',
                    store: Ext.create('Ext.data.Store', {
                    fields: [
                    {type: 'string', name: 'empSex'}
                    ],
                    data: [
                    {"empSex":"男"},
                    {"empSex":"女"}
                    
                    ]
                    }),
                    value:'男',
                    editable : false,
                    emptyText: '请选性别',
                    queryMode: 'local'
                    },
                { allowBlank:false, fieldLabel: '身份证号码', name: 'idcard', emptyText: 'user idcard'},
                { xtype:'filefield',id: 'uploadEdit', name: 'empImage',fieldLabel: '证件照',
                        listeners : {
                            'render' : function() {
                             Ext.getCmp('uploadEdit').on('change',function(field, newValue, oldValue) {
                            var file = field.fileInputEl.dom.files.item(0);
                            var fileReader = new FileReader('file://'+newValue);
                            fileReader.readAsDataURL(file);
                            fileReader.onload=function(e){
                            Ext.getCmp('imageEditId').setSrc(e.target.result);
                        }
                });
            }
        }
                },
                { allowBlank:false, fieldLabel: '籍贯', name: 'address', emptyText: '住址'},
                {
                xtype : 'combobox',            
                name:'deptName',           
                fieldLabel:'选择部门',
                store: Stores,
              
                valueField : 'deptName',
                displayField: 'deptName',
                forceSelection:true,                
                editable : false,
                emptyText: '请选部门',
                value : '服务员'
               },
               {
                xtype : 'combobox',            
                labelWidth : 100,
                labelAlign : '',    
                width: 300,            
                fieldLabel:'选择职称',
                name:'groupName',
                store: rolestore,
                valueField : 'groupName',
                displayField: 'groupName',
                forceSelection:true,                
                editable : false,
                emptyText: '请选职称'
               },
               { allowBlank:false, fieldLabel: '类别', name: 'jobtype'},
                { allowBlank:false, fieldLabel: '联系方式', name: 'tel', emptyText: '联系方式'},
                { xtype:'datefield',format: 'Y-m-d',allowBlank:false, fieldLabel: '入职时间', name: 'entryDate'},
                { xtype:'datefield',format: 'Y-m-d',allowBlank:true, fieldLabel: '离职时间', name: 'endDate'},
                { xtype: 'textareafield', name: 'introduce',fieldLabel: '员工简介',value: '输入文本框'}
                
                
                
               ]
    },{

            height: 650,
            width: 300,
            padding: '100 0 0 60',
            items:[{
                 
                xtype: 'image', name: 'profile_pic',
                id: 'imageEditId',
                src: '',
                }]
    }],

    buttons: [{
        text: '提交',
        handler:'EditEmpFormSubmit'
    },{
        text: '退出',
        handler:'EditEmpFormCancel'
    }]
});