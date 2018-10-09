
Ext.define('Admin.view.employ.addEmp.AddEmpWindow', {
    extend: 'Ext.window.Window',
    xtype: 'form-vboxlayout',
    bodyStyle:'background-color:#D4E1F2;',
    style:'margin:20px 5px 15px 20px;background:#D4E1F2;',
    bodyPadding: 10,
    scrollable:true,
    reference: 'AddEmpWindow',
	id: 'AddEmpWindow',
    defaultFocus: 'authdialog',
    title:'添加员工',
    //defaultType: 'panel',
    requires: [
        //'Admin.view.authentication.Dialog',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text'
    ],
    defaultFocus: 'authdialog',
    layout: {
        type: 'hbox'
    },

    defaults: {
        border: true
    },
    
    items: [
        {
        xtype: 'form',
        reference: 'addEmpform',
        id: 'addEmpform',
        //title: '填写员工信息',
        defaultType: 'textfield',
        fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 100,
        msgTarget: 'side'
        },
        defaults: {
            anchor: '100%'
        },
        height: 650,
        width: 600,
        margin: '0 5 0 30',
        items: [
                { allowBlank:true,hidden:true, fieldLabel: 'emp_id', name: 'emp_id'},
                { allowBlank:false,fieldLabel: '员工姓名', name: 'empName', emptyText: '员工姓名' },
                { allowBlank:false,fieldLabel: '员工编号', name: 'empNo', emptyText: '员工编号' },
                { allowBlank:false,fieldLabel: '员工登入账户', name: 'userName', emptyText: '员工登入账户' },
                { allowBlank:false,fieldLabel: '员工密码', name: 'password',inputType:'password'},
                {
                    //下拉列表框
                    xtype: 'combobox', //9
                    fieldLabel: '性别',
                    displayField: 'empSex',
                    name: 'empSex',
                    store: Ext.create('Ext.data.Store', {
                    fields: [
                    {type: 'string', name: 'empSex'}
                    ],
                    data: [
                    {"empSex":"男"},
                    {"empSex":"女"}
                    ]}),
                    editable : false,
                    emptyText: '请选性别',
                    queryMode: 'local'
                    },
                { allowBlank:false, fieldLabel: '身份证号码', name: 'idcard', emptyText: 'user idcard'},
                { xtype:'filefield',id: 'upload', name: 'empImage',fieldLabel: '证件照',emptyText: 'Select an image',
                        listeners : {
                            'render' : function() {
                             Ext.getCmp('upload').on('change',function(field, newValue, oldValue) {
                            var file = field.fileInputEl.dom.files.item(0);
                            var fileReader = new FileReader('file://'+newValue);
                            fileReader.readAsDataURL(file);
                            fileReader.onload=function(e){
                            Ext.getCmp('imageId').setSrc(e.target.result);
                        }
                });
            }
        }
                },
                { allowBlank:false, fieldLabel: '籍贯', name: 'address', emptyText: '住址'},
                {
                xtype : 'combobox',            
                labelWidth : 100,
                labelAlign : 'right',    
                width: 300,            
                fieldLabel:'选择部门',
                name:'deptName',
                store: Stores,
                valueField : 'deptName',
                displayField: 'deptName',
                forceSelection:true,                
                editable : false,
                emptyText: '请选部门'
               },
               { xtype : 'combobox',allowBlank:false, fieldLabel: '类别', name: 'jobtype',
                    store : new Ext.data.ArrayStore({
                    fields : ['jobtypeid', 'jobtype'],
                    data : [["1", '试用工'], ["2", '正式工']]
                    }),
              
                valueField : 'jobtype',
                displayField: 'jobtype',
                forceSelection:true,                
                editable : false,
                emptyText: '请选类别'
                },
                {
                xtype : 'combobox',            
                labelWidth : 100,
                labelAlign : 'right',    
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
                { allowBlank:false, fieldLabel: '联系方式', name: 'tel', emptyText: '联系方式'},
                { xtype:'datefield',format:'Y-m-d',allowBlank:false, fieldLabel: '入职时间', name: 'entryDate', emptyText: '2018-09-13'},
                { xtype: 'textareafield', name: 'introduce',fieldLabel: '员工简介',value: '输入文本框'}
                
                
            ],
            buttons:[   
        {  
            xtype:'button',  
            text:'重设',  
            handler:function(){  
            Ext.getCmp('addEmpform').getForm().reset();  
            }  
        },{  
            xtype:'button',  
            text:'添加',  
            handler:function()  
            {  
                if(!Ext.getCmp('addEmpform').getForm().isValid()) return;  
                //Ext.getCmp('addEmpform').submit();
                var record = Ext.create('Admin.model.employ.EmployModel');
                var values =Ext.getCmp('addEmpform').getForm().getValues();//获取form数据
                record.set(values);
                record.save();
                Ext.data.StoreManager.lookup('EmployStoreid').load();
                Ext.MessageBox.alert(
                '添加成功'
                
            );
            Ext.getCmp('addEmpform').getForm().reset();
			Ext.getCmp('AddEmpWindow').close();	
            }  
        }  
        ] 
       }, {
            //title: '图片预览',
            height: 550,
            width: 300,
            items:[{

                xtype: 'image',
                padding: '100 0 0 80',
                id: 'imageId',
                src: 'resources/images/user-profile/1.png',
                height: 280,
                width: 240
            }]

        
        }
    ]
});