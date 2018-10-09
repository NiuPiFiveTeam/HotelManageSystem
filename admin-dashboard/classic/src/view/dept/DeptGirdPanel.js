Ext.QuickTips.init();
Ext.define('Admin.view.dept.DeptGirdPanel' , {
    extend : 'Ext.grid.Panel' ,
    id : 'deptGirdPanel' ,
    xtype : 'deptGirdPanel' ,
    cls: 'deptGirdPanel',
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
                text: '添加部门',
                //tooltip: 'Add a new row',
                iconCls: 'fa fa-plus',
                style:'background:#;',
                handler: 'openAddDeptWindow'
            },'-',{
                text: '部门总体一览',
                tooltip: 'Remove the selected item',
                iconCls:'fa fa-trash',
                itemId: 'empRemoveid',
                //disabled: true,
                handler: 'deleteMoreRows'

            }], 



    bind: '{deptLists}',
    scrollable: false,
    //selModel: {type: 'checkboxmodel',checkOnly: true},//开启复选框
    columns : [
        {   xtype:'rownumberer',width:50,text:'序号', align:'center'},
        {    text:'部门id' , flex:1 ,hidden:true, align:'center' , dataIndex:'dept_id'},
        {    text:'部门编号' , flex:1 , align:'center' , dataIndex:'deptNo'},
        {    text:'部门名称' , flex:1 , align:'center' , dataIndex:'deptName'},
        {    text:'上级部门id' , flex:1 , hidden:true, align:'center' , dataIndex:'parentId'},
        {    text:'上级部门' , flex:1 , align:'center' , dataIndex:'deptParent'},
        {    text:'部门主管id' , flex:1 ,hidden:true, align:'center' , dataIndex:'managerId'    },
        {    text:'主管名称' , flex:1 , align:'center' , dataIndex:'managerName'},
        {    text:'主管编号' , flex:1 , align:'center' , dataIndex:'managerNo'},
        {    text:'是否为上级' , flex:1 ,hidden:true,  align:'center' , dataIndex:'is_parent'},
        {xtype: 'actioncolumn', width: 200,align:'center',text: '操作',
                    items: [
                        {xtype: 'button',iconCls: 'x-fa fa-pencil' ,tooltip:"修改部门",handler: 'openEditDeptWindow'},
                        {xtype: 'button',iconCls: 'x-fa fa-trash-o' ,tooltip:"删除",handler: 'onDeleteDeptButton'},
                        {xtype: 'button',iconCls: 'x-fa fa-book', tooltip:"查看详情",handler: 'onDisableDeptButton'}
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