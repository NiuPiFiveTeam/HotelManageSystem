Ext.QuickTips.init();
Ext.define('Admin.view.group.GroupGridPanel' , {
    extend : 'Ext.grid.Panel' ,
    id : 'groupGridPanel' ,
    xtype : 'groupGridPanel' ,
    cls: 'groupGirdPanel',
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
                text: '添加部门角色',
                //tooltip: 'Add a new row',
                iconCls: 'fa fa-plus',
                style:'background:#;',
                handler: 'openAddgroupWindow'
            }], 



    bind: '{groupLists}',
    scrollable: false,
    //selModel: {type: 'checkboxmodel',checkOnly: true},//开启复选框
    columns : [
        {   xtype:'rownumberer',width:50,text:'序号', align:'center'},
        {    text:'ID' , flex:1 ,hidden:true, align:'center' , dataIndex:'groupTable_id'},
        {    text:'角色ID' , flex:1 , align:'center' , dataIndex:'groupId'},
        {    text:'角色名称' , flex:1 , align:'center' , dataIndex:'groupName'},
        {    text:'所属部门' , flex:1 , align:'center' , dataIndex:'deptName'},
        {xtype: 'actioncolumn', width: 200,align:'center',text: '操作',
                    items: [
                        // {xtype: 'button',iconCls: 'x-fa fa-pencil' ,tooltip:"修改",handler: 'openEditGroupWindow'},
                        {xtype: 'button',iconCls: 'x-fa fa-trash-o' ,tooltip:"删除",handler: 'onDeleteGroupButton'}  
                    ]
        }
     
    ],    
    dockedItems:[{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        //itemId: 'EmployPaginationToolbar',
        displayInfo: true,
        bind: '{deptLists}'
    }]    
});