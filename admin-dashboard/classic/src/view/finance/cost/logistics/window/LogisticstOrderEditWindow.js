Ext.define('Aria.view.finance.cost.logisticst.window.LogisticstOrderEditWindow', {
	extend: 'Ext.window.Window', 
	alias: 'widget.logisticstOrderEditWindow', 
	autoShow: true, 	//设为true显示设为"x-hidden"的元素
	modal: true,	//true为模式窗口，后面的内容都不能操作，
	layout: 'fit', 
	// width: 200, 
	// height: 200, 
	title:'修改订单信息',
	items:[{
		xtype:'form',
		// id:'orderEditWindowForm',
		width:300,
		layout: {
			type:'vbox',
			align:'stretch'
		}, 
		bodyPadding: 20, 
		// scrollable: true, 
		defaults: {
			labelWidth: 100,
			labelSeparator: ':'
		},
		defaultType: 'textfield',
		items:[{
			// disabled:true,
			name: 'orderId', 
			fieldLabel: '订单号' ,
			readOnly: true,
			fieldStyle:'color:#8B8970',
			labelWidth:60
		},{
			name: 'userId', 
			fieldLabel: '客户编号' ,
			labelWidth:60
		},{
			name: 'roomId', 
			fieldLabel: '客房号' ,
			labelWidth:60
		},{
			name: 'comeDate', 
			fieldLabel: '入住时间' ,
			xtype:'datefield',
 			format: 'Y/m/d H:i:s',
			labelWidth:60
		},{
			name: 'leftDate', 
			fieldLabel: '结算时间' ,
			xtype:'datefield',
			format: 'Y/m/d H:i:s',
			labelWidth:60
		}], 

		buttons: [ {
			xtype:'button',
			text:'submit',
			handler:'orderEditFormSubmit'
		},{
			text: 'Cancel', handler: function() {
				this.up('form').getForm().reset();
				this.up('window').hide();
			}
		}]
	}]
});
