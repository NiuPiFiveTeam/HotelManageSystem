Ext.define('Admin.view.finance.inStorage.task.ShowInstorageDetailed',{
	extend:'Ext.panel.Panel',
	alias:'widget.showInstorageDetailed',
    requires: [
        'Ext.form.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date',

        'Ext.form.field.ComboBox',  //下拉列表框
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.RowNumberer'
    ],
	width: 400,
    bodyPadding: 5,
    items:[{
        xtype:'form',
        items:[{
            xtype: 'fieldset',
            title: '入库申请总览',
            layout:'hbox',
            defaultType: 'displayfield',
            items: [
                {
                    name:'amount',
                    fieldLabel:'总金额',
                    labelWidth:60,
                    flex: 1
                },{
                    name:'vender',
                    fieldLabel:'供货商',
                    labelWidth:60,
                    flex: 1
                }
            ]
        }]  
    },{
        xtype: 'gridpanel',
        store:'inStorageDetailedStore',
        columns: [{
            header:'名称',
            dataIndex:'goodsName',
            flex:1
        },{
            header:'单价',  
            dataIndex:'amount',
            flex:1 
        },{
            header:'数量', 
            dataIndex:'unit', 
            flex:1 
        },{
            header:'总价(元)',   
            dataIndex:'price',
            flex:1
        }],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store:'inStorageDetailedStore',
        }]
    }]

    
});
