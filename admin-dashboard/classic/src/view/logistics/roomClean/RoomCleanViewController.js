Ext.define('Admin.view.logistics.roomClean.RoomCleanViewController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.roomCleanViewController',
/*********************************************************退房清洁按钮**********************************************************/
	/*清洁按钮*/
	onOutCleanButton:function(grid, rowIndex, colIndex){
		Ext.MessageBox.confirm('开始退房清洁', '你确定开始退房清洁?', 
		function(btn) {  
			if (btn == 'yes') {  
				var gridStroe = grid.getStore().getAt(rowIndex);//获取grid选中行的数据
				var store = Ext.data.StoreManager.lookup('roomCleanGridStroe');
				var record = store.getById(gridStroe.get('id'));//获取id获取store中的数据
				var values={"roomCleanState":"CLEANING"};
				record.set(values);//rest put 
				grid.getStore().reload();
				alert("可开始清洁");
			}  
		}  
		);
	},
	//添加标配外物品按钮
	onOutAddOtherButton:function(toolbar,rowIndex, colIndex){
		toolbar.up('panel').up('container').add(Ext.widget('addOtherWindow')).show();
	},
	//清洁完成按钮
	onOutFinishButton:function(grid, rowIndex, colIndex){
		Ext.MessageBox.confirm('结束退房清洁', '你确定结束退房清洁?', 
		function(btn) {  
			if (btn == 'yes') {  
				var gridStroe = grid.getStore().getAt(rowIndex);//获取grid选中行的数据
				var store = Ext.data.StoreManager.lookup('roomCleanGridStroe');
				var record = store.getById(gridStroe.get('id'));//获取id获取store中的数据
				var values={"roomCleanState":"WAITING1"};
				record.set(values);//rest put 
				grid.store.reload();
				alert("完成退房清洁");
			}  
		}  
		);
	},
/*********************************************************客房服务按钮**********************************************************/	
	//客房服务按钮
	onInCleanStartButton:function(grid, rowIndex, colIndex){
		Ext.MessageBox.confirm('开始客房服务', '开始客房服务?', 
		function(btn) {  
			if (btn == 'yes') {  
				var gridStroe = grid.getStore().getAt(rowIndex);//获取grid选中行的数据
				var store = Ext.data.StoreManager.lookup('roomCleanGridStroe');
				var record = store.getById(gridStroe.get('id'));//获取id获取store中的数据
				var values={"roomCleanState":"SERVICING"};
				record.set(values);//rest put 
				grid.store.reload();
				alert("可以开始客房服务");
			}  
		}  
		);
	},
	// //客房服务清洁按钮
	// onInCleanButton:function(grid, rowIndex, colIndex){

	// },
	// //送客人需要物品按钮
	// onSendButton:function(toolbar,rowIndex, colIndex){
	// 	toolbar.up('panel').up('container').add(Ext.widget('sendWindow')).show();
	// },
	//客房服务完成按钮
	onFinishServiceButton:function(grid, rowIndex, colIndex){
		Ext.MessageBox.confirm('结束客房服务', '结束客房服务?', 
		function(btn) {  
			if (btn == 'yes') {  
				var gridStroe = grid.getStore().getAt(rowIndex);//获取grid选中行的数据
				var store = Ext.data.StoreManager.lookup('roomCleanGridStroe');
				var record = store.getById(gridStroe.get('id'));//获取id获取store中的数据
				var values={"roomCleanState":"WAITING2"};
				record.set(values);//rest put 
				grid.store.reload();
				alert("可以开始客房服务");
			}  
		}  
		);
	},
});
