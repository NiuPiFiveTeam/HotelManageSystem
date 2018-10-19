Ext.define('Admin.view.travelApprove.task.EmployModifyApply', {
    extend: 'Ext.form.Panel',
    alias: 'widget.employModifyApply',
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
		fieldLabel: '重新派发',
		items: [{
			name: 'LeaderModify',
			inputValue: true,
			boxLabel: '是',
			checked: true
		}, {
			name: 'LeaderModify',
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
		xtype: 'datefield',
		fieldLabel: '请假开始时间',
		format: 'Y/m/d H:i:s', 
		name: 'traStartTime'
	},{
		xtype: 'datefield',
		fieldLabel: '请假结束时间',
		format: 'Y/m/d H:i:s', 
		name: 'traEndTime'
	},{
		xtype : 'textareafield',
		grow: true,
		name: 'process',
		fieldLabel: '出差原因',
		anchor: '100%'
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
