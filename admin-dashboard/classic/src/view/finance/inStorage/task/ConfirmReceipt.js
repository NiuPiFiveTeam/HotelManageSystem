Ext.define('Admin.view.finance.inStorage.task.ConfirmReceipt',{
	extend:'Ext.panel.Panel',
	alias:'widget.confirmReceipt',
	requires:[
		'Ext.button.Button',
        'Ext.form.RadioGroup',
        'Ext.form.field.*'
	],
	width: 400,
    bodyPadding: 5,

    items:[{
        xtype:'form',
        items:[{
            xtype: 'fieldset',
            title: '入库申请总览',
            layout:'hbox',
            defaultType: 'displayfield',
            items: [{
                xtype:'textfield',
                name:'taskId',
                hidden:true
            },{
                name:'amount',
                fieldLabel:'总金额',
                labelWidth:60,
                flex: 1
            },{
                name:'vender',
                fieldLabel:'供货商',
                labelWidth:60,
                flex: 1
            }]
        }]  
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
            dataIndex:'price',
            flex:1
        }],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store:'inStorageDetailedStore',
        }]
    }],

    bbar:[{
    	xtype:'button',
    	ui:'soft-green',
    	text:'提交',
    	handler:'ConfirmReceiptSubmitButton'
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


