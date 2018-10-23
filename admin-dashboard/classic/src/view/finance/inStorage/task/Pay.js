Ext.define('Admin.view.finance.inStorage.task.Pay',{
	extend:'Ext.form.Panel',
	alias:'widget.pay',
	requires:[
		'Ext.button.Button',
        'Ext.form.RadioGroup',
        'Ext.form.field.*'
	],
	width: 400,
    height: 255,
    bodyPadding: 10,

    items:[{
    	//使用邮箱验证
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
