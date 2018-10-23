Ext.define('Admin.view.logistics.roomClean.InventoryPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'inventoryPanel',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
    ],
    cls: 'shadow',
    activeTab: 0,

    items: [

        // {
        //     xtype: 'gridpanel',
        //     cls: 'user-grid',
        //     title: '申请进货',
        //     bind: '{InSend}',
        //     scrollable: false,
        //     viewConfig:{
        //         forceFit:false,
        //         emptyText:"<div style='text-align:center;padding:8px;font-size:16px;'>无申请进货记录</div>",
        //         deferEmptyText:false,},
        //     columns: [
        //         {xtype: 'gridcolumn',width: 60,dataIndex: 'inStorageId',text: '入库编号',align:'center',flex: 1,},
        //         {xtype: 'datecolumn',cls: 'content-column',width: 120,dataIndex: 'applyTime',text: '处理日期',align:'center',flex: 1,formatter: 'date("Y/m/d H:i:s")'},
        //         {xtype: 'datecolumn',cls: 'content-column',width: 120,dataIndex: 'doDate',text: '申请日期',align:'center',flex: 1,formatter: 'date("Y/m/d H:i:s")'},
        //         {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'amount', text: '总价', align:'center',flex: 1,},
        //         {xtype: 'gridcolumn',width: 60,dataIndex: 'sendWorker',text: '申请员工',align:'center',flex: 1,},
        //         {xtype: 'actioncolumn',cls: 'content-column', width: 150,dataIndex: 'bool',text: '申请明细表',align:'center',}
        //     ],
        //     tbar:[
        //         '->',{
        //             text: '未处理申请',
        //             tooltip: '未处理申请',
        //             reference:'doNot',
        //             handler: 'doNot'
        //         },'->'
        //     ],
        //     dockedItems: [{
        //         xtype: 'pagingtoolbar',
        //         dock: 'bottom',
        //         itemId: 'userPaginationToolbar',
        //         displayInfo: true,
        //         bind: '{InSend}'
        //     }]
        // },

        {
            xtype: 'gridpanel',
            cls: 'user-grid',
            title: '库存',
            id:"Stock",
            bind: '{Stock}',
            scrollable: false,
            viewConfig:{
                forceFit:false,
                emptyText:"<div style='text-align:center;padding:8px;font-size:16px;'>无查询记录</div>",
                deferEmptyText:false,},
            columns: [
                {xtype: 'gridcolumn',width: 60,dataIndex: 'id',text: '编号',align:'center'},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'goodsName',text: '商品名', align:'center',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'unit',  text: '单位', align:'center',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'amount',  text: '数量', align:'center',flex: 1,
                renderer: function(val, metadata, r, rowIndex, colIndex, store) {
		            if (val <=10) {
                        if(r.data.yesOrNoSend=='未申请'){
                            return '<span style="color:red;font-weight:800;">'+val+'</span>';
                        }
                        if(r.data.yesOrNoSend=='已申请'){
                            return '<span style="color:#D9B300;font-weight:800;">'+val+'</span>';
                        }
			        } 
			        return val;
                },
                },
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'stockType',  text: '类型', align:'center',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'goodsNo',  text: '物品编号', align:'center',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'yesOrNoSend',  text: '库存状态', align:'center',flex: 1,reference:'yesOrNo',
                renderer: function(val) {
		            if (val =='未申请') {
			            return '<span style="color:red;font-weight:800;">'+val+'入库'+'</span>';
                    } 
                    if (val =='已申请') {
			            return '<span style="color:#D9B300;font-weight:800;">'+val+'入库'+'</span>';
                    }
                    if (val =='库存足够') {
			            return '<span style="color:green;">'+val+'</span>';
			        }
			        return val;
                },


                },
            ],
            tbar: [{//自定义主件
	            xtype: 'combobox',
                hideLabel: true,
                reference:'searchFieldNameStock',//用于获取选框信息
	            store:Ext.create("Ext.data.Store", {
				    fields: ["name", "value"],
				    data: [
				      	{ name: '商品名', value: 'goodsName' },
                        { name: '类型', value: 'stockType' },
				    ]
				}),
	            displayField: 'name',
	            valueField:'value',
	            editable: false,
	            queryMode: 'local',
	            triggerAction: 'all',
	            emptyText: '选择查询条件',
                width: 135,
                listeners:{
                    select: 'searchComboboxStock',
				}

            }, '-',
            {//商品名搜索条件
            	xtype:'textfield',
                name:'goodsNameSearch',
                reference:'searchGoodsName',
                hidden :true,
                width: 180,
		    }, {//库存物品类型搜索条件
	            xtype: 'combobox',
                hideLabel: true,
                hidden :true,
                reference:'searchStockTyp',//用于获取选框信息
	            store:Ext.create("Ext.data.Store", {
				    fields: ["name", "value"],
				    data: [
				      	{ name: '日用品', value: 'COMMODITY' },
                        { name: '耐久品', value: 'DURABLE' },
				    ]
				}),
	            displayField: 'name',
	            valueField:'value',
	            editable: false,
	            queryMode: 'local',
	            triggerAction: 'all',
	            emptyText: '选择库存物品类型',
                width: 180,
            },
            '-',{
		        text: 'Search',
		        iconCls: 'fa fa-search',
		        handler: 'quickSearchStock'
            },
            {
		        text: '显示全部',
		        iconCls: 'fa fa-search',
		        handler: 'allStock'
            }
            ,'->',
            {
                text: '添加库存物品',
                tooltip: '添加库存物品',
                iconCls: 'fa fa-plus',
                handler: 'StockAdd'
            },'-',
            {
                text: '预警物品',
                tooltip: '预警物品',
                iconCls: 'fa fa-plus',
                handler: 'alarm'
            },
            {
                text: '申请入库',
                tooltip: '申请入库',
                iconCls: 'fa fa-plus',
                hidden :true,
                reference:'ssend',
                handler: 'send'
            },
        ],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                itemId: 'userPaginationToolbar',
                displayInfo: true,
                bind: '{Stock}'
            }]
        }



        ,{
            xtype: 'gridpanel',
            cls: 'user-grid',
            title: '入库记录',
            id:"ininin",
            bind: '{In}',
            scrollable: false,
            columns: [
                {xtype: 'gridcolumn',width: 200,dataIndex: 'inStorageId',text: '入库编号',align:'center',menuDisabled:true,sortable:false,},
                {xtype: 'datecolumn',cls: 'content-column',dataIndex: 'doDate',text: '申请日期',align:'center',formatter: 'date("Y/m/d H:i:s")',width:180},
                {xtype: 'datecolumn',cls: 'content-column',dataIndex: 'inStorageDate',text: '入库日期',align:'center',formatter: 'date("Y/m/d H:i:s")',width:180,menuDisabled:true,sortable:false},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'vender', text: '采购商家', align:'center',width: 165,menuDisabled:true,sortable:false},
                {xtype: 'gridcolumn',cls: 'content-column',width: 140,dataIndex: 'amount', text: '总价', align:'center',menuDisabled:true,sortable:false},
                {xtype: 'gridcolumn',width: 140,dataIndex: 'sendWorker',text: '申请员工',align:'center',menuDisabled:true,sortable:false},
                {xtype: 'actioncolumn',cls: 'content-column', width: 130,dataIndex: 'bool',text: '详细表',align:'center',menuDisabled:true,sortable:false,flex: 1,}
            ],
            tbar: [{//自定义主件
	            xtype: 'combobox',
                hideLabel: true,
                reference:'searchFieldNameIn',//用于获取选框信息
	            store:Ext.create("Ext.data.Store", {
				    fields: ["name", "value"],
				    data: [
				      	{ name: '入库编号', value: 'inStorageId' },
                        { name: '入库日期', value: 'inStorageDate' },
                        { name: '采购商家', value: 'vender' },
                        { name: '总价', value: 'amount' },
				    ]
				}),
	            displayField: 'name',
	            valueField:'value',
	            editable: false,
	            queryMode: 'local',
	            triggerAction: 'all',
	            emptyText: '选择查询条件',
                width: 135,
                listeners:{
                    select: 'searchComboboxIn',
				}

            }, '-',
            {//入库编号搜索条件
            	xtype:'textfield',
                name:'inStorageIdSearch',
                reference:'searchInStorageId',
                hidden :true,
                width: 180,
		    }, 
            {//入库日期搜索条件start
				xtype: 'datefield',
				hideLabel: true,
				hidden:true,
				format: 'Y/m/d',
				reference:'searchInStorageDate',
				fieldLabel: 'From',
                name: 'from_date',
                width:180,
				//,id:'from_date',
				//vtype: 'daterange',
				//endDateField: 'to_date'
			},
            {//入库日期搜索条件end
				xtype: 'datefield',
				hideLabel: true,
				hidden:true,
				format: 'Y/m/d',// H:i:s
				reference:'searchInStorageDate2',
				fieldLabel: 'To',
                name: 'to_date',
                width:180,
				//,id:'to_date',
				//vtype: 'daterange',
				//startDateField: 'from_date'
            },
            {//采购商家搜索条件
            	xtype:'textfield',
                name:'venderSearch',
                reference:'searchVender',
                hidden :true,
                width: 180,
            },
            {//总价搜索条件1
            	xtype:'textfield',
                name:'amountSearch1',
                reference:'searchAmount1',
                hidden :true,
                width: 180,
                triggers:{
                    bar:{
                        cls:'fa-jpy',
                    }
                },
            },
            {//总价搜索条件2
            	xtype:'textfield',
                name:'amountSearch2',
                reference:'searchAmount2',
                hidden :true,
                width: 180,
                triggers:{
                    bar:{
                        cls:'fa-jpy',
                    }
                },
		    },
            '-',{
		        text: 'Search',
		        iconCls: 'fa fa-search',
		        handler: 'quickSearchIn'
            },
            {
		        text: '显示全部',
		        iconCls: 'fa fa-search',
		        handler: 'showAllIn'
		    }
            ,'->',{
		        text: '同步入库记录',
		        iconCls: 'fa fa-search',
		        handler: 'synchro'
		    }],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                itemId: 'userPaginationToolbar',
                displayInfo: true,
                bind: '{In}'
            }]
        },




        {
            xtype: 'gridpanel',
            cls: 'user-grid',
            title: '出库记录',
            bind: '{Out}',
            scrollable: false,
            columns: [
                {xtype: 'gridcolumn',width: 60,dataIndex: 'id',text: '编号',align:'center',/* hidden :true,*/},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'roomNo',text: '房间号码', align:'center',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'reason',  text: '出库原因', align:'center',flex: 1},
                {xtype: 'datecolumn',cls: 'content-column',width: 120,dataIndex: 'outDate',text: '出库日期',align:'center',formatter: 'date("Y/m/d H:i:s")'},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'worker',  text: '出库员工', align:'center',flex: 1},
                {xtype: 'actioncolumn',cls: 'content-column', width: 150,dataIndex: 'bool',text: '出库详细',align:'center',}
            ],
            tbar: [{//自定义主件
	            xtype: 'combobox',
                hideLabel: true,
                reference:'searchFieldNameOut',//用于获取选框信息
	            store:Ext.create("Ext.data.Store", {
				    fields: ["name", "value"],
				    data: [
				      	{ name: '房间号码', value: 'roomNo' },
                        { name: '出库日期', value: 'outDate' },
                        { name: '工作人员', value: 'worker' },
				    ]
				}),
	            displayField: 'name',
	            valueField:'value',
	            editable: false,
	            queryMode: 'local',
	            triggerAction: 'all',
	            emptyText: '选择查询条件',
                width: 135,
                listeners:{
                    select: 'searchComboboxOut',
				}

            }, '-',
            {//房间号码搜索条件
            	xtype:'textfield',
                name:'roomNoSearch',
                reference:'searchRoomNo',
                hidden :true,
                width: 180,
		    }, 
            {//出库日期搜索条件start
				xtype: 'datefield',
				hideLabel: true,
				hidden:true,
				format: 'Y/m/d',
				reference:'searchOutDate',
				fieldLabel: 'From',
                name: 'from_OutDate',
                width:180,
				//,id:'from_date',
				//vtype: 'daterange',
				//endDateField: 'to_date'
			},
            {//出库日期搜索条件end
				xtype: 'datefield',
				hideLabel: true,
				hidden:true,
				format: 'Y/m/d',// H:i:s
				reference:'searchOutDate2',
				fieldLabel: 'To',
                name: 'to_OutDate',
                width:180,
				//,id:'to_date',
				//vtype: 'daterange',
				//startDateField: 'from_date'
            },
            {//工作人员搜索条件
            	xtype:'textfield',
                name:'workerSearch',
                reference:'searchWorker',
                hidden :true,
                width: 180,
            },
            '-',{
		        text: 'Search',
		        iconCls: 'fa fa-search',
		        handler: 'quickSearchOut'
		    }, ],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                itemId: 'userPaginationToolbar',
                displayInfo: true,
                bind: '{Out}'
            }]
        },




        
    ]
});
