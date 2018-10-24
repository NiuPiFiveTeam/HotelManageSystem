Ext.define('Admin.view.finance.cost.inStorageCost.InStorageOrderViewController',{
	extend:Ext.app.ViewController,
	alias:'controller.inStorageOrderViewController',

	//过滤入库单
	filterInStorageOrder:function(){
		var me = this,
		view = me.getView(),
		inStorageGrid = view.queryById('inStorageCostGrid');

		filterUserName = view.queryById('queryUserName'); 
		filterApplyTime = view.queryById('queryApplyTime');
		filterInStorageTime = view.queryById('queryInStorageTime');  
		
		filters = inStorageGrid.store.getFilters();//当前表格的filter
		//1.过滤员工
		if(filterUserName.value){
			this.UserNameFilter = filters.add({
                id:'filterUserName',
                property:'employeeId',//通过name属性过滤
                value:filterUserName.value,//值为搜索框输入的值
                anyMatch:true,//模糊匹配
                caseSensitive:false
            });
		}else if(this.UserNameFilter){//未输入，则移除filter
            filters.remove(this.UserNameFilter);
            this.UserNameFilter = null;
        }
        //2.过滤申请时间   queryApplyTime
        if(filterApplyTime.value){
	      this.ApplyTimeFilter = filters.add({
	                id:'filterApplyTime',
	                property:'applyTime',//通过name属性过滤
	                value:filterApplyTime.value.toString().substring(0,15),//值为搜索框输入的值
	                anyMatch:true,//模糊匹配
	                caseSensitive:false
	            });
	    }else if(this.ApplyTimeFilter){//未输入，则移除filter
	            filters.remove(this.ApplyTimeFilter);
	            this.ApplyTimeFilter = null;
        }
        //3.过滤入库时间  filterInStorageTime
        if(filterInStorageTime.value){
	      this.InStorageTimeFilter = filters.add({
	                id:'filterInStorageTime',
	                property:'inStorageDate',//通过name属性过滤
	                value:filterInStorageTime.value.toString().substring(0,15),//值为搜索框输入的值
	                anyMatch:true,//模糊匹配
	                caseSensitive:false
	            });
	    }else if(this.InStorageTimeFilter){//未输入，则移除filter
	            filters.remove(this.InStorageTimeFilter);
	            this.InStorageTimeFilter = null;
        }
    },

    //2.清空员工输入框
    filterInStorageOrderAfterReset:function(){
		var me = this,
		view = me.getView(),
		inStorageGrid = view.queryById('queryUserName');
		inStorageGrid.reset();
		this.filterInStorageOrder();
	},

	//3.重置申请日期
	resetApplyTime:function(){
		var me = this,
		view = me.getView(),
		inStorageGrid = view.queryById('queryApplyTime');
		inStorageGrid.reset();
		this.filterInStorageOrder();
	},
	//4.重置入库日期
	resetInStorageTime:function(){
		var me = this,
		view = me.getView(),
		inStorageGrid = view.queryById('queryInStorageTime');
		inStorageGrid.reset();
		this.filterInStorageOrder();
	}
});