Ext.define('Admin.view.finance.cost.salaryCost.SalaryCostViewController',{
	extend:Ext.app.ViewController,
	alias:'controller.salaryCostViewController',
	//过滤工资单
	filterSalaryOrder:function(){
		var me = this,
		view = me.getView(),
		salaryGrid = view.queryById('salaryCostGrid');
		filterEmpName = view.queryById('queryEmpName'); 
		filterDeptName = view.queryById('queryDeptName'); 
		filterAllDeptName = view.queryById('queryAllDept'); 
		filters = salaryGrid.store.getFilters();//当前表格的filter
		//1.过滤员工
		if(filterEmpName.value){
			this.empNameFilter = filters.add({
                id:'filterEmpName',
                property:'empName',//通过name属性过滤
                value:filterEmpName.value,//值为搜索框输入的值
                anyMatch:true,//模糊匹配
                caseSensitive:false
            });
		}else if(this.empNameFilter){//未输入，则移除filter
            filters.remove(this.empNameFilter);
            this.empNameFilter = null;
        }
        //2.过滤部门
        if(filterDeptName.value){
			this.deptNameFilter = filters.add({
                id:'filterDeptName',
                property:'deptName',//通过name属性过滤
                value:filterDeptName.value,//值为搜索框输入的值
                anyMatch:true,//模糊匹配
                caseSensitive:false
            });
		}else if(this.deptNameFilter){//未输入，则移除filter
            filters.remove(this.deptNameFilter);
            this.deptNameFilter = null;
        }
        //3.是否显示全部部门
        if(filterAllDeptName.checked){
			filters.remove(this.deptNameFilter);
            this.deptNameFilter = null;
		}else {
          this.deptNameFilter = filters.add({
                id:'filterDeptName',
                property:'deptName',//通过name属性过滤
                value:filterDeptName.value,//值为搜索框输入的值
                anyMatch:true,//模糊匹配
                caseSensitive:false
            });
        }
	},
	filterSalaryOrderAfterReset:function(){
		var me = this,
		view = me.getView(),
		salaryGrid = view.queryById('queryEmpName');
		salaryGrid.reset();
		this.filterSalaryOrder();
	},
});