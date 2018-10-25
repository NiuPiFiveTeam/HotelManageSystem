Ext.define('Admin.view.bcard.BcardGridPanel', {
	extend: 'Ext.panel.Panel',
	xtype: 'bcardGridPanel',
	controller: 'bcardViewController',
    viewModel: {type: 'bcardViewModel'},
	requires: [
		'Ext.grid.Panel',
		'Ext.toolbar.Paging',
		'Ext.form.field.ComboBox',
		'Ext.selection.CheckboxModel',
		'Ext.form.field.Date',
		'Ext.grid.column.Date'
	],
	layout: 'fit',
	items: [{
		xtype: 'gridpanel',
		bind: '{bcardLists}',
		scrollable: false,
		selModel: {type: 'checkboxmodel'},
		columns: [
			 {header: 'bCardid',dataIndex:'bCardid',width: 60,sortable: true,hidden:true}
			 ,{header: '部门',dataIndex: 'deptName',flex:1}
			,{header: '员工姓名',dataIndex: 'empName',flex:1,sortable: true}
			,{header: '员工编号',dataIndex: 'empNo',flex:1}
			,{header: '班次',dataIndex: 'calendar',flex:1,

				renderer: function(val) {
		            if (val =='A') {
			            return '<span style="color:green;">白班</span>';
			        } else if (val =='B') {
			            return '<span style="color:blue;">夜班</span>';
			        } else if (val =='C') {
			            return '<span style="color:orange;">加班</span>';
			        }
			        return val;
	            }
			}
			,{header: '上班日期',dataIndex: 'workDate',flex:1,renderer:Ext.util.Format.dateRenderer('Y/m/d')}
			,{header: '上班时间',dataIndex: 'ontudytime',flex:1,sortable: true,renderer:Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
			,{header: '下班时间',dataIndex: 'offdutytime',flex:1,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
			,{header: '内容',dataIndex: 'reason',flex:1.5}
			,{header: '审批人',dataIndex: 'approval',flex:1}
			
			// ,{header: 'realityStartTime',dataIndex: 'realityStartTime',width: 60,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
			// ,{header: 'realityEndTime',dataIndex: 'realityEndTime',width: 60,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
			,{header: '派发时间',dataIndex: 'applyTime',width: 140,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
			// ,{header: 'processInstanceId' ,dataIndex: 'processInstanceId',width: 180,sortable: true}
			,{header: '流程状态',dataIndex: 'processStatus',flex:1.5,
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
			,{xtype: 'actioncolumn',cls: 'content-column', flex:1.5,text: '操作',tooltip: 'edit ',
				items: [
					{xtype: 'button', iconCls: 'x-fa fa-pencil',handler: 'openEditWindow',tooltip:'修改请假申请'},
					{xtype: 'button',iconCls: 'x-fa fa-close',handler: 'deleteOneTravelRow',tooltip:'删除请假申请'},
					{
		                xtype: 'button',iconCls: 'x-fa fa-star',tooltip: '发起派发',
		                getClass: function(v, meta, rec) {
		                    if (rec.get('processInstanceId')!="") {
		                        return 'x-hidden';
		                    }
		                    return 'x-fa fa-star';
		                },
		                handler: 'starLeaveProcess'
		            },{
		                xtype: 'button',iconCls: 'x-fa fa-ban',tooltip: '取消',
		                getClass: function(v, meta, rec) {
		                    if (rec.get('processInstanceId')=="") {
		                        return 'x-hidden';
		                    }
		                    return 'x-fa fa-ban';
		                },
		                handler: 'cancelLeaveProcess'
		            }
				]
			}
		],	
		dockedItems: [{
			xtype: 'pagingtoolbar',
			dock: 'bottom',
			displayInfo: true,
			bind: '{bcardLists}'
		},{
            xtype:'toolbar',
            dock:'top',
            items:[
            {
                xtype: 'datefield',
                fieldLabel: '请选择时间',
                format: 'Y-m-d',
                reference:'searchDataFieldValue2',
                name: 'to_date'
            },'-',{
                xtype:'button',
                text: '快速查询',
                iconCls: 'fa fa-search',
                style:'background:#;',
                handler: 'quickSearch'
            }, '-',{
                xtype:'button',
                text: '显示全部',
                iconCls: 'fa fa-search-plus',
                style:'background:#;',
                handler: 'openSearchWindow' 
            }, '->',{
                xtype:'button',
                text: '补卡申请',
                iconCls: 'fa fa-plus',
                style:'background:#;',
                handler: 'openbcardAddWindow' 
            }, '-',{
                xtype:'button',
                text: '批量导出',
                iconCls: 'fa fa-refresh',
                style:'background:#;',
                handler: 'exportExcel'

            }
            ]
        }],
		listeners: {
			selectionchange: function(selModel, selections){
				this.down('#traveGridPanelRemove').setDisabled(selections.length === 0);
			}
		}		
	}]
});