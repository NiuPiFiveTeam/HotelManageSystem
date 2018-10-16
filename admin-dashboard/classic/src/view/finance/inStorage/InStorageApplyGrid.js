Ext.define('Admin.view.finance.inStorage.InStorageApplyGrid', {
    extend: 'Ext.panel.Panel',
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
            selType: 'checkboxmodel',   
            scrollable: true,
            bind: '{inStorageApplyStore}',
            columns: [{
            	header:'入库单号',
            	dataIndex:'inStorageId',
                flex:1
            },{
            	header:'入库员工',
            	dataIndex:'employeeId',
                align:'center',
                flex:1
            }
            // ,{
            // 	header:'入库时间',
            // 	dataIndex:'inStorageDate',
            // 	sortable: true,
            // 	renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')
            // }
            ,{
            	header:'供货商',
            	dataIndex:'vender',
                align:'center',
                flex:1
            },{
            	header:'金额',
            	dataIndex:'amount',
                align:'center',
                flex:1
            },{
            	header:'申请时间',
            	dataIndex:'applyTime',
                align:'center',
                flex:1
            }
            // ,{ 
            // 	header: 'processInstanceId' ,
            //     dataIndex: 'processInstanceId',
            //     sortable: true
            // }
            ,{ 
            	header: 'taskId' ,
            	dataIndex: 'taskId',
                hidden:true
            }
            // ,{
            // 	header: 'taskName',
            // 	dataIndex: 'taskName',
            // 	sortable: true
            // }
            ,{
            	header: '任务创建时间'  ,
                dataIndex: 'taskCreateTime',
                renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s'),
                align:'center',
                flex:1
            },{
            	header: '签收人',
            	dataIndex: 'assignee',
                align:'center',
                flex:1
            },{
            	header: '任务节点id',
            	dataIndex: 'taskDefinitionKey',
                align:'center',
                flex:1
            },{
                header:'申请状态',
                dataIndex:'processStatus',
                sortable:'true',
                flex:1,
                align:'center',
                renderer:function(val){
                    if(val=='NEW'){
                        return '<span style="color:green;">未申请</span>';
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
                xtype:'actioncolumn',
                cls:'content-column',
                width:120,
                text:'操作',
                tooltip:'edit',
                flex:1,
                align:'center',
                items:[{
                    xtype:'button',
                    iconCls:'x-fa fa-edit',
                    tooltip:'申请入库批准',
                    getClass:function(v,meta,rec){
                        if(rec.get('processStatus')=='NEW'){
                             return 'x-fa fa-edit';
                        }
                        return 'x-hidden';
                    },
                    handler:'InStorageCompleteWindowButton'
                },{
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
                        if(rec.get('assignee')=='' && rec.get('processStatus')!='NEW'){
                            return 'x-hidden';
                        }
                        return 'x-fa fa-edit';
                    },
                    handler:'InStorageCompleteWindowButton'
                },{
                    xtype:'button',
                    iconCls:'x-fa fa-object-group',
                    tooltip:'任务跟踪',
                    // handler: 'onClickGraphTraceButton'   //流程跟踪
                }]
            }
         //    ,{
         //    	header: 'processDefinitionId',
         //    	dataIndex: 'processDefinitionId',
         //    	width: 80,
         //    	sortable: true
         //    },{
         //    	header: 'suspended',
	        //     dataIndex: 'suspended',
	        //     width: 80,
	        //     sortable: true
	        // },{
	        // 	header: 'version' ,
	        // 	dataIndex: 'version',
	        // 	width: 60,
	        // 	sortable: true
	        // }
            ],
            tbar: ['->',{
                text:'一键签收'
            },'-', {
                text:'入库申请',
                handler:'openAddInStoreOrderWindow'
            }],
        
        	
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                bind: '{inStorageApplyStore}'
            },{

            }]
    }]
});

