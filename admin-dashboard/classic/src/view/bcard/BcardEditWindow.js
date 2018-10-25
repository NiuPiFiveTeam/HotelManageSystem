Ext.define('Admin.view.bcard.BcardEditWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.bcardEditWindow',
    //height: 350,
    minHeight: 350,
    minWidth: 300,
    width: 500,
    scrollable: true,
    title: 'Edit travel Window',
    closable: true,
    constrain: true,
    defaultFocus: 'textfield',
    modal:true,
    layout: 'fit',
	items: [{
        xtype: 'form',
        layout: 'form',
        padding: '10px',
        ariaLabel: 'Enter your name',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'bCardid',
            name:'bCardid',
            hidden: true,
            readOnly: true
        },{
            xtype: 'textfield',
            fieldLabel: 'processStatus',
            name:'processStatus',
            value:'NEW',
            hidden: true,
            readOnly: true
        },{
            xtype: 'textfield',
            name: 'empName',
            fieldLabel: '员工姓名',
            //value:loginUser,
            allowBlank: false
        },{
            xtype: 'textfield',
            name: 'empNo',
            fieldLabel: '员工编号',
            //value:loginUser,
            allowBlank: false
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
            valueField: 'value',
            allowBlank: false
        },{
            xtype: 'datefield',
            fieldLabel: '补卡上班时间',
            format: 'Y-m-d H:i:s', 
            name: 'ontudytime'
        },{
            xtype: 'datefield',
            fieldLabel: '补卡下班时间',
            format: 'Y-m-d H:i:s', 
            name: 'offdutytime'
        },{
            xtype: 'datefield',
            fieldLabel: '上班日期',
            format: 'Y-m-d', 
            name: 'workDate'
        },{
            xtype     : 'textareafield',
            grow      : true,
            name      : 'reason',
            fieldLabel: '出差内容',
            anchor    : '100%'
        }]
    }],
   buttons: ['->',{
        xtype: 'button',
        text: 'Submit',
        handler: 'submitEditForm'
    },{
        xtype: 'button',
        text: 'Close',
        handler: function(btn) {
            btn.up('window').close();
        }
    },'->']
  
});
