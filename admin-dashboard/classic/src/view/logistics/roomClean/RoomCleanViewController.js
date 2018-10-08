Ext.define('Admin.view.logistics.roomClean.RoomCleanViewController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.roomCleanViewController',

	
    /*弹出框，请确认是否完成*/
	onFinishButton:function(toolbar, rowIndex, colIndex){
		//Ext.Msg.alert("Title","完成");
		Ext.MessageBox.confirm('完成', '你确定完成清洁?', 
		function(btn) {  
			if (btn == 'yes') {  
				Ext.Msg.alert("Title","yes"); 
			}  
		}  
		);
	},

	/*弹出框，请确认是否清洁*/
	onCleanButton:function(grid, rowIndex, colIndex){
		Ext.MessageBox.confirm('清洁', '你确定开始清洁?', 
		function(btn) {  
			if (btn == 'yes') {  
				Ext.Msg.alert("Title","yes"); 
			}  
		})  
	},

	/*弹出框，选择添加什么物品，填写原因*/
	onAddOtherButton:function(toolbar, rowIndex, colIndex){
		//Ext.Msg.alert("Title","添加标配外物品");
		toolbar.up('panel').up('container').add(Ext.widget('addOtherWindow')).show();
	},

	/*弹出框，选择送什么物品*/
	onSendButton:function(toolbar, rowIndex, colIndex){
		//Ext.Msg.alert("Title","送客人需要物品");
		toolbar.up('panel').up('container').add(Ext.widget('sendWindow')).show();
	}
});
