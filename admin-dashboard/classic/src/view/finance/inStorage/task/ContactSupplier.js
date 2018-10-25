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
                name:'totalPrice',
                labelAlign:'right',
                id:'inStorageAmount',
                allowBlank:false, 
                readOnly:true,
                fieldLabel:'总金额',
                emptyText: 'Total Price'
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
        plugins: {
            ptype: 'cellediting',
            clicksToEdit: 1
        },
        columns: [{
            header:'名称',
            dataIndex:'goodsName',
            flex:1
        },{
            header:'数量',  
            dataIndex:'amount',
            flex:1 
        },{
            header:'单位', 
            dataIndex:'unit', 
            flex:1
        },{
            header:'单价',  
            dataIndex:'price',
            editor:{  
                xtype: 'numberfield',
                minValue: 1,
                allowBlank:false,
                listeners:{
                    'blur':function(value){
                        var store = this.up('grid').getStore();
                        if(!window.ret){
                          window.ret=[];
                        }
                        Ext.each(store.getRange(), function(record) {
                                    ret.push(record.data);
                                });
                        window.list = [];
                        for (var i = 0, j = ret.length; i < j; i++) {
                                 if (list.indexOf(ret[i]) === -1) {
                                     list.push(ret[i]);
                                 }
                              }
                        }
                }
            },

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
      text:'计算',
        width:70,
        height:40,
        handler:'calculate'   
    },{
      xtype:'button',
      ui:'soft-green',
      text:'提交',
        width:70,
        height:40,
        handler:'contactSupplierSubmitButton'   
    }]
});