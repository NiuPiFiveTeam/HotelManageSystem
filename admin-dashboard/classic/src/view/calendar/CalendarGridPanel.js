
Ext.define('Admin.view.calendar.CalendarGridPanel' , {
    extend : 'Ext.grid.Panel' ,
    id : 'calendarGridPanel' ,
    xtype : 'calendarGridPanel' ,
    cls: 'calendarGirdPanel',
    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date',
        'Ext.selection.CheckboxModel'
    ],
    viewConfig: {
        stripeRows:true //True来实现隔行换颜色
    },
    tbar: ['->',{
                text: '添加排班类别',
                //tooltip: 'Add a new row',
                iconCls: 'fa fa-plus',
                style:'background:#;',
                handler: 'openAddCalendarWindow'
            }], 



    bind: '{calendarLists}',
    scrollable: true,
    columns : [
        {   xtype:'rownumberer',width:50,text:'序号', align:'center'},
        {    text:'ID' , flex:1 ,hidden:true, align:'center' , dataIndex:'id'},
        {    text:'类别' , flex:1 , align:'center' , dataIndex:'title'},
        {    text:'颜色' , flex:1 ,hidden:true, align:'center' , dataIndex:'color'},
        {    text:'任务标记颜色' , flex:1 , align:'center' , dataIndex:'assignedColor'},
        {    text:'描述' , flex:1 , align:'center' , dataIndex:'description'},
        {    text:'是否影藏' , flex:1 , hidden:true,align:'center' , dataIndex:'hidden'},
        {    text:'是否可编辑' , flex:1 ,hidden:true, align:'center' , dataIndex:'editable'},

        {xtype: 'actioncolumn', width: 200,align:'center',text: '操作',
                    items: [
                        {xtype: 'button',iconCls: 'x-fa fa-pencil' ,tooltip:"修改",handler: 'openEditCalendarWindow'},
                        {xtype: 'button',iconCls: 'x-fa fa-trash-o' ,tooltip:"删除",handler: 'onDeleteCalendarButton'} 

                    ]
        }
     
    ]   
});