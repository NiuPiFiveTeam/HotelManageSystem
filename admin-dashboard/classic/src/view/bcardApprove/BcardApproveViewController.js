Ext.define('Admin.view.bcardApprove.BcardApproveViewController', {
    extend: Ext.app.ViewController,
    alias: 'controller.bcardApproveViewController',
    //1.签收任务
    onClickLeaveApproveClaimButton: function(view, recIndex, cellIndex, item, e, record) {
        Ext.Ajax.request({
            url: 'bcard/claim/' + record.get('taskId'),
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
			xtype: 'bcardApproveWindow',
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
        if (taskDefinitionKey == 'attenceDeptLeaderAudit') {
            //部门领导审批
            var win = this.setCurrentView(view,taskDefinitionKey, '部门领导审批');
            win.down('form').getForm().loadRecord(record);
        } 
        else if (taskDefinitionKey == 'attenceReportBack') {
        	//申请人销假
        	var win = this.setCurrentView(view,taskDefinitionKey,'确认表单');
        	win.down('form').getForm().loadRecord(record);
        }
        else if (taskDefinitionKey == 'attencemodifyApply') {
        	//申请人调整申请：可以编写到工具类中
        	var win = this.setCurrentView(view,taskDefinitionKey,'调整补卡表单');
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
                        Ext.data.StoreManager.lookup('bcardApproveStore').load();
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
    	var url = 'bcard/complete/' + values.taskId;
    	var variables = [{
			key: 'attencedeptLeaderPass',
			value: values.attencedeptLeaderPass,//获取表单选择的value
			type: 'B'
		},{
			key: 'deptLeaderBackReason',
			value: values.deptLeaderBackReason,//获取表单选择的value
			type: 'S'
		},{
            key: 'approval',
            value: values.approval,//获取表单选择的value
            type: 'S'
        }];
        this.complete(url,variables,form);
    },
  //   //人事文员审批
  //   onClickHrAuditFormSubmitButton: function(btn) {
  //       var form = btn.up('form');
  //   	var values = form.getValues();
  //   	var url = 'bcard/complete/' + values.taskId;
  //   	var variables = [{
		// 	key: 'hrPass',
		// 	value: values.hrPass,//获取表单选择的value
		// 	type: 'B'
		// },{
		// 	key: 'hrBackReason',
		// 	value: values.hrBackReason,//获取表单选择的value
		// 	type: 'S'
		// }];
  //       this.complete(url,variables,form);
  //   },
    //销假
    onClickReportBackFormSubmitButton: function(btn) {
    	var form = btn.up('form');
     	var values = form.getValues();
     	var url = 'bcard/complete/' + values.taskId;
     	var variables = [{
 			key: 'realityStartTime',
 			value: values.realityStartTime,//获取表单选择的value
 			type: 'D'
 		},{
 			key: 'realityEndTime',
 			value: values.realityEndTime,//获取表单选择的value
 			type: 'D'
 		}];
        this.complete(url,variables,form);
    },
    //调整申请
    onClickModifyApplyFormSubmitButton: function(btn) {
        var form = btn.up('form');
    	var values = form.getValues();
    	var url = 'bcard/complete/' + values.taskId;
    	var variables = [{
			key: 'attencereApply',
			value: values.attencereApply,//获取表单选择的value
			type: 'B'
		},{
			key: 'empName',
			value: values.empName,//获取表单选择的value
			type: 'S'
		},{
            key: 'empNo',
            value: values.empNo,//获取表单选择的value
            type: 'S'
        },{
            key: 'calendar',
            value: values.calendar,//获取表单选择的value
            type: 'S'
        },{
			key: 'ontudytime',
			value: values.ontudytime,//获取表单选择的value
			type: 'D'
		},{
			key: 'offdutytime',
			value: values.offdutytime,//获取表单选择的value
			type: 'D'
		},{
            key: 'workDate',
            value: values.workDate,//获取表单选择的value
            type: 'D'
        },{
			key: 'reason',
			value: values.reason,//获取表单选择的value
			type: 'S'
		}];
        this.complete(url,variables,form);
    },
    //流程跟踪
    onClickGraphTraceButton : function(view, recIndex, cellIndex, item, e, record) {
        var diagramResourceUrl = 'process-trace?processInstanceId=' + record.get('processInstanceId');
        var win = new Ext.window.Window({
            title: '流程跟踪',
            width : 860,
            height : 500,
            layout: 'fit',
            items:[new Ext.Panel({         
               resizeTabs :true,
               autoScroll : true,
               html:'<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src='+diagramResourceUrl+'></iframe>'
           })]
        });
        win.show();
    }
});