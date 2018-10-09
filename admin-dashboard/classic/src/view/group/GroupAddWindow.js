Ext.define('Admin.view.group.GroupAddWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.groupAddWindow',
    height: 350,
    minHeight: 350,
    id:'groupAddWindow',
    minWidth: 300,
    width: 500,
    scrollable: true,
    title: 'Add Group Window',
    closable: true,
    constrain: true,
    
    defaultFocus: 'textfield',
    modal:true,
    layout: 'fit',
    items: [{
        xtype: 'form',
        layout: 'form',
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
			fieldLabel: '角色Id',
			
			allowBlank: false
		},{
            xtype: 'textfield',
            name: 'groupName',
            fieldLabel: '角色名称',
            
            allowBlank: false
        },{
                xtype : 'combobox',            
                labelWidth : 100,
                labelAlign : 'right',    
                width: 300,            
                fieldLabel:'选择部门',
                name:'deptName',
                store: Stores,
                valueField : 'deptName',
                displayField: 'deptName',
                forceSelection:true,                
                editable : false,
                emptyText: '请选部门'
               }]
    }],
	buttons: ['->',{
        xtype: 'button',
        text: 'Submit',
        handler: 'submitAddGroupForm'
    },{
        xtype: 'button',
        text: 'Close',
        handler: function(btn) {
            btn.up('window').close();
        }
    },'->']
});
