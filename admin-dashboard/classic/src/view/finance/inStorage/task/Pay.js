Ext.define('Admin.view.finance.inStorage.task.Pay',{
	extend:'Ext.form.Panel',
	alias:'widget.pay',
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
    }],

    bbar:[{
    	xtype:'button',
    	ui:'soft-green',
    	text:'提交',
    	handler:'paySubmitButton'
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
