Ext.define('Admin.view.finance.inStorage.InStorageApplyViewController',{
	extend:Ext.app.ViewController,
	alias:'controller.inStorageApplyViewController',


    //添加入库申请
    openAddInStoreOrderWindow:function(toolbar, rowIndex, colIndex){
        toolbar.up('panel').up('container').add(Ext.widget('addInStoreOrderWindow')).show();
    },

// openAddWindow:function(){
//         var win = this.lookupReference('AddEmpWindow');
//         if (!win) {
//             win = new Admin.view.employ.addEmp.AddEmpWindow();
//             this.getView().add(win);
//         }
//         win.show();
//     },




	//1.签收任务
	InStorageClaimButton:function(view,recIndex,cellIndex,item,e,record){
		Ext.Ajax.request({
			url:'inStorage/claim/'+record.get('taskId'),
			method:'post',
			success:function(response,options){
				var json = Ext.util.JSON.decode(response.responseText);
				if(json.success){
					Ext.Msg.alert('操作成功',json.msg,function(){
						view.getStore().reload();
					});
				}else{
					Ext.Msg.alert('操作失败',json.msg);
				}
			}
		});
	},
	//2.弹出审批窗口
	InStorageCompleteWindowButton: function(view, recIndex, cellIndex, item, e, record) {
		//选中点击的行 taskDefinitionKey == logisticstAudit
		var taskDefinitionKey = record.get('taskDefinitionKey');
		if(taskDefinitionKey == 'logisticstAudit'){
			//后勤主管审批
			var win = this.setCurrentView(view,taskDefinitionKey,'后勤主管审批');
			win.down('form').getForm().loadRecord(record);
		}else if(taskDefinitionKey == 'contactSupplier'){
            //联系供货方
            var win = this.setCurrentView(view,taskDefinitionKey,'联系供货方');
            win.down('form').getForm().loadRecord(record);
        }else if(taskDefinitionKey == 'financeAudit'){
            //财务审批
            var win = this.setCurrentView(view,taskDefinitionKey,'财务审批');
            win.down('form').getForm().loadRecord(record);
        }else if(taskDefinitionKey == 'pay'){
            //出纳付款
            var win = this.setCurrentView(view,taskDefinitionKey,'财务审批');
            win.down('form').getForm().loadRecord(record);
        }else if(taskDefinitionKey == 'confirmReceipt'){
            //出纳付款
            var win = this.setCurrentView(view,taskDefinitionKey,'收货确认');
            win.down('form').getForm().loadRecord(record);
        }else if(taskDefinitionKey == 'financeManagerAudit'){
            //出纳付款
            var win = this.setCurrentView(view,taskDefinitionKey,'财务经理审批(金额过大)');
            win.down('form').getForm().loadRecord(record);
        }else{
			Ext.Msg.alert('无人审批','无人审批 无人审批');
		}
	},
	//2.创建审批表单（并绑定Task id）
    setCurrentView:function(view,form,title){
    	var cfg = Ext.apply({
    		xtype:'inStorageApplyWindow',
    		items:[{xtype:form}]
    	},{
    		title:title
    	});
    	var win = Ext.widget(cfg);
    	view.up('container').add(win);
    	return win;
    },
    //3.后勤主管审批
    LogisticstFormSubmitButton:function(btn){
    	var form = btn.up('form');
    	var values = form.getValues();
    	var url = 'inStorage/complete/'+values.taskId;
    	var variables=[{
    		key:'logisticstManagerPass',
    		value:values.logisticstManagerPass,
    		type:'B'
    	},{
    		key:'logisticstBackReason',
    		value:values.logisticstBackReason,
    		type:'S'
    	}];
    	this.complete(url,variables,form);
    },
    //4.联系供货方
    contactSupplierSubmitButton:function(btn){
        var form = btn.up('form');
        var values = form.getValues();
        var url = 'inStorage/complete/'+values.taskId;
        var variables=[{
            key:'amountMoney',
            value:values.amountMoney, 
            type:'N'
        }];
        this.complete(url,variables,form);
    },
    //5.财务部门审批
    FinanceFormSubmitButton:function(btn){
        var form = btn.up('form');
        var values = form.getValues();
        var url = 'inStorage/complete/'+values.taskId;
        var variables=[{
            key:'financeClerkPass',
            value:values.financeClerkPass, 
            type:'B'
        },{
            key:'financeBackReason',
            value:values.financeBackReason,
            type:'S'
        }];
        this.complete(url,variables,form);
    },
    //6.出纳付款
    paySubmitButton:function(btn){
        var form = btn.up('form');
        var values = form.getValues();
        var url = 'inStorage/complete/'+values.taskId;
        var variables=[];
        this.complete(url,variables,form);
    },
    //7.收货确认
    ConfirmReceiptSubmitButton:function(btn){
        var form = btn.up('form');
        var values = form.getValues();
        var url = 'inStorage/complete/'+values.taskId;
        var variables=[];
        this.complete(url,variables,form);
    },
    //7.财务经理审批
    FinanceManagerFormSubmitButton:function(btn){
        var form = btn.up('form');
        var values = form.getValues();
        var url = 'inStorage/complete/'+values.taskId;
        var variables=[{
            key:'financeManagerPass',
            value:values.financeManagerPass, 
            type:'B'
        },{
            key:'financeBackReason',
            value:values.financeBackReason,
            type:'S'
        }];
        this.complete(url,variables,form);
    },
    //封装审批表单数据,并以Ajax提交到后台完成任务的流程变量封装对象中。
    complete:function(url,variables,form){
    	//转换JSON为字符串
    	var keys="", values="", types="";
    	if(variables){
    		Ext.each(variables,function(item){
    			if(keys != ""){
    				keys+=",";
    				values+=",";
    				types+=",";
    			}
    			keys+=item.key;
    			values+=item.value;
    			types+=item.type;
    		});
    	}
    	Ext.Ajax.request({
    		url:url,
    		method:'post',
    		params:{
    			keys:keys,
    			values:values,
    			types:types
    		},
    		success:function(response,options){
    			var json = Ext.util.JSON.decode(response.responseText);
    			if(json.success){					
    				Ext.Msg.alert('操作成功',json.msg,function(){
    					form.up('window').close();
    					Ext.data.StoreManager.lookup('inStorageApplyStore').load();
    				});
    			}else{
    				Ext.Msg.alert('操作失败',json.msg);
    			}
    		}
    	});
    }
})