Ext.define('Admin.view.finance.inStorage.task.FinanceAudit',{
    extend:'Ext.form.Panel',
    alias:'widget.financeAudit',
    requires:[
        'Ext.button.Button',
        'Ext.form.RadioGroup',
        'Ext.form.field.*'
    ],
    width: 400,
    height: 255,
    bodyPadding: 10,

    items:[{
        xtype: 'fieldset',
        title: '财务经理审批',
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },
        items: [
            {
                name:'taskId',
                fieldLabel:'任务id',
                hidden:true
            },{
                xtype: 'displayfield',
                fieldLabel:'申请金额',
                name:'amount',
                hidden:true
            },{
                xtype:'radiogroup',
                fieldLabel:'财务部门审批',
                items:[{
                    name:'financeClerkPass',
                    inputValue:true,
                    boxLabel:'同意',
                    checked:true
                },{
                    name:'financeClerkPass',
                    inputValue:false,
                    boxLabel:'不同意',
                }],
                listeners:{
                    'change':function(group, checked){
                        var a = Ext.getCmp('financeBackReason');
                        if(checked.financeClerkPass == true){
                           a.setDisabled(true);
                        }else if(checked.financeClerkPass == false){
                           a.setDisabled(false);
                        }
                    }
                }
            },{
                xtype:'textareafield',
                name:'financeBackReason',
                id:'financeBackReason',
                fieldLabel:'驳回理由',
                anchor:'100%',
                disabled:true
            }
        ]
    }],

    bbar:['->',{
        xtype:'button',
        ui:'soft-green',
        text:'提交',
        width:70,
        height:40,
        handler:'FinanceFormSubmitButton'   
    }]
});
