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
            cls: 'inStorageApplyGrid',
            scrollable: true,
            bind: '{inStorageApplyStore}',
            columns: [{
            	header:'入库单号',
            	dataIndex:'inStorageId',
                flex:0.8
            },{
                header:'申请时间',
                dataIndex:'applyTime',
                renderer: Ext.util.Format.dateRenderer('Y/m/d H:i'),
                align:'center',
                flex:1
            },{
            	header:'申请人',
            	dataIndex:'employeeId',
                align:'center',
                flex:0.7
            },{
                header: '签收人',
                dataIndex: 'assignee',
                align:'center',
                flex:0.7
            },{
            	header:'入库时间',     //隐藏
            	dataIndex:'inStorageDate',
                hidden:true,
            	renderer: Ext.util.Format.dateRenderer('Y/m/d H:i')
            },{ 
            	header: 'taskId' , //隐藏
            	dataIndex: 'taskId',
                hidden:true
            },{
                header: '流程实例id',//隐藏
                dataIndex: 'processInstanceId',//获取流程实例[跟踪流程图]
                hidden:true
            },{
            	header: '任务节点id',  //隐藏
            	dataIndex: 'taskDefinitionKey',
                hidden:true
            },{
                header: '任务节点', //隐藏
                dataIndex: 'taskName',
                hidden:true
            },{     
                xtype:'actioncolumn',   //流程跟踪
                cls:'content-column',
                width:120,
                text:'查看流程进度',
                tooltip:'edit',
                flex:0.8,
                align:'center',
                items:[{
                    xtype:'button',
                    iconCls:'x-fa fa-image',
                    getClass:function(v,meta,rec){
                        if(rec.get('processInstanceId') ==''){
                            return 'x-hidden';
                        }else{
                            return 'x-fa fa-image';
                        }
                    },
                    tooltip:'任务跟踪',
                    handler: 'onClickGraphTraceButton' 
                }]
            },{
                header:'审批状态',
                dataIndex:'processStatus',
                flex:1.2,
                align:'center',
                renderer:function(value, metaData, record){
                    if(value=='NEW'){
                        return record.get('taskName') + '<span style="color:green;">待申请</span>';
                        // '<span style="color:green;">待申请...</span>';
                    }else if(value=='UNRECEIPTED'){
                        return '[' + record.get('taskName') + ']' +  '<span style="color:blue;">待签收...</span>';
                    }else if(value=='APPROVAL'){
                        return '[' + record.get('taskName') + ']' +  '<span style="color:red;">审批中...</span>';
                    }else if(value=='COMPLETE'){
                        return '<span style="color:#C71585">已完成</span>';
                    }else if(value=='CANCEL'){
                        return '<span style="color:red;">已销毁</span>';
                    }
                    return value;
                }
            },{ 
                xtype:'actioncolumn',
                cls:'content-column',
                width:120,
                text:'操作',
                tooltip:'edit',
                flex:0.4,
                align:'center',
                items:[{
                    xtype:'button',
                    iconCls:'x-fa fa-address-card-o',
                    tooltip:'申请入库',
                    getClass:function(v,meta,rec){
                        if (rec.get('processStatus') == 'NEW') {    //新建状态，直接显示[申请入库]
                            return 'x-fa fa-address-card-o';
                        }
                        return 'x-hidden';
                    },
                    handler:'InStorageApplyButton'
                },{
                    xtype:'button',
                    iconCls:'x-fa fa-edit',
                    tooltip:'签收任务',
                    getClass:function(v,meta,rec){
                        if (rec.get('processStatus') == 'NEW') {
                            return 'x-hidden';
                        }else{
                            if (rec.get('taskId') == '') {
                                return 'x-hidden';
                            }else{
                                if(rec.get('assignee') == '' ){
                                    return 'x-fa fa-edit';
                                }else{
                                    return 'x-hidden';
                                }
                            } 
                        }
                    },
                    handler:'InStorageClaimButton'
                },{
                    xtype:'button',
                    iconCls:'x-fa fa-pencil',
                    tooltip:'审批任务',
                    getClass:function(v,meta,rec){
                        if (rec.get('processStatus') == 'NEW') {
                            return 'x-hidden';
                        }else{
                            if (rec.get('taskId') == '') {
                                return 'x-hidden';
                            }else{
                                if(rec.get('assignee') == '' ){
                                    return 'x-hidden';
                                }else{
                                    if(rec.get('taskName') == '出纳付款'){
                                        return 'x-hidden';
                                    }else{
                                        return 'x-fa fa-pencil';
                                    }
                                    
                                }
                            } 
                        }
                    },
                    handler:'InStorageCompleteWindowButton'
                }]
            },{
                xtype:'actioncolumn',
                cls:'content-column',
                text:'入库详情',
                tooltip:'edit',
                flex:0.6,
                align:'center',
                items:[{
                    xtype:'button',
                    iconCls:'x-fa fa-truck',
                    tooltip:'查看详细入库情况',
                    handler:'showInstorageDetailed'
                }]
            },{
                header:'金额',
                dataIndex:'amount',
                align:'center',  
                flex:0.6
            },{
                header:'供货商',
                dataIndex:'vender',
                align:'center',
                flex:0.8
            }],
            tbar: ['->',{
                text:'一键签收'
            },'-', {
                text:'入库申请',
                // handler:'openAddInStoreOrderWindow'
            }],
        
        	
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                bind: '{inStorageApplyStore}'
            }]
    }]
});

