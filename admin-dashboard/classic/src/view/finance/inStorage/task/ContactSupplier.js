Ext.define('Admin.view.finance.inStorage.task.ContactSupplier',{
	extend:'Ext.form.Panel',
	alias:'widget.contactSupplier',
	requires:[
        'Ext.form.Panel',
        'Ext.toolbar.Paging',

        'Ext.form.field.ComboBox',  //下拉列表框
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.*',
		'Ext.button.Button',
        'Ext.form.RadioGroup',
        'Ext.form.field.*'
	],
	width: 400,
    bodyPadding: 10,

    items:[{
        xtype: 'fieldset',
        title: '联系供货商',
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
                xtype:'displayfield',
                name:'amount',
                labelAlign:'right',
                fieldLabel:'总金额'
            },{
                name:'supplier',
                labelAlign:'right',
                fieldLabel:'请输入供货商',
                allowBlank:false,
                emptyText: 'Supplier Name'
            }
        ]
    },{
        xtype: 'gridpanel',
        store:'inStorageDetailedStore',
        columns: [{
            header:'名称',
            dataIndex:'goodsName',
            flex:1
        },{
            header:'单价',  
            dataIndex:'amount',
            flex:1 
        },{
            header:'数量', 
            dataIndex:'unit', 
            flex:1 
        },{
            header:'总价(元)',   
            name:'price',
            flex:1
        }],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store:'inStorageDetailedStore',
        }]
    }],


    bbar:['->',{
      xtype:'button',
      ui:'soft-green',
      text:'提交',
        width:70,
        height:40,
        handler:'contactSupplierSubmitButton'   
    }]
});