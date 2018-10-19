Ext.define('Admin.view.travelApprove.TravelApproveViewController', {
    extend: Ext.app.ViewController,
    alias: 'controller.travelApproveViewController',
     //1.签收任务
    onClickLeaveApproveClaimButton: function(view, recIndex, cellIndex, item, e, record) {
        Ext.Ajax.request({
            url: 'travel/claim/' + record.get('taskId'),
            method: 'post',
            success: function(response, options) {
                var json = Ext.util.JSON.decode(response.responseText);
                if (json.success) {
                    Ext.Msg.alert('操作成功', json.msg, function() {
                        view.getStore().reload();
                    });
                } else {
                    Ext.Msg.alert('操作失败', json.msg);
                }
            }
        });
    },
    //2.创建审批表单（并绑定Task id）
    setCurrentView: function(view, form, title) {
		var cfg = Ext.apply({
			xtype: 'travelApproveWindow',
			items: [{xtype: form}]
		},{
			title: title
		});
		var win = Ext.widget(cfg);
        view.up('panel').up('container').add(win);
        return win;
    },
    onClickLeaveApproveCompleteWindowButton: function(view, recIndex, cellIndex, item, e, record) {
    	//选中点击的行
        var taskDefinitionKey = record.get('taskDefinitionKey');
        if (taskDefinitionKey == 'employeeTravel') {
            //部门领导审批
            var win = this.setCurrentView(view,taskDefinitionKey, '员工签收');
            win.down('form').getForm().loadRecord(record);
        } 
        else if (taskDefinitionKey == 'employReportBack') {
        	//申请人销假
        	var win = this.setCurrentView(view,taskDefinitionKey,'确认表单');
        	win.down('form').getForm().loadRecord(record);
        }
        else if (taskDefinitionKey == 'employModifyApply') {
        	//申请人调整申请：可以编写到工具类中
        	var win = this.setCurrentView(view,taskDefinitionKey,'调整出差表单');
        	win.down('form').getForm().loadRecord(record);
        }
    },
    //3.封装审批表单数据,并以Ajax提交到后台完成任务的流程变量封装对象中。
	complete: function(url, variables,form){
		// 转换JSON为字符串
	    var keys = "", values = "", types = "";
		if (variables) {
			Ext.each(variables, function (item) {
				if (keys != "") {
					keys += ",";
					values += ",";
					types += ",";
				}
				keys += item.key;
				values += item.value;
				types += item.type;
            });
		}
		Ext.Ajax.request({
            url: url,
            method: 'post',
            params : { 
			 	keys: keys,
		        values: values,
		        types: types
			}, 
            success: function(response, options) {
                var json = Ext.util.JSON.decode(response.responseText);
                if (json.success) {
                    Ext.Msg.alert('操作成功', json.msg, function() {
                    	form.up('window').close();
                        //grid.getStore().reload();
                        Ext.data.StoreManager.lookup('travelApproveStore').load();
                    });
                } else {
                    Ext.Msg.alert('操作失败', json.msg);
                }
            }
        });
	},
	//部门经理审批
    onClickDeptleaderAuditFormSubmitButton: function(btn) {
    	var form = btn.up('form');
    	var values = form.getValues();
    	var url = 'leave/complete/' + values.taskId;
    	var variables = [{
			key: 'EmployPass',
			value: values.EmployPass,//获取表单选择的value
			type: 'B'
		},{
			key: 'EmployeeBackReason',
			value: values.EmployeeBackReason,//获取表单选择的value
			type: 'S'
		}];
        this.complete(url,variables,form);
    },
   
    //销假
    onClickReportBackFormSubmitButton: function(btn) {
    	var form = btn.up('form');
     	var values = form.getValues();
     	var url = 'travel/complete/' + values.taskId;
     	var variables = [{
 			key: 'realityStartTime',
 			value: values.realityStartTime,//获取表单选择的value
 			type: 'D'
 		},{
 			key: 'realityEndTime',
 			value: values.realityEndTime,//获取表单选择的value
 			type: 'D'
 		},{
            key: 'allowance',
            value: values.allowance,//获取表单选择的value
            type: 'F'
        }];
        this.complete(url,variables,form);
    },
    //调整申请
    onClickModifyApplyFormSubmitButton: function(btn) {
        var form = btn.up('form');
    	var values = form.getValues();
    	var url = 'travel/complete/' + values.taskId;
    	var variables = [{
			key: 'LeaderModify',
			value: values.LeaderModify,//获取表单选择的value
			type: 'B'
		},{
			key: 'traStartTime',
			value: values.traStartTime,//获取表单选择的value
			type: 'D'
		},{
			key: 'traEndTime',
			value: values.traEndTime,//获取表单选择的value
			type: 'D'
		},{
			key: 'process',
			value: values.process,//获取表单选择的value
			type: 'S'
		}];
        this.complete(url,variables,form);
    },
    //流程跟踪
    onClickGraphTraceButton : function(btn) {
        alert("on Click Add Button!");
    }
});