Ext.define('Admin.view.employ.EmployViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employViewController',

    /**员工修改模块**/
	onEditButton:function(grid, rowIndex, colIndex){

        var win = this.lookupReference('editEmpwindow');
      if (!win) {
        win = new Admin.view.employ.addEmp.EditEmpPanel;
        this.getView().add(win);
      }
      win.show();
      var form = this.lookupReference('editEmpForm').getForm();
      for (var i = 0; i < form.getFields().length; i++) {
        var pro = form.getFields().get(i).getName();
        var rec = grid.getStore().getAt(rowIndex);
        form.findField(pro).setValue(rec.get(pro));
        var image = rec.get('empImage');
        var src = 'resources/images/employee/' + image;
        Ext.getCmp('imageEditID').setSrc(src);
      }
        
    }, 

    onOpenPhotoButton:function(btn){
      btn.up("panel").up("panel").up("container").add(Ext.widget('addPhotoWindow')).show();
    },

    // EditEmpFormCancel: function() {
    //     this.lookupReference('EditEmpForm').getForm().reset();
    //     this.lookupReference('EditEmpwindow').close();
    // },
    EditEmpFormSubmit: function() {
        var formPanel = this.lookupReference('editEmpForm');
        var store = Ext.data.StoreManager.lookup('EmployStoreid');
        form = formPanel.getForm();
        if (form.isValid()) {
            var values = form.getValues();
            var record = store.getById(values.emp_id);//获取id获取store中的数据
            record.set(values);
            store.load();
            form.reset();
            this.lookupReference('editEmpwindow').close();
            Ext.MessageBox.alert(
                '修改成功'  
            );
        }
    },

    /***员工删除模块***/
	onDeleteButton:function(grid, rowIndex, colIndex){
        Ext.Msg.alert('删除该员工', '确认是否删除',function(){
            var store = grid.getStore();
            var record = store.getAt(rowIndex);
            store.remove(record);
        });
	},



    /****查看员工详细信息****/
	onDisableButton:function(grid, rowIndex, colIndex){
		var win = this.lookupReference('lookEmpWindow');

        if (!win) {
            win = new Admin.view.employ.addEmp.LookEmpWindow();
            this.getView().add(win);
        }
        win.show();
        var form = this.lookupReference('lookEmpForm').getForm();
        
        for(var i=0;i<form.getFields().length;i++){

        var pro = form.getFields().get(i).getName(); //遍历属性名 
            
        var rec = grid.getStore().getAt(rowIndex);
            
        //var proVal = record.get(pro); //拿取当前记录的当前的 属性的值
        
        form.findField(pro).setValue(rec.get(pro)); //设置值
        var image = rec.get('empImage');
        var src = "resources/images/employee/" + image;
        Ext.getCmp('imagelookId').setSrc(src);
            
        }

	},


    // /****添加员工模块****/
    // openAddWindow:function(){
    //     var win = this.lookupReference('AddEmpWindow');
    //     if (!win) {
    //         win = new Admin.view.employ.addEmp.AddEmpWindow();
    //         this.getView().add(win);
    //     }
    //     win.show();
    // },


    /**********查询*********/
    searchComboboxSelectChuang:function(combo,record,index){
        var searchField = this.lookupReference('searchFieldName').getValue();
        if(searchField==='entryDate'){
            this.lookupReference('searchFieldValue').hide();
            this.lookupReference('searchDataFieldValue').show();
            this.lookupReference('searchDataFieldValue2').show();
        }else{
            this.lookupReference('searchFieldValue').show();
            this.lookupReference('searchDataFieldValue').hide();
            this.lookupReference('searchDataFieldValue2').hide();
        }
    },

    searchComboboxSelectDepartment:function(){
        var store = Ext.data.StoreManager.lookup('EmployStoreid')
        store.load();
        var departmentvalue = this.lookupReference('searchdepartment').getValue();        
        Ext.apply(store.proxy.extraParams, {deptName:departmentvalue});
        store.load({params:{start:0, limit:20, page:1}});
    },
    /*Quick Search*/    
    quickSearch:function(btn){
        var searchField = this.lookupReference('searchFieldName').getValue();
        var searchValue = this.lookupReference('searchFieldValue').getValue();

        var searchDataFieldValue = this.lookupReference('searchDataFieldValue').getValue();
        var searchDataFieldValue2 = this.lookupReference('searchDataFieldValue2').getValue();

        var store = Ext.data.StoreManager.lookup('EmployStoreid');
        
        Ext.apply(store.proxy.extraParams, {empName:"",userName:"",empNo:"",idcard:"",createTimeStart:"",createTimeEnd:""});
        
        if(searchField==='userName'){
            Ext.apply(store.proxy.extraParams, {userName:searchValue});
        }

        if(searchField==='empName'){
            Ext.apply(store.proxy.extraParams, {empName:searchValue});
        }
        if(searchField==='idcard'){
            Ext.apply(store.proxy.extraParams, {idcard:searchValue});
        }

        if(searchField==='empNo'){
            Ext.apply(store.proxy.extraParams, {empNo:searchValue});
        }
        
        if(searchField==='entryDate'){
            Ext.apply(store.proxy.extraParams,{
                createTimeStart:Ext.util.Format.date(searchDataFieldValue, 'Y-m-d'),
                createTimeEnd:Ext.util.Format.date(searchDataFieldValue2, 'Y-m-d')
            });
        }
        store.load({params:{start:0, limit:20, page:1}});
    },

    /*删除多行*/
    deleteMoreRows:function(btn, rowIndex, colIndex){
        var grid = btn.up('gridpanel');
        var selModel = grid.getSelectionModel();
        if (selModel.hasSelection()) {
            Ext.Msg.confirm("警告", "确定要删除吗？", function (button) {
                if (button == "yes") {
                    var rows = selModel.getSelection();
                    var selectIds = []; //要删除的id
                    Ext.each(rows, function (row) {
                        selectIds.push(row.data.emp_id);
                    });
                    Ext.Ajax.request({ 
                        url : '/employ/deletes', 
                        method : 'post', 
                        params : { 
                            //ids[] :selectIds
                            ids :selectIds
                        }, 
                        success: function(response, options) {
                            var json = Ext.util.JSON.decode(response.responseText);
                            if(json.success){
                                Ext.Msg.alert('操作成功', json.msg, function() {
                                    grid.getStore().reload();
                                });
                            }else{
                                 Ext.Msg.alert('操作失败', json.msg);
                            }
                        }
                    });
                }
            });
        }else {
            Ext.Msg.alert("错误", "没有任何行被选中，无法进行删除操作！");
        }
    },
    openSearchWindow:function(btn){
        var store = Ext.data.StoreManager.lookup('EmployStoreid');
        Ext.apply(store.proxy.extraParams, {empName:"",userName:"",deptName:"",empNo:"",idcard:"",createTimeStart:"",createTimeEnd:""});
        store.load({params:{start:0, limit:20, page:1}});
    },
    onClickUploadSumbitButton: function (btn) {
        var form = btn.up('window').down('form');
        form.getForm().submit({       
            url:'/employ/file',
            method : 'post',
            waitMsg: '正在上传，请耐心等待....',
            success: function(form, action){    
                Ext.Msg.alert('Success', action.result.msg,function(){
                    btn.up('window').close();
                    Ext.data.StoreManager.lookup('EmployStoreid').load();
                });       
            }, 
            failure: function(form, action){
                Ext.Msg.alert('Error', action.result.msg);
            }
        });
    },
    exportExcel:function(btn, rowIndex, colIndex){
        var grid = btn.up('gridpanel');
        var selModel = grid.getSelectionModel();
            if (selModel.hasSelection()) {
                var rows = selModel.getSelection();
                var selectIds = [];//要查询的id
                Ext.each(rows,function(row){
                    selectIds.push(row.data.emp_id);
                })
                window.location.href = '/employ/exportExcel/' + selectIds;
            } else{
                alert('未选择记录！');
            }     
    },
    InputExcel:function(btn){
        btn.up("panel").up("panel").up("container").add(Ext.widget('uploadExcelWindow')).show();
    },

    onClickupfileSumbitButton:function(btn){
        var form = btn.up('window').down('form');
        var filedir = Ext.getCmp("upfile").getValue();
        var suffix = filedir.substr(filedir.lastIndexOf("."));
        if("" == filedir){
            Ext.Msg.alert('Error', "选择需要导入的Excel文件！");
        }

        if(".xls" != suffix || ".xlsx" != suffix ){
            Ext.Msg.alert('Error', "选择Excel格式的文件导入！");
        }

        if(".xls" == suffix || ".xlsx" == suffix){
            form.getForm().submit({       
            url:'/employ/uploadExcel',
            method : 'post',
            waitMsg: '正在上传，请耐心等待....',
            success: function(form, action){    
                Ext.Msg.alert('Success', action.result.msg,function(){
                    btn.up('window').close();
                    Ext.data.StoreManager.lookup('EmployStoreid').load();
                });       
            }, 
            failure: function(form, action){
                Ext.Msg.alert('Error', action.result.msg);
            }
        });
        }

    }



});
