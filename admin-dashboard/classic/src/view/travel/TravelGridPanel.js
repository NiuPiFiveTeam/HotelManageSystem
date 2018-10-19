Ext.define('Admin.view.travel.TravelGridPanel', {
	extend: 'Ext.panel.Panel',
	xtype: 'travelGridPanel',
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
		title: 'TravelGrid Results',
		//routeId: 'user',
		bind: '{travelLists}',
		scrollable: false,
		selModel: {type: 'checkboxmodel'},
		columns: [
			 {header: 'travelId',dataIndex:'travelId',width: 60,sortable: true,hidden:true}
			 ,{header: '部门',dataIndex: 'deptName',flex:1}
			,{header: '员工姓名',dataIndex: 'empName',flex:1,sortable: true}
			,{header: '员工编号',dataIndex: 'empNo',flex:1}
			,{header: '开始时间',dataIndex: 'traStartTime',flex:1,sortable: true,renderer:Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
			,{header: '结束时间',dataIndex: 'traEndTime',flex:1,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
			,{header: '出差内容',dataIndex: 'process',flex:1.5}
			,{header: '派发人',dataIndex: 'approval',flex:1}
			,{header: '补发工资',dataIndex: 'allowance',flex:1}
			// ,{header: 'realityStartTime',dataIndex: 'realityStartTime',width: 60,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
			// ,{header: 'realityEndTime',dataIndex: 'realityEndTime',width: 60,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
			,{header: '派发时间',dataIndex: 'applyTime',width: 180,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
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
		tbar: [{
			xtype: 'combobox',
			reference:'searchFieldName',
			hideLabel: true,
			store:Ext.create("Ext.data.Store", {
				fields: ["name", "value"],
				data: [{ name: '出差时间', value: 'leaveTime' }]
			}),
			displayField: 'name',
			valueField:'value',
			value:'leaveTime',
			editable: false,
			queryMode: 'local',
			triggerAction: 'all',
			emptyText: 'Select a state...',
			width: 135,
			listeners:{
				select: 'searchComboboxSelectChuang'
			}
		}, '-',{
			xtype: 'datefield',
			hideLabel: true,
			//hidden:true,
			format: 'Y/m/d H:i:s',
			reference:'searchDataFieldValue',
			fieldLabel: 'From',
			name: 'from_date'
		}, {
			xtype: 'datefield',
			hideLabel: true,
			//hidden:true,
			format: 'Y/m/d H:i:s',
			reference:'searchDataFieldValue2',
			fieldLabel: 'To',
			name: 'to_date'
		},'-',{
			text: 'Search',
			iconCls: 'fa fa-search',
			handler: 'quickSearch'
		}, '-',{
			text: 'Search More',
			iconCls: 'fa fa-search-plus',
			handler: 'openSearchWindow'	
		}, '->',{
			text: 'Add',
			tooltip: 'Add a new row',
			iconCls: 'fa fa-plus',
			handler: 'openAddWindow'	
		},'-',{
			text: 'Removes',
			tooltip: 'Remove the selected item',
			iconCls:'fa fa-trash',
			itemId: 'travelGridPanelRemove',
			disabled: true,
			handler: 'deleteMoreTravelRows'	
		}],			
		dockedItems: [{
			xtype: 'pagingtoolbar',
			dock: 'bottom',
			displayInfo: true,
			bind: '{travelLists}'
		}],
		listeners: {
			selectionchange: function(selModel, selections){
				this.down('#traveGridPanelRemove').setDisabled(selections.length === 0);
			}
		}		
	}]
});