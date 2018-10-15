Ext.define('Admin.view.finance.cost.inStorage.task.ContactSupplier',{
	extend:'Ext.form.Panel',
	alias:'widget.contactSupplier',
	requires:[
		'Ext.button.Button',
        'Ext.form.RadioGroup',
        'Ext.form.field.*'
	],
	bodyPadding: 10,
    bodyBorder: true,
    defaults: {
        anchor: '100%'
    },
    fieldDefaults: {
        labelAlign: 'left',
        msgTarget: 'none',
        invalidCls: '' 
    },
    items:[{
    	xtype:'textfield',
    	name:'taskId',
    	fieldLabel:'任务id',
    	hidden:true,
    	readOnly:true
    },{
        xtype:'textfield',
        name:'amountMoney',
        fieldLabel:'总金额',
        value:9999,
        hidden:true,
        readOnly:true
    },{
    	xtype:'radiogroup',
    	fieldLabel:'联系供货方',
    	defaults:{
    		flex:1
    	},
    	items:[]
    },{
    	xtype:'textareafield',
    	grow:true,
    	name:'logisticstBackReason',
    	fieldLabel:'驳回理由',
    	anchor:'100%'
    }],

    bbar:[{
    	xtype:'button',
    	ui:'soft-green',
    	text:'提交',
    	handler:'contactSupplierSubmitButton'
    },{
    	xtype:'button',
    	ui:'gray',
    	text:'取消',
    	handler:function(btn){
    		var win = btn.up('window');
    		if(win){
    			win.close();
    		}
    	}
    }]
});
