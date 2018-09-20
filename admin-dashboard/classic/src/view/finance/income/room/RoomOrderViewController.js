Ext.define('Admin.view.finance.income.room.RoomOrderViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.roomOrderViewController',
    
    //编辑窗口
	openEditWindow:function(grid, rowIndex, colIndex){
		var records = grid.getStore().getAt(rowIndex);
			if(records){
				var win = grid.up('container').add(Ext.widget('roomOrderEditWindow'));
				win.show();
				win.down('form').getForm().loadRecord(records);
			}		
	},
	orderEditFormSubmit:function(btn){
		var win = btn.up('window');
		var store = Ext.data.StoreManager.lookup('orderGridStroe');
    	var values  = win.down('form').getValues();//获取form数据
    	var record = store.getById(values.orderId);//获取id获取store中的数据
    	record.set(values);	//put提交
    	//store.load();
        win.close();
	},
	
	//添加窗口
	openAddWindow:function(grid, rowIndex, colIndex){
			var win = grid.up('container').add(Ext.widget('roomOrderAddWindow')).show();
	},
	orderAddFormSubmit:function(btn){
		var win = btn.up('window');
	    var form = win.down('form');
	    var record = Ext.create('Admin.model.finance.RoomOrderModel');
	    console.log(record);
	    var values = form.getValues();//获取form数据
	    record.set(values);
	    record.save();
	    Ext.data.StoreManager.lookup('orderGridStroe').load();
	    win.close();
	},

	/*快速查询*/
	searchComboboxSelectChuang:function(combo,record,index){
		//alert(record.data.name);
		var searchField = this.lookupReference('searchFieldName').getValue();
		if(searchField==='comeDate'){
			this.lookupReference('searchId').hide();
			this.lookupReference('searchcomeDateFrom').show();
			this.lookupReference('searchcomeDateTo').show();
		}else{
			this.lookupReference('searchId').show();
			this.lookupReference('searchcomeDateFrom').hide();
			this.lookupReference('searchcomeDateTo').hide();
		}
	},	
	quickSearch:function(btn){
		var searchField = this.lookupReference('searchFieldName').getValue();
		var searchorderId = this.lookupReference('searchId').getValue();
		var searchcomeDateFrom = this.lookupReference('searchcomeDateFrom').getValue();
		var searchcomeDateTo = this.lookupReference('searchcomeDateTo').getValue();
		
		var store =	btn.up('gridpanel').getStore();
		//var store = Ext.getCmp('userGridPanel').getStore();// Ext.getCmp(）需要在OrderPanel设置id属性
		Ext.apply(store.proxy.extraParams, {orderId:"",comeDateFrom:"",comeDateTo:""});
		
		if(searchField==='orderId'){
			Ext.apply(store.proxy.extraParams, {orderId:searchorderId});
		}
		if(searchField==='comeDate'){
			Ext.apply(store.proxy.extraParams,{
				comeDateFrom:Ext.util.Format.date(searchcomeDateFrom, 'Y/m/d H:i:s'),
				comeDateTo:Ext.util.Format.date(searchcomeDateTo, 'Y/m/d H:i:s')
			});
		}
		store.load({params:{start:0, limit:20, page:1}});
	},

	/*多条件查询*/	
	openSearchWindow:function(toolbar, rowIndex, colIndex){
		toolbar.up('grid').up('container').add(Ext.widget('roomOrderSearchWindow')).show();
	},
	orderSearchFormSubmit:function(btn){
		var form = btn.up('window').down('form');
		//form.getValues();
		//¸üÐÂÊÂ¼þ
	},

	/*删除*/	
	deleteOneOrder:function(grid, rowIndex, colIndex){
		Ext.MessageBox.confirm('提示', '确定要进行删除操作吗？数据将无法还原！',
	    function(btn, text){
	      if(btn=='yes'){
	        var store = grid.getStore();
	        // console.log(store);
	        var record = store.getAt(rowIndex);
	        // console.log(record);
	        store.remove(record);//DELETE//http://localhost:8081/order/112
	      //store.sync();
	      }
	    }, this);
	},
	/*删除多条记录*/	
	deleteMoreRows:function(btn, rowIndex, colIndex){
		var grid = btn.up('gridpanel');
		var selModel = grid.getSelectionModel();
        if (selModel.hasSelection()) {
            Ext.Msg.confirm("警告", "确定要删除吗？", function (button) {
                if (button == "yes") {
                    var rows = selModel.getSelection();
                    var selectIds = []; //要删除的id
                    Ext.each(rows, function (row) {
                        selectIds.push(row.data.orderId);
                    });
                  	Ext.Ajax.request({ 
						url : '/order/deletes', 
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
    }
	
});
