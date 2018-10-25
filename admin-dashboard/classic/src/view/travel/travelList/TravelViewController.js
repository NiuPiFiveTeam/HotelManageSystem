Ext.define('Admin.view.travel.travelList.TravelViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.travelViewController',
	/*Add*/
	openAddWindow:function(toolbar, rowIndex, colIndex){
		toolbar.up('panel').up('container').add(Ext.widget('travelAddWindow')).show();
	},
	/*Edit*/
	openEditWindow:function(grid, rowIndex, colIndex){
		var record = grid.getStore().getAt(rowIndex);
		//获取选中数据的字段值：console.log(record.get('id')); 或者 console.log(record.data.id);
		if (record ) {
			if(record.data.processStatus=="NEW"){
				var win = grid.up('container').add(Ext.widget('travelEditWindow'));
				win.show();
				win.down('form').getForm().loadRecord(record);
			}else{
				Ext.Msg.alert('提示', "只可以修改'新建'状态的信息！");
			}
		}
	},

	/********************************************** Submit / Ajax / Rest *****************************************************/
	/*Add Submit*/	
	submitAddForm:function(btn){
		var win    = btn.up('window');
		var form = win.down('form');
		var record = Ext.create('Admin.model.travel.TravelModel');
		var values  =form.getValues();//获取form数据
		record.set(values);
		record.save();
		Ext.data.StoreManager.lookup('travelStore').reload();
		win.close();
	},
	/*Edit Submit*/	
	submitEditForm:function(btn){
		var win    = btn.up('window');
		var store = Ext.data.StoreManager.lookup('travelStore');
		var values  = win.down('form').getValues();//获取form数据
		var record = store.getById(values.travelId);//获取id获取store中的数据
		record.set(values);//rest put 
		store.reload();
		win.close();
	},
	/*Quick Search*/	
	quickSearch:function(btn){
		var searchField = this.lookupReference('searchFieldName').getValue();
		var searchDataFieldValue = this.lookupReference('searchDataFieldValue').getValue();
		var searchDataFieldValue2 = this.lookupReference('searchDataFieldValue2').getValue();

		var store =	btn.up('gridpanel').getStore();
		//var store = Ext.getCmp('userGridPanel').getStore();// Ext.getCmp(）需要在LeavePanel设置id属性
		Ext.apply(store.proxy.extraParams, {startTime:"",endTime:""});
		if(searchField==='leaveTime'){
			Ext.apply(store.proxy.extraParams,{
				startTime:Ext.util.Format.date(searchDataFieldValue, 'Y/m/d H:i:s'),
				endTime:Ext.util.Format.date(searchDataFieldValue2, 'Y/m/d H:i:s')
			});
		}
		store.load({params:{start:0, limit:20, page:1}});
	},
	submitSearchForm:function(btn){
		var store =	Ext.data.StoreManager.lookup('leaveStore');
		var win = btn.up('window');
		var form = win.down('form');
		var values  = form.getValues();
		Ext.apply(store.proxy.extraParams, {startTime:"",endTime:""});
		Ext.apply(store.proxy.extraParams,{
			startTime:Ext.util.Format.date(values.startTime, 'Y/m/d H:i:s'),
			endTime:Ext.util.Format.date(values.endTime, 'Y/m/d H:i:s')
		});
		store.load({params:{start:0, limit:20, page:1}});
		win.close();
	},
	/*Delete One Row*/	
	deleteOneTravelRow:function(grid, rowIndex, colIndex){
		var store = grid.getStore();
		var record = store.getAt(rowIndex);
		if(record.data.processStatus=="NEW"){
			Ext.MessageBox.confirm('提示', '确定要进行删除操作吗？数据将无法还原！',function(btn, text){
				if(btn=='yes'){
					store.remove(record);
				}
			}, this);
		}else{
			Ext.Msg.alert('提示', "只可以删除'新建'状态的信息！");
		}
	},
	/*Delete More Rows*/	
	deleteMoreTravelRows:function(btn, rowIndex, colIndex){
		var grid = btn.up('gridpanel');
		var selModel = grid.getSelectionModel();
		if (selModel.hasSelection()) {
			Ext.Msg.confirm("警告", "确定要删除吗？", function (button) {
				if (button == "yes") {
					var rows = selModel.getSelection();
					var selectIds = []; //要删除的id
					Ext.each(rows, function (row) {
						//if(row.data.processStatus=="NEW"){
							selectIds.push(row.data.travelId);
						//}
					});
					Ext.Ajax.request({ 
						url : '/travel/deletes', 
						method : 'post', 
						params : { 
							//ids[] :selectIds
							ids :selectIds
						}, 
						success: function(response, options) {
							var json = Ext.util.JSON.decode(response.responseText);
							if(json.success){
								Ext.Msg.alert('操作成功', json.msg, function() {
								grid.getStore().reload();
							});
							}else{
								Ext.Msg.alert('操作失败', json.msg);
							}
						}
					});
				}
			});
		}else {
			Ext.Msg.alert("错误", "没有任何行被选中，无法进行删除操作！");
		}
	},
	/*Star Leave Process*/	
	starLeaveProcess:function(grid, rowIndex, colIndex){
		var record = grid.getStore().getAt(rowIndex);
		Ext.Ajax.request({ 
			url : '/travel/start', 
			method : 'post', 
			params : {
				travelId :record.get("travelId")
			}, 
			success: function(response, options) {
				var json = Ext.util.JSON.decode(response.responseText);
				if(json.success){
					Ext.Msg.alert('操作成功', json.msg, function() {
					grid.getStore().reload();
				});
				}else{
					Ext.Msg.alert('操作失败', json.msg);
				}
			}
		});
	},	
	/*Cancel Leave Process*/	
	cancelLeaveProcess:function(grid, rowIndex, colIndex){
		Ext.Msg.alert("Title","Cancel Leave Process");
	}
});
