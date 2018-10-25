Ext.define('Admin.view.company.Month.WorkMonthViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workMonthViewController',

   	onEditButton:function(grid, rowIndex, colIndex){

        var win = this.lookupReference('EditWorkWindow');
      if (!win) {
        win = new Admin.view.companyWork.Month.EditWorkPanel;
        this.getView().add(win);
      }
      win.show();
      var form = this.lookupReference('editWorkForm').getForm();
      for (var i = 0; i < form.getFields().length; i++) {
        var pro = form.getFields().get(i).getName();
        var rec = grid.getStore().getAt(rowIndex);
        form.findField(pro).setValue(rec.get(pro));
      }
        
    },

    
    workmonthrefresh:function(){
        
        this.lookupReference('workMonthform').getForm().load({  
                                url: '/work/tatalrecord',  
                                waitTitle : '请等待' ,   
                                success:function(form,action){
                                },  
                                failure:function(form,action){  
                                Ext.Msg.alert('提示','保存失败！');  
                                }  
        });
    },
    
    EditWorkFormSubmit: function() {
        var formPanel = this.lookupReference('editWorkForm');
        var store = Ext.data.StoreManager.lookup('workStoreId');
        form = formPanel.getForm();
        if (form.isValid()) {
            var values = form.getValues();
            var record = store.getById(values.workid);//获取id获取store中的数据
            record.set(values);
            store.reload();
            form.reset();
            this.lookupReference('EditWorkWindow').close();
            Ext.MessageBox.alert(
                '修改成功'  
            );
        }
    },
    onDeleteButton:function(grid, rowIndex, colIndex){
        Ext.Msg.alert('删除该记录', '确认是否删除',function(){
            var store = grid.getStore();
            var record = store.getAt(rowIndex);
            store.remove(record);
        });
	},

    /**********查询*********/
    searchComboboxSelectChuang:function(combo,record,index){
        var searchField = this.lookupReference('searchFieldName').getValue();
        if(searchField==='entryDate'){
            this.lookupReference('searchFieldValue').hide();
            this.lookupReference('searchDataFieldValue2').show();
        }else{
            this.lookupReference('searchFieldValue').show();
            this.lookupReference('searchDataFieldValue2').hide();
        }
    },

    searchComboboxSelectDepartment:function(){
        var store = Ext.data.StoreManager.lookup('workStoreId')
        store.load();
        var departmentvalue = this.lookupReference('searchdepartment').getValue();        
        Ext.apply(store.proxy.extraParams, {deptName:departmentvalue});
        store.load({params:{start:0, limit:20, page:1}});
    },
    quickSearch:function(btn){
        
        var searchField = this.lookupReference('searchFieldName').getValue();
        var searchValue = this.lookupReference('searchFieldValue').getValue();
        var searchDataFieldValue2 = this.lookupReference('searchDataFieldValue2').getValue();

        var store = btn.up('gridpanel').getStore();
        Ext.apply(store.proxy.extraParams, {empNo:"",workDate:null});

        if(searchField==='empNo'){
            Ext.apply(store.proxy.extraParams, {empNo:searchValue});
        }
        
        if(searchField==='entryDate'){
            Ext.apply(store.proxy.extraParams,{
                workDate:searchDataFieldValue2
            });
        }
        // //var store = Ext.getCmp('userGridPanel').getStore();// Ext.getCmp(）需要在LeavePanel设置id属性
        // Ext.apply(store.proxy.extraParams, {workDate:searchDataFieldValue2});

        store.load({params:{start:0, limit:20, page:1}});
    },

    openSearchWindow:function(btn){
        //var searchDataFieldValue2 = this.lookupReference('searchDataFieldValue2').getValue();

        var store = btn.up('gridpanel').getStore();
        //var store = Ext.getCmp('userGridPanel').getStore();// Ext.getCmp(）需要在LeavePanel设置id属性
        Ext.apply(store.proxy.extraParams, {workDate:null,empNo:"",deptName:""});

        store.load({params:{start:0, limit:20, page:1}});

    },
    OnclickAttence:function(btn){
        Ext.Msg.alert('同步考勤', '确认是否同步',function(){
            Ext.Ajax.request({ 
                        url : '/work/Update', 
                        method : 'post', 
                        success: function(response, options) {
                            var json = Ext.util.JSON.decode(response.responseText);
                            if(json.success){
                                Ext.Msg.alert('操作成功', json.msg, function() {
                                   Ext.data.StoreManager.lookup('workStoreId').reload();
                                });
                            }else{
                                 Ext.Msg.alert('操作失败', json.msg);
                            }
                        }
            });
        });
    }
});
