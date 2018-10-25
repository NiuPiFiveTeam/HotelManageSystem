Ext.define('Admin.view.employ.AddEmpPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'addEmpPanel',
    //controller: 'empTabController',
    id:'addEmpPanel',

    padding:'20 20 0 150',
    scrollable:true,
    width: 1000,
    autoHeight : true,
    region: "center",

    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 115,
        //labelAlign: 'top',
        msgTarget: 'side'
    },

    items: [{
        xtype: 'fieldset',
        title: '工作信息',
        defaultType: 'textfield',
        layout: 'hbox',
        defaults: {
            anchor: '100%',
            componentCls: ""
        },
        items: [{
            xtype: 'container',
            layout: 'vbox',
            defaultType: 'textfield',
            margin: '0 0 0 0',

            items: [{
                fieldLabel: '员工姓名',
                name: 'empName',
                allowBlank: true
            }, {
                xtype : 'combobox',
                fieldLabel: '部门',
                emptyText: '请选部门',
                name: 'deptName',
                //store: Stores,
                store : new Ext.data.ArrayStore({
                    fields: [
                        {type: 'string',name: 'deptName'},
                    ],
                    
                    proxy: {
                    type: 'rest',
                    url: '/dept',
                    reader:{
                        type:'json',
                        rootProperty:'content',  //对应后台返回的结果集名称
                        totalProperty: 'totalElements'//分页需要知道总记录数
                    },
                    writer:{
                        type:'json'
                    },
                    simpleSortMode: true
                    },

                    autoSync: true,
                    remoteSort: true,//全局排序
                    pageSize: 20,
                    sorters: {
                        direction: 'DESC',
                        property: 'dept_id'
                    }



                }),
                valueField : 'deptName',
                displayField: 'deptName',
                forceSelection:true,                
                editable : false,
                allowBlank: true

                
            }, {
                xtype: 'combobox',
                fieldLabel: '性别',
                name: 'empSex',
                store : new Ext.data.ArrayStore({
                    fields : ['empSexid', 'empSex'],
                    data : [["1", '男'], ["2", '女']]
                    }),
                valueField : 'empSex',
                displayField: 'empSex',
                editable : false,
                emptyText: '请选性别',
                queryMode: 'local',    

                allowBlank: true
            }, {
                xtype : 'combobox',
                fieldLabel: '类别',
                name: 'jobtype',
                store : new Ext.data.ArrayStore({
                    fields : ['jobtypeid', 'jobtype'],
                    data : [["1", '试用工'], ["2", '正式工']]
                    }),
              
                valueField : 'jobtype',
                displayField: 'jobtype',
                forceSelection:true,                
                editable : false,

                allowBlank: true
            }, {
                xtype:'datefield',
                format:'Y-m-d',
                fieldLabel: '离职时间',
                name: 'endDate',
                //labelWidth: 100,
                allowBlank: true
            }]
            
        },{
            xtype: 'container',
            layout: 'vbox',
            defaultType: 'textfield',
            margin: '0 0 5 0',

            items: [{
                fieldLabel: '员工编号',
                name: 'empNo',
                //labelWidth: 100,
                allowBlank: true
            }, {
                fieldLabel: '员工账户',
                name: 'userName',
                //labelWidth: 100,
                allowBlank: true
            }, {
                xtype : 'combobox',
                fieldLabel: '职称',
                name: 'groupName',
                emptyText: '请选职称',
                store : new Ext.data.ArrayStore({
                    fields: [
                        {type: 'string',name: 'groupName'},
                    ],
                    
                    proxy: {
                    type: 'rest',
                    url: '/group',
                    reader:{
                        type:'json',
                        rootProperty:'content',  //对应后台返回的结果集名称
                        totalProperty: 'totalElements'//分页需要知道总记录数
                    },
                    writer:{
                        type:'json'
                    },
                    simpleSortMode: true
                    },

                    autoSync: true,
                    remoteSort: true,//全局排序
                    pageSize: 20,
                    sorters: {
                        direction: 'DESC',
                        property: 'groupTable_id'
                    }



                }),
                valueField : 'groupName',
                displayField: 'groupName',
                forceSelection:true,                
                editable : false,
                //labelWidth: 100,
                allowBlank: true
            }, {
                xtype:'datefield',
                format:'Y-m-d',
                fieldLabel: '入职日期',
                name: 'entryDate',
                //labelWidth: 100,
                allowBlank: true
            }, {
                fieldLabel: '员工ID',
                name: 'emp_id',
                hidden:true,
                //labelWidth: 100,
                allowBlank: false
            }, {
                fieldLabel: '证件照',
                name: 'empImage',
                hidden:true,
                //labelWidth: 100,
                allowBlank: true
            }, {
                fieldLabel: '初始密码',
                name: 'password',
                value:'8888',
                //labelWidth: 100,
                emptyText: '默认8888',
                allowBlank: true
            }]
        } ,{
            xtype: 'container',
            layout: 'vbox',
            defaultType: 'textfield',
            margin: '0 0 5 0',
            padding: '0 0 0 50',
            items:[{
                xtype: 'image',
                id: 'imageId',
                name:"empImage",
                alt:'电子照',
                src: 'resources/images/user-profile/1.png',
                height: 160,
                width: 140 
                },{
                xtype:'button',
                text:'上传图片',
                width: 140,
                handler: 'onOpenPhotoButton'
            }]
             
        }   
        ]}, {

        xtype: 'fieldset',
        title: '个人信息',
        defaultType: 'textfield',
        layout: 'anchor',
        defaults: {
            anchor: '100%',
            componentCls: ""
        },
        items: [{
            xtype: 'container',
            layout: 'hbox',
            defaultType: 'textfield',
            margin: '0 0 5 0',

            items: [{
                fieldLabel: '身份证号码',
                name: 'idcard',
                allowBlank: true

            }, {
                fieldLabel: '电话号码',
                name: 'tel',
                allowBlank: true
                
            }]
        },{
            fieldLabel: '家庭住址',
            name: 'address',
            allowBlank: true
        },{
            xtype:'textareafield',
            fieldLabel: '员工简介',
            name: 'introduce',
            allowBlank: true
        }]    
        }
 
    ],

    buttons: [{
        xtype:'button',
        text: '添加',
        handler:function()  
            {  
                // if(!Ext.getCmp('addEmpPanel').getForm().isValid()) 
                //     return;  
                var record = Ext.create('Admin.model.employ.EmployModel');
                var values =Ext.getCmp('addEmpPanel').getForm().getValues();//获取form数据
                record.set(values);
                record.save();
                Ext.data.StoreManager.lookup('EmployStoreid').load();
                Ext.MessageBox.alert('添加成功');
                Ext.getCmp('addEmpPanel').getForm().reset();
                //Ext.getCmp('AddEmpWindow').close(); 
        }
    },{
        xtype:'button',
        text: '重置',
        handler:function(){  
            Ext.getCmp('addEmpPanel').getForm().reset();  
        } 
    }]
});