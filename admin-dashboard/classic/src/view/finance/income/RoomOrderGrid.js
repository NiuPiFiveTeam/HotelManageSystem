Ext.define('Admin.view.finance.income.RoomOrderGrid', {
    extend: 'Ext.tab.Panel',
    xtype: 'roomOrderGrid',

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
            title: '客房订单',
            scrollable: true,
            bind: '{roomOrderGridStore}',
            columns: [{
            	header:'订单号',
            	dataIndex:'bookRoomNo',
                flex:1
            },{
                header:'房间类型',
                dataIndex:'roomType',
                flex:1
            },{
                header:'订房方式',
                dataIndex:'booksource',
                flex:1
            },{
                header:'房价',
                dataIndex:'roomPrice',
                flex:1
            },{
                header:'入住时间',
                dataIndex:'checkInTime',
                renderer: Ext.util.Format.dateRenderer('Y/m/d H:i'),
                flex:1
            },{
                header:'退房时间',
                dataIndex:'checkOutTime',
                renderer: Ext.util.Format.dateRenderer('Y/m/d H:i'),
                flex:1
            },{
                header:'预定人',
                dataIndex:'bookGuest',
                flex:1
            },{
                header:'预定号码',
                dataIndex:'bookPhone',
                flex:1
            },{
                header:'订单总收入',
                dataIndex:'totalAmout',
                renderer:function(value, metaData, record){
                    if(value=='0'){
                        return '';
                    }
                },
                flex:1
            },{
                header:'备注',
                dataIndex:'remark',
                flex:1
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
                bind: '{roomOrderGridStore}'
            }]
    }]
});

