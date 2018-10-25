Ext.define('Admin.view.companyWork.Month.EditWorkPanel', {
    extend: 'Ext.window.Window',
    xtype: 'editWorkPanel',
    alias: 'widget.editWorkPanel',
    reference: 'EditWorkWindow',
    

    title: '修改员工考勤信息',
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
        xtype:'form',
        reference: 'editWorkForm',
        items:[
            {
        xtype: 'fieldset',
        title: '员工信息',
        defaultType: 'textfield',
        margin:'0 200 0 0',
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
                xtype:'displayfield',
                fieldLabel: '部门',
                name: 'deptName',
                allowBlank: true
            }, {
                xtype:'displayfield',
                fieldLabel: '编号',
                name: 'empNo'
            }]
            
        },{
            xtype: 'container',
            layout: 'vbox',
            defaultType: 'textfield',
            margin: '0 0 5 0',

            items: [{
                xtype:'displayfield',
                fieldLabel: '员工姓名',
                name: 'empName',
                //labelWidth: 100,
                allowBlank: true
            },{
            xtype: 'combobox',
            name: 'calendar',
            fieldLabel: '班次',
            //vtype: 'email',
            store: Ext.create('Ext.data.Store', {
                fields: ['value', 'name'],
                data : [
                    {"value":"A", "name":"白班"},
                    {"value":"B", "name":"夜班"},
                    {"value":"C", "name":"加班"}
                ]
            }),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'name',
            allowBlank: false
        }]
        }   
        ]}, {

        xtype: 'fieldset',
        title: '修改考勤',
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
                xtype:'datefield',
                fieldLabel: '上班时间',
                name: 'ontudytime',
                allowBlank: true

            }, {
                xtype:'datefield',
                fieldLabel: '下班时间',
                name: 'offdutytime',
                allowBlank: true
                
            }, {
                
                fieldLabel: '下班时间',
                name: 'workid',
                hidden:true,
                allowBlank: false
                
            }]
        },{
            xtype: 'container',
            layout: 'hbox',
            defaultType: 'textfield',
            margin: '0 0 5 0',
            items: [{
                
                fieldLabel: '基本时长',
                name: 'worktime',
                allowBlank: true,
                renderer:function(value){
                    return value.toFixed(1);
                 }

            }, {
               
                fieldLabel: '加班时长',
                name: 'overtime',
                allowBlank: true,
                renderer:function(value){
                    return value.toFixed(1);
                 }
                
            }]
        },{
        xtype: 'radiogroup',
        fieldLabel: '是否迟到',
        items: [{
            name: 'late',
            inputValue: 1,
            boxLabel: '是',
            checked: true
        }, {
            name: 'late',
            inputValue: 0,
            boxLabel: '否'
        }]
        },{
        xtype: 'radiogroup',
        fieldLabel: '是否早退',
        items: [{
            name: 'leaveEarly',
            inputValue: 1,
            boxLabel: '是',
            checked: true
        }, {
            name: 'leaveEarly',
            inputValue: 0,
            boxLabel: '否'
        }]
        },{
        xtype: 'radiogroup',
        fieldLabel: '是否缺卡',
        items: [{
            name: 'lackCard',
            inputValue: 1,
            boxLabel: '是',
            checked: true
        }, {
            name: 'lackCard',
            inputValue: 0,
            boxLabel: '否'
        }]
        },{
        xtype: 'radiogroup',
        fieldLabel: '是否正常',
        items: [{
            name: 'normal',
            inputValue: 1,
            boxLabel: '是',
            checked: true
        }, {
            name: 'normal',
            inputValue: 0,
            boxLabel: '否'
        }]
        }]    
    }
        ]
    }],

    buttons: [{
        xtype:'button',
        text: '修改',
        handler:'EditWorkFormSubmit'
    },{
        xtype:'button',
        text: '退出',
        handler: function(btn) {
            btn.up('window').close();
        }
    }]
});