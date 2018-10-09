Ext.define('Admin.view.dept.DeptEditWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.deptEditWindow',
    height: 350,
    minHeight: 350,
    minWidth: 300,
    width: 500,
    scrollable: true,
    title: 'Edit department Window',
    closable: true,
    constrain: true,
    defaultFocus: 'textfield',
    modal:true,
    layout: 'fit',
	items: [{
        xtype: 'form',
        layout: 'form',
        reference :'EditDeptForm',
        padding: '10px',
        ariaLabel: 'Enter your name',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'dept_id',
            name:'dept_id',
            hidden: true,
            readOnly: true
        },{
            xtype: 'textfield',
            fieldLabel: 'managerId',
            name:'managerId',
            hidden: true,
            readOnly: true
        },{
            xtype: 'textfield',
            fieldLabel: 'parentId',
            name:'parentId',
            hidden: true,
            readOnly: true
        },{
            xtype: 'textfield',
            fieldLabel: 'is_parent',
            name:'is_parent',
            hidden: true,
            readOnly: true
        },{
            xtype: 'textfield',
            name: 'deptNo',
            fieldLabel: '部门编号',

            allowBlank: false
        },{
            xtype: 'textfield',
            name: 'deptName',
            fieldLabel: '部门名称',
            allowBlank: false
        },{
                xtype : 'combobox',              
                fieldLabel:'选择上级部门',
                name:'deptParent',
                store: deptParents,
                valueField : 'deptParent',
                displayField: 'deptParent',
                forceSelection:true,                
                editable : false,
                emptyText: '请选部门'
               },{
            xtype: 'textfield',
            name: 'managerName',
            fieldLabel: '部门主管',
            allowBlank: false
        },{
            xtype: 'textfield',
            name: 'managerNo',
            fieldLabel: '主管编号',
            allowBlank: false
        }]
    }],
   buttons: ['->',{
        xtype: 'button',
        text: 'Submit',
        handler: 'submitEditDeptForm'
    },{
        xtype: 'button',
        text: 'Close',
        handler: function(btn) {
            btn.up('window').close();
        }
    },'->']
  
});
