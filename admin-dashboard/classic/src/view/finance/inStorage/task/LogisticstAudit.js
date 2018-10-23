Ext.define('Admin.view.finance.inStorage.task.LogisticstAudit',{
	extend:'Ext.form.Panel',
	alias:'widget.logisticstAudit',
	requires:[
		'Ext.button.Button',
        'Ext.form.RadioGroup',
        'Ext.form.field.*'
	],
    width: 500,
    height: 255,
	bodyPadding: 10,

    items:[{
        xtype: 'fieldset',
        title: '联系供货商',
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },
        items:[{
            name:'taskId',
            fieldLabel:'任务id',
            hidden:true
        },{
            xtype:'radiogroup',
            fieldLabel:'后勤经理审批',
            items:[{
                name:'logisticstManagerPass',
                inputValue:true,
                boxLabel:'同意',
                checked:true
            },{
                name:'logisticstManagerPass',
                inputValue:false,
                boxLabel:'不同意',
            }],
            listeners:{
                'change':function(group, checked){
                    var a = Ext.getCmp('logisticstBackReason');
                    if(checked.logisticstManagerPass == true){
                       a.setDisabled(true);
                    }else if(checked.logisticstManagerPass == false){
                       a.setDisabled(false);
                    }
                }
            }
        },{
            xtype:'textareafield',
            name:'logisticstBackReason',
            id:'logisticstBackReason',
            fieldLabel:'驳回理由',
            anchor:'100%',
            disabled:true
        }]


    }],

    bbar:[{
    	xtype:'button',
    	ui:'soft-green', 
    	text:'提交',
        width:70,
        height:40,
    	handler:'LogisticstFormSubmitButton'
    },{
    	xtype:'button',
    	ui:'gray',
    	text:'取消',
        width:70,
        height:40,
    	handler:function(btn){
    		var win = btn.up('window');
    		if(win){
    			win.close();
    		}
    	}
    }]
});
