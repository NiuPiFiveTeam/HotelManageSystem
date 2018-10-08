Ext.define('Admin.view.logistics.roomClean.RoomCleanViewController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.roomCleanViewController',

	
    /*弹出框，请确认是否清洁完成*/
	onFinishButton:function(grid, rowIndex, colIndex){
		//Ext.Msg.alert("Title","完成");
		Ext.MessageBox.confirm('完成', '你确定完成清洁?', 
		function(btn) {  
			if (btn == 'yes') {  
				var records = grid.getStore().getAt(rowIndex);//获取grid选中行的数据
				var store = Ext.data.StoreManager.lookup('roomCleanGridStroe');
				var record = store.getById(records.get('id'));//获取id获取store中的数据
				var values={"roomState":"等待入住","roomOther":"无"};
				record.set(values);//rest put 
			}  
		}  
		);
	},

	/*弹出框，请确认是否客房服务完成*/
	onFinishServiceButton:function(grid, rowIndex, colIndex){
		//Ext.Msg.alert("Title","完成");
		Ext.MessageBox.confirm('完成', '你确定完成客房服务?', 
		function(btn) {  
			if (btn == 'yes') {  
				var records = grid.getStore().getAt(rowIndex);//获取grid选中行的数据
				var store = Ext.data.StoreManager.lookup('roomCleanGridStroe');
				var record = store.getById(records.get('id'));//获取id获取store中的数据
				var values={"roomState":"已入住","roomOther":"无"};
				record.set(values);//rest put 
			}  
		}  
		);
	},

	/*弹出框，请确认是否清洁*/
	onCleanButton:function(grid, rowIndex, colIndex){
		Ext.MessageBox.confirm('清洁', '你确定开始清洁?', 
		function(btn) {  
			if (btn == 'yes') {  
				 var records = grid.getStore().getAt(rowIndex);//获取grid选中行的数据
				 var store = Ext.data.StoreManager.lookup('roomCleanGridStroe');
				 var record = store.getById(records.get('id'));//获取id获取store中的数据
				 var values={"roomState":"清洁中","roomOther":"无"};
				 record.set(values);//rest put 
			}  
		})  
	},

	/*弹出框，选择添加什么物品，填写原因*/
	onAddOtherButton:function(toolbar,grid, rowIndex, colIndex){
		//Ext.Msg.alert("Title","添加标配外物品");
		toolbar.up('panel').up('container').add(Ext.widget('addOtherWindow')).show();
	},

	/*弹出框，选择送什么物品*/
	onSendButton:function(toolbar, grid,rowIndex, colIndex){
		//Ext.Msg.alert("Title","送客人需要物品");
		toolbar.up('panel').up('container').add(Ext.widget('sendWindow')).show();
	}
});
