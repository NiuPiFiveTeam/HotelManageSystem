Ext.define('Admin.view.bcardApprove.BcardApproveGrid', {
    extend: 'Ext.grid.Panel',
	xtype:'bcardApproveGrid',
	// title: 'tiele',		//需要修改
	// iconCls: 'fa-arrow-circle-o-up',
	controller: 'bcardApproveViewController',
    viewModel : { type: 'bcardApproveViewModel'},
	bind: '{bcardApproveStore}',//调用组件4
	//align:'center' ,
	columns: [{
			xtype: 'actioncolumn',
			items: [{
				xtype: 'button',
				iconCls: 'x-fa fa-pencil',
				tooltip: '签收任务',
				getClass: function(v, meta, rec) {
		            if (rec.get('assignee')!='') {
		                  return 'x-hidden';
		            }
		            return 'x-fa fa-pencil';
				},
				handler: 'onClickLeaveApproveClaimButton'	//ajax  taskId
			},{
				xtype: 'button',
				iconCls: 'x-fa fa-edit',
				tooltip: '审批任务',
				getClass: function(v, meta, rec) {
		            if (rec.get('assignee')=='') {
		                  return 'x-hidden';
		            }
		            return 'x-fa fa-edit';
				},
				handler: 'onClickLeaveApproveCompleteWindowButton'	//taskDefinitionKey 动态表单
			},{
				xtype: 'button',
				iconCls: 'x-fa fa-object-group',
				tooltip: '任务跟踪',
				handler: 'onClickGraphTraceButton'	//流程跟踪
			}],
			cls: 'content-column',
			width: 100,
			dataIndex: 'bool',
			text: '操作',
			tooltip: 'edit '
		}
		,{header: 'id' 			,dataIndex: 'id',width: 60,sortable: true	,hidden:true}
		,{header: '流程状态',dataIndex: 'processStatus',width: 100,sortable: true,
            renderer: function(val) {
	            if (val =='NEW') {
		            return '<span style="color:green;">新建</span>';
		        } else if (val =='APPROVAL') {
		            return '<span style="color:blue;">审批中...</span>';
		        } else if (val =='COMPLETE') {
		            return '<span style="color:orange;">完成审批</span>';
		        }else{
		        	return '<span style="color:red;">取消申请</span>';
		        }
		        return val;
            }
		}
		,{header: 'userId',dataIndex: 'userId',width: 60,hidden:true,sortable: true}
		,{header: '部门',dataIndex: 'deptName',width: 100,sortable: true}
		,{header: '员工姓名' ,dataIndex: 'empName',width: 100,sortable: true}
		,{header: '员工编号'  ,dataIndex: 'empNo',width: 100,sortable: true}
		,{header: '开始时间' ,dataIndex: 'ontudytime',width: 100,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
		,{header: '结束时间' ,dataIndex: 'offdutytime',width: 100,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
		,{header: '理由' 		,dataIndex: 'reason',width: 80,sortable: true}
		,{header: '上班日期'  	,dataIndex: 'workDate',width: 80,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d')}
        ,{header: '申请时间' 	,dataIndex: 'applyTime',width: 100,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
        ,{header: '签办人'  		,dataIndex: 'assignee',width: 80,sortable: true}
		,{header: '批准开始时间' 	,dataIndex: 'realityStartTime',width: 100,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
		,{header: '批准结束时间' 	,dataIndex: 'realityEndTime',width: 100,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
		,{header: 'processInstanceId' ,dataIndex: 'processInstanceId',width: 80,hidden:true,sortable: true}
		,{header: 'taskId'  		,dataIndex: 'taskId',width: 80,hidden:true,sortable: true}
		,{header: '任务名称'  		,dataIndex: 'taskName',width: 80,sortable: true}
		,{header: 'taskCreateTime'  ,dataIndex: 'taskCreateTime',width: 150,hidden:true,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
		
		,{header: 'taskDefinitionKey',dataIndex: 'taskDefinitionKey',width: 80,hidden:true,sortable: true}
		,{header: 'processDefinitionId'	,dataIndex: 'processDefinitionId',width: 80,hidden:true,sortable: true}
		,{header: 'suspended'  		,dataIndex: 'suspended',width: 80,hidden:true,sortable: true}
		,{header: 'version'  		,dataIndex: 'version',width: 60,hidden:true,sortable: true}
	],
	dockedItems: [{
	    xtype: 'pagingtoolbar',
	    dock: 'bottom',
		bind: '{leaveApproveStore}',	//调用组件4
	    displayInfo: true,
	    items: ['-',{
	    	xtype:'button',
            text: 'Add',
            iconCls: 'x-fa fa-plus',
			listeners: {
				click: 'onClickLeaveApproveGridAddButton'
            }
        }, '-',{
        	xtype:'button',
            text: 'Update',
            iconCls: 'x-fa fa-pencil',
            listeners: {
				click: 'onClickLeaveApproveGridUpdateButton'
            }
        }, '-', {
        	xtype:'button',
            text: 'Delete',
            iconCls: 'x-fa fa-close',
			listeners: {
				click: 'onClickLeaveApproveGridDeleteButton'
            }
        }]
	}]
});
