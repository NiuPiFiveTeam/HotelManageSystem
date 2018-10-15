Ext.define('Admin.view.finance.cost.inStorage.InStorageApplyGrid', {
    extend: 'Ext.tab.Panel',
    xtype: 'inStorageApplyGrid',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date',

        'Ext.form.field.ComboBox',  //下拉列表框
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.RowNumberer'
    ],

    layout: 'fit',
    items: [{
            xtype: 'gridpanel',
            selType: 'checkboxmodel',   //复选框
            title: '入库审批',
            scrollable: true,  //可滚动的
            headerBorders: true, //边框
            bind: '{inStorageApplyStore}',
            columns: [{             //hidden:true
            	xtype:'actioncolumn',
            	cls:'content-column',
            	width:120,
            	// dataIndex:'bool', 未知数据
            	text:'Actions',
            	tooltip:'edit',
            	items:[{
            		xtype:'button',
            		iconCls:'x-fa fa-pencil',
	            	tooltip:'签收任务',
	            	getClass:function(v,meta,rec){
	            		if(rec.get('assignee')!=''){
	            			return 'x-hidden';
	            		}
            			return 'x-fa fa-pencil';
            		},
            		handler:'InStorageClaimButton'
            	},{
            		xtype:'button',
            		iconCls:'x-fa fa-edit',
	            	tooltip:'审批任务',
	            	getClass:function(v,meta,rec){
	            		if(rec.get('assignee')==''){
	            			return 'x-hidden';
	            		}
            			return 'x-fa fa-edit';
            		},
            		handler:'InStorageCompleteWindowButton'
            	},{
            		xtype:'button',
            		iconCls:'x-fa fa-object-group',
            		tooltip:'任务跟踪',
            		// handler: 'onClickGraphTraceButton'	//流程跟踪
            	}]
            },{
            	header:'inStorageId',
            	dataIndex:'inStorageId',
            	sortable:'true'
            },{
            	header:'processStatus',
            	dataIndex:'processStatus',
            	sortable:'true',
            	renderer:function(val){
            		if(val=='NEW'){
            			return '<span style="color:green;">新建</span>';
            		}else if(val=='APPROVAL'){
            			return '<span style="color:blue;">审批中...</span>';
        			}else if(val=='COMPLETE'){
        				return '<span style="color:orange;">完成审批</span>';
        			}else{
        				return '<span style="color:red;">取消审批</span>';
        			}
        			return val;
            	}
            },{
            	header:'入库员工',
            	dataIndex:'employeeId',
            	sortable: true
            },{
            	header:'入库时间',
            	dataIndex:'inStorageDate',
            	sortable: true,
            	renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')
            },{
            	header:'供货商',
            	dataIndex:'vender',
            	sortable: true
            },{
            	header:'总金额',
            	dataIndex:'amount',
            	sortable: true
            },{
            	header:'申请时间',
            	dataIndex:'applyTime',
            	sortable: true
            },{
            	header:'总金额',
            	dataIndex:'amount',
            	sortable: true
            },{ 
            	header: 'processInstanceId' ,
                dataIndex: 'processInstanceId',
                sortable: true
            },{ 
            	header: 'taskId' ,
            	dataIndex: 'taskId',
            	sortable: true
            },{
            	header: 'taskName',
            	dataIndex: 'taskName',
            	sortable: true
            },{
            	header: 'taskCreateTime'  ,
                dataIndex: 'taskCreateTime',
                sortable: true,
                renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')
            },{
            	header: 'assignee',
            	dataIndex: 'assignee',
            	sortable: true
            },{
            	header: 'taskDefinitionKey',
            	dataIndex: 'taskDefinitionKey',
            	sortable: true
            },{
            	header: 'processDefinitionId',
            	dataIndex: 'processDefinitionId',
            	width: 80,
            	sortable: true
            },{
            	header: 'suspended',
	            dataIndex: 'suspended',
	            width: 80,
	            sortable: true
	        },{
	        	header: 'version' ,
	        	dataIndex: 'version',
	        	width: 60,
	        	sortable: true
	        }],

        
        	
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                bind: '{inStorageApplyStore}'
            }]
    }]
});

