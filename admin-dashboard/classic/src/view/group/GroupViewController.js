Ext.define('Admin.view.group.GroupViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.groupViewController',

	openAddgroupWindow:function(toolbar, rowIndex, colIndex){

		toolbar.up('panel').up('container').add(Ext.widget('groupAddWindow')).show();
	},

	 //提交表单 adddept 
    submitAddGroupForm:function(btn){
    	var win    = btn.up('window');
		var form = win.down('form');
		var record = Ext.create('Admin.model.group.GroupModel');
		var values  =form.getValues();//获取form数据
		record.set(values);
		record.save();
		Ext.data.StoreManager.lookup('groupStore').load();
		win.close();
    },
    //
	openEditGroupWindow:function(grid, rowIndex, colIndex){
		var win = grid.up('container').add(Ext.widget('groupEditWindow'));
        win.show();
        var form = this.lookupReference('EditGroupForm').getForm();
        
        for(var i=0;i<form.getFields().length;i++){

        var pro = form.getFields().get(i).getName(); //遍历属性名 
            
        var rec = grid.getStore().getAt(rowIndex); 
        
        form.findField(pro).setValue(rec.get(pro)); //设置值
        }
	},

	submitEditGroupForm:function(){
		var win    = btn.up('window');
        var store = Ext.data.StoreManager.lookup('groupStore');
        var values  = win.down('form').getValues();//获取form数据
        var record = store.getById(values.dept_id);//获取id获取store中的数据
        record.set(values);//rest put 
        store.load();
        win.close();
	},
	 onDeleteGroupButton:function(grid, rowIndex, colIndex){
        var store = grid.getStore();
        var record = store.getAt(rowIndex);
        Ext.MessageBox.confirm('提示', '确定要进行删除操作吗？数据将无法还原！',function(btn, text){
        if(btn=='yes'){
            store.remove(record);
        }
        }, this);
    }


})