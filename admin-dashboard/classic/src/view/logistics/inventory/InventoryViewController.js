Ext.define('Admin.view.logistics.inventory.InventoryViewController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.inventoryViewController',
/****************************************************	In	***************************************************************/
    /*切换搜索条件输入框*/
	searchComboboxIn:function(combo,record,index){
		//alert(record.data.name);
		var searchField = this.lookupReference('searchFieldNameIn').getValue();
        if(searchField==='inStorageId')
		{//显示入库编号搜索条件框
			// alert(searchField);
			this.lookupReference('searchInStorageDate').hide();
			this.lookupReference('searchInStorageDate2').hide();
			this.lookupReference('searchVender').hide();
			this.lookupReference('searchAmount1').hide();
			this.lookupReference('searchAmount2').hide();
			this.lookupReference('searchInStorageId').show();
		}
		else if(searchField==='inStorageDate')
		{//显示入库日期搜索条件框
			this.lookupReference('searchInStorageDate').show();
			this.lookupReference('searchInStorageDate2').show();
			this.lookupReference('searchVender').hide();
			this.lookupReference('searchAmount1').hide();
			this.lookupReference('searchAmount2').hide();
			this.lookupReference('searchInStorageId').hide();
		}
		else if(searchField==='vender')
		{//显示采购商家搜索条件框
			this.lookupReference('searchInStorageDate').hide();
			this.lookupReference('searchInStorageDate2').hide();
			this.lookupReference('searchVender').show();
			this.lookupReference('searchAmount1').hide();
			this.lookupReference('searchAmount2').hide();
			this.lookupReference('searchInStorageId').hide();
		}
		else if(searchField==='amount')
		{//显示总价搜索条件框
			this.lookupReference('searchInStorageDate').hide();
			this.lookupReference('searchInStorageDate2').hide();
			this.lookupReference('searchVender').hide();
			this.lookupReference('searchAmount1').show();
			this.lookupReference('searchAmount2').show();
			this.lookupReference('searchInStorageId').hide();
		}
	
    },
    
    /*Quick Search*/	
	quickSearchIn:function(btn){
        var searchField = this.lookupReference('searchFieldNameIn').getValue();
        var searchInStorageId = this.lookupReference('searchInStorageId').getValue();
		var searchInStorageDate = this.lookupReference('searchInStorageDate').getValue();
        var searchInStorageDate2 = this.lookupReference('searchInStorageDate2').getValue();
        var searchVender = this.lookupReference('searchVender').getValue();
        var searchAmount1 = this.lookupReference('searchAmount1').getValue();
        var searchAmount2 = this.lookupReference('searchAmount2').getValue();
		var store =	btn.up('gridpanel').getStore();
		//var store = Ext.getCmp('userGridPanel').getStore();// Ext.getCmp(）需要在OrderPanel设置id属性
		Ext.apply(store.proxy.extraParams, {inStorageId:"",createTimeStart:"",createTimeEnd:"",vender:"",amountStart:0,amountEnd:0});
		
		if(searchField==='inStorageId'){
			Ext.apply(store.proxy.extraParams, {inStorageId:searchInStorageId});
		}
		if(searchField==='inStorageDate'){
			Ext.apply(store.proxy.extraParams,{
				createTimeStart:Ext.util.Format.date(searchInStorageDate, 'Y/m/d H:i:s'),
				createTimeEnd:Ext.util.Format.date(searchInStorageDate2, 'Y/m/d H:i:s')
			});
        }
        if(searchField==='vender'){
           // alert(searchVender);
			Ext.apply(store.proxy.extraParams, {vender:searchVender});
        }
        if(searchField==='amount'){
			Ext.apply(store.proxy.extraParams,{
				amountStart:searchAmount1,
				amountEnd:searchAmount2
			});
		}
		store.load({params:{start:0, limit:20, page:1}});
	},

	synchro:function(){
		Ext.Ajax.request({
			url: '/In/synchro',
			method: 'post',
			success: function(response, options) {
				var json = Ext.util.JSON.decode(response.responseText);
				if (json.success) {
					var store=Ext.getCmp('ininin').store;
					Ext.apply(store.proxy.extraParams, {InStorageId:"",createTimeStart:null,createTimeEnd:null,amountStart:0,amountEnd:0,vender:''});
					store.load({params:{start:0, limit:20, page:1}});
					Ext.Msg.alert('同步信息', "同步入库信息成功");
				} else {
					var store=Ext.getCmp('ininin').store;
					Ext.apply(store.proxy.extraParams, {InStorageId:"",createTimeStart:null,createTimeEnd:null,amountStart:0,amountEnd:0,vender:''});
					store.load({params:{start:0, limit:20, page:1}});
					Ext.Msg.alert('同步信息', "同步入库信息失败");
				}
			}
		});
	},

	showAllIn:function(){
		this.lookupReference('searchFieldNameIn').setValue("");
		this.lookupReference('searchInStorageDate').hide();
		this.lookupReference('searchInStorageDate2').hide();
		this.lookupReference('searchVender').hide();
		this.lookupReference('searchAmount1').hide();
		this.lookupReference('searchAmount2').hide();
		this.lookupReference('searchInStorageId').hide();
		this.lookupReference('searchInStorageDate').setValue(null);
		this.lookupReference('searchInStorageDate2').setValue(null);
		this.lookupReference('searchVender').setValue("");
		this.lookupReference('searchAmount1').setValue("");
		this.lookupReference('searchAmount2').setValue("");
		this.lookupReference('searchInStorageId').setValue("");
		var store=Ext.getCmp('ininin').store;
		Ext.apply(store.proxy.extraParams, {InStorageId:"",createTimeStart:null,createTimeEnd:null,amountStart:0,amountEnd:0,vender:''});
		store.load({params:{start:0, limit:20, page:1}});
	},
	showInDetailedButton:function(grid,rowIndex, colIndex){
		 //var inStorageId=Ext.getCmp("ininin").getStore().getAt(rowIndex).get('inStorageId');//获取数据
		 var record = Ext.getCmp("ininin").getStore().getAt(rowIndex);
		 if (record) {
			var win = grid.up('container').add(Ext.widget('showInDetailed'));
			win.show();
			win.down('form').getForm().loadRecord(record);
		}
		// toolbar.up('panel').up('container').add(Ext.widget('showInDetailed')).show(
		// 	function(){
		// 		alert("123");
		// 	}
		// );
		
	},
/****************************************************	InSend	**************************************************************/
InSendAdd:function(){
	alert("InSendAdd");
},

/****************************************************		Out		**************************************************************/
 /*切换搜索条件输入框*/
 searchComboboxOut:function(combo,record,index){
	//alert(record.data.name);
	var searchFieldOut = this.lookupReference('searchFieldNameOut').getValue();
	if(searchFieldOut==='roomNo')
	{//显示房间号码搜索条件框
		this.lookupReference('searchOutDate').hide();
		this.lookupReference('searchOutDate2').hide();
		this.lookupReference('searchWorker').hide();
		this.lookupReference('searchRoomNo').show();
	}
	else if(searchFieldOut==='outDate')
	{//显示出库日期搜索条件框
		this.lookupReference('searchOutDate').show();
		this.lookupReference('searchOutDate2').show();
		this.lookupReference('searchWorker').hide();
		this.lookupReference('searchRoomNo').hide();
	}
	else if(searchFieldOut==='worker')
	{//显示工作人员搜索条件框
		this.lookupReference('searchOutDate').hide();
		this.lookupReference('searchOutDate2').hide();
		this.lookupReference('searchWorker').hide();
		this.lookupReference('searchRoomNo').hide();
	}
},

/*quickSearchOut*/	
quickSearchOut:function(btn){
	var searchField = this.lookupReference('searchFieldNameOut').getValue();
	
	var searchRoomNo = this.lookupReference('searchRoomNo').getValue();
	var searchOutDate = this.lookupReference('searchOutDate').getValue();
	var searchOutDate2 = this.lookupReference('searchOutDate2').getValue();
	var searchWorker = this.lookupReference('searchWorker').getValue();
	
	var store =	btn.up('gridpanel').getStore();
	//var store = Ext.getCmp('userGridPanel').getStore();// Ext.getCmp(）需要在OrderPanel设置id属性
	Ext.apply(store.proxy.extraParams, {roomNo:"",createOutTimeStart:"",createOutTimeEnd:"",workers:""});
	
	if(searchField==='roomNo'){
		//alert(searchRoomNo);
		Ext.apply(store.proxy.extraParams, {roomNo:searchRoomNo});
	}
	if(searchField==='outDate'){
		Ext.apply(store.proxy.extraParams,{
			createOutTimeStart:Ext.util.Format.date(searchOutDate, 'Y/m/d H:i:s'),
			createOutTimeEnd:Ext.util.Format.date(searchOutDate2, 'Y/m/d H:i:s')
		});
	}
	if(searchField==='worker'){
	   // alert(searchVender);
		Ext.apply(store.proxy.extraParams, {workers:searchWorker});
	}
	store.load({params:{start:0, limit:20, page:1}});
},


/****************************************************	Stock	**************************************************************/
 

/*切换搜索条件输入框*/
searchComboboxStock:function(combo,record,index){
	//alert(record.data.name);
	var searchFieldOut = this.lookupReference('searchFieldNameStock').getValue();
	if(searchFieldOut==='goodsName')
	{//显示房间号码搜索条件框
		this.lookupReference('searchStockTyp').hide();
		this.lookupReference('searchGoodsName').show();
	}
	else if(searchFieldOut==='stockType')
	{//显示出库日期搜索条件框
		this.lookupReference('searchStockTyp').show();
		this.lookupReference('searchGoodsName').hide();
	}
},

/*quickSearchStock*/	
quickSearchStock:function(btn){
	var searchField = this.lookupReference('searchFieldNameStock').getValue();
	
	var searchGoodsName = this.lookupReference('searchGoodsName').getValue();
	var searchStockTyp = this.lookupReference('searchStockTyp').getValue();
	
	var store =	btn.up('gridpanel').getStore();
	//var store = Ext.getCmp('userGridPanel').getStore();// Ext.getCmp(）需要在OrderPanel设置id属性
	Ext.apply(store.proxy.extraParams, {goodsName:"",stockType:""});
	
	if(searchField==='goodsName'){
		
		Ext.apply(store.proxy.extraParams, {goodsName:searchGoodsName});
	}
	if(searchField==='stockType'){
		//alert(searchStockTyp);
		Ext.apply(store.proxy.extraParams, {stockType:searchStockTyp});
	}
	store.load({params:{start:0, limit:20, page:1}});
},


	StockAdd:function(toolbar,rowIndex, colIndex){
		toolbar.up('panel').up('container').add(Ext.widget('stockAddWindow')).show();
	},
	allStock:function(btn){
		var store =	btn.up('gridpanel').getStore();
		Ext.apply(store.proxy.extraParams, {goodsName:"",stockType:"",amount:0,yesOrNoSend:''});
		store.load({params:{start:0, limit:20, page:1}});
		this.lookupReference('ssend').hide();
	},
	alarm:function(btn){
		var store =	btn.up('gridpanel').getStore();
		Ext.apply(store.proxy.extraParams, {amount:10,yesOrNoSend:'未申请'});
		store.load({params:{start:0, limit:20, page:1}});
		this.lookupReference('ssend').show();
	},
	send:function(toolbar,rowIndex, colIndex){
		toolbar.up('panel').up('container').add(Ext.widget('inSendAddWindow')).show();
	}
})