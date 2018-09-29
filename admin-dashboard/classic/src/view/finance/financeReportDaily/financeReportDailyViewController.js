Ext.define('Admin.view.finance.financeReportDaily.FinanceReportDailyViewController',{
	extend:Ext.app.ViewController,
	alias:'controller.financeReportDailyViewController',
	//导出excel
	exportExcel:function(btn, rowIndex, colIndex){
		var searchField = this.lookupReference('searchFieldName').getValue();
		if(searchField=='a'){//已选择记录
			var grid = btn.up('gridpanel');
		    var selModel = grid.getSelectionModel();
		    if (selModel.hasSelection()) {
			    var rows = selModel.getSelection();
			    var selectIds = [];//要查询的id
			    Ext.each(rows,function(row){
			        selectIds.push(row.data.financeReportDailyId);
			    })
			    window.location.href = 'financeReportDaily/exportExcelBySelectIds/' + selectIds;
	    	} else{
	      		alert('未选择记录！');
	    	}
		}else if(searchField=='b'){//本月
			var date = Ext.getCmp('monthfield').getValue();
	    	window.location.href="financeReportDaily/exportExcelByYearAndMonth/"+date
		}else if(searchField=='c'){//全年
			var date = Ext.getCmp('monthfield').getValue();
			var year = Ext.util.Format.date(date, 'Y');
			window.location.href="financeReportDaily/exportExcelByYear/"+year
		}else if(searchField=='d'){//全部数据
			window.location.href="financeReportDaily/exportExcelByAll" 
		}else{
			alert('请选择导出方式！')
		}
	},

});