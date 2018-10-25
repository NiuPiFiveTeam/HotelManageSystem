Ext.define('Admin.view.bcardApprove.task.AttencemodifyApply', {
    extend: 'Ext.form.Panel',
    alias: 'widget.attencemodifyApply',
    controller: 'bcardApproveViewController',
    requires: [
        'Ext.button.Button',
        'Ext.form.RadioGroup',
        'Ext.form.field.*'
    ],
    bodyPadding: 5,
    bodyBorder: true,
    defaults: {
        anchor: '100%'
    },
    fieldDefaults: {
        labelAlign: 'left',
        msgTarget: 'none',
        invalidCls: '' 
    },
    items: [{
		xtype: 'radiogroup',
		fieldLabel: '重新申请',
		items: [{
			name: 'attencereApply',
			inputValue: true,
			boxLabel: '是',
			checked: true
		}, {
			name: 'attencereApply',
			inputValue: false,
			boxLabel: '否'
		}]
	    },{
	    	xtype: 'textfield',
			name: 'taskId',
			fieldLabel: '任务ID',
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
            valueField: 'name',
            allowBlank: false
        },{
			xtype: 'datefield',
			fieldLabel: '补卡上班时间',
			format: 'Y/m/d H:i:s', 
			name: 'ontudytime'
		},{
			xtype: 'datefield',
			fieldLabel: '补卡下班时间',
			format: 'Y/m/d H:i:s', 
			name: 'offdutytime'
		},{
            xtype: 'datefield',
            fieldLabel: '上班日期',
            format: 'Y/m/d H:i:s', 
            name: 'workDate'
        },{
			xtype     : 'textareafield',
			grow      : true,
			name      : 'reason',
			fieldLabel: '补卡内容和理由',
			anchor    : '100%'
		}],

   	bbar: [{
		xtype: 'button',
		ui: 'soft-green',
		text: '提交'	,
		handler: 'onClickModifyApplyFormSubmitButton'
	},{
		xtype: 'button',
		ui: 'gray',
		text: '取消',
		handler:function(btn){
			var win = btn.up('window');
	        if (win) {
	            win.close();
	        }
		}
	}]
});
