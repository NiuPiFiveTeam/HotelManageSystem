Ext.define('Admin.view.bcard.BcardViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.bcardViewController',
	/*Add*/
	openbcardAddWindow:function(toolbar, rowIndex, colIndex){
		toolbar.up('panel').up('container').add(Ext.widget('bcardAddWindow')).show();
	},
	/*Edit*/
	openEditWindow:function(grid, rowIndex, colIndex){
		var record = grid.getStore().getAt(rowIndex);
		//获取选中数据的字段值：console.log(record.get('id')); 或者 console.log(record.data.id);
		if (record ) {
			if(record.data.processStatus=="NEW"){
				var win = grid.up('container').add(Ext.widget('bcardEditWindow'));
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
		var record = Ext.create('Admin.model.bcard.BcardModel');
		var values  =form.getValues();//获取form数据
		record.set(values);
		record.save();
		Ext.data.StoreManager.lookup('bcardStore').reload();
		win.close();
	},
	/*Edit Submit*/	
	submitEditForm:function(btn){
		var win    = btn.up('window');
		var store = Ext.data.StoreManager.lookup('bcardStore');
		var values  = win.down('form').getValues();//获取form数据
		var record = store.getById(values.bCardid);//获取id获取store中的数据
		record.set(values);//rest put 
		store.reload();
		win.close();
	},
	/*Quick Search*/	
	quickSearch:function(btn) {
  
	  var searchDataFieldValue2 = this.lookupReference('searchDataFieldValue2').getValue();
	  var store = btn.up('gridpanel').getStore();
	  console.log(searchDataFieldValue2);
	  var date = Ext.util.Format.date(searchDataFieldValue2, 'Y-m-d');
	  console.log(date);
	  Ext.apply(store.proxy.extraParams, {workDate:date});
	  
	  store.load({params:{start:0, limit:20, page:1}});
	},
	
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
	
	/*Star Leave Process*/	
	starLeaveProcess:function(grid, rowIndex, colIndex){
		var record = grid.getStore().getAt(rowIndex);
		Ext.Ajax.request({ 
			url : '/bcard/start', 
			method : 'post', 
			params : {
				bCardid :record.get("bCardid")
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
	},
	openSearchWindow:function(){
    var store = Ext.data.StoreManager.lookup('bcardStore');
        Ext.apply(store.proxy.extraParams, {workDate:null});
        store.load({params:{start:0, limit:20, page:1}});
  	}
});
