Ext.define('Admin.view.finance.cost.inStorage.task.LogisticstAudit',{
	extend:'Ext.form.Panel',
	alias:'widget.logisticstAudit',
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
    	xtype:'radiogroup',
    	fieldLabel:'后勤主管审批',
    	defaults:{
    		flex:1
    	},
    	items:[{
    		name:'logisticstManagerPass',
    		inputValue:true,
    		boxLabel:'后勤同意',
    		checked:true
    	},{
    		name:'logisticstManagerPass',
    		inputValue:false,
    		boxLabel:'后勤不同意',
    	}]
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
    	handler:'LogisticstFormSubmitButton'
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
