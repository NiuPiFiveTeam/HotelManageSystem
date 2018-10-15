Ext.define('Admin.view.finance.cost.inStorage.task.FinanceManagerAudit',{
    extend:'Ext.form.Panel',
    alias:'widget.financeManagerAudit',
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
        fieldLabel:'财务jingli审批',
        defaults:{
            flex:1
        },
        items:[{
            name:'financeManagerPass',
            inputValue:true,
            boxLabel:'财务同意',
            checked:true
        },{       
            name:'financeManagerPass',
            inputValue:false,
            boxLabel:'财务不同意',
        }]
    },{
        xtype:'textareafield',
        grow:true,
        name:'financeBackReason',
        fieldLabel:'驳回理由',
        anchor:'100%'
    }],

    bbar:[{
        xtype:'button',
        ui:'soft-green',
        text:'提交',
        handler:'FinanceManagerFormSubmitButton'
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
