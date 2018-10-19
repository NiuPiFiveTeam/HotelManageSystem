Ext.define('Admin.view.group.GroupEditWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.groupEditWindow',
    height: 350,
    minHeight: 350,
    minWidth: 300,
    width: 500,
    scrollable: true,
    title: 'EditGroupForm Window',
    closable: true,
    constrain: true,
    defaultFocus: 'textfield',
    modal:true,
    layout: 'fit',
	items: [{
        xtype: 'form',
        layout: 'form',
        reference :'EditGroupForm',
        padding: '10px',
        ariaLabel: 'Enter your name',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'groupTable_id',
            name:'groupTable_id',
            hidden: true,
            readOnly: true
        },{
            xtype: 'textfield',
            name: 'groupId',
            fieldLabel: '角色ID',

            allowBlank: false
        },{
            xtype: 'textfield',
            name: 'groupName',
            fieldLabel: '角色名称',
            allowBlank: false
        },{
            xtype: 'textfield',
            name: 'money',
            fieldLabel: '时薪',
            allowBlank: false
        },{
            xtype: 'textfield',
            name: 'departmentName',
            fieldLabel: '所属部门',
            allowBlank: false
        }]
    }],
   buttons: ['->',{
        xtype: 'button',
        text: 'Submit',
        handler: 'submitEditGroupForm'
    },{
        xtype: 'button',
        text: 'Close',
        handler: function(btn) {
            btn.up('window').close();
        }
    },'->']
  
});
