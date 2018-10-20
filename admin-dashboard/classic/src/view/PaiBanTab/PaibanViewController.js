Ext.define('Admin.view.Paiban.PaibanViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.paibanViewController',

    searchComboboxSelectDepartment:function(){
        var store = Ext.data.StoreManager.lookup('paibanStoreId');
        store.load();
        var departmentvalue = this.lookupReference('searchdepartment').getValue();        
        Ext.apply(store.proxy.extraParams, {deptName:departmentvalue});
        store.load({params:{start:0, limit:20, page:1}});
     },

     /**********查询*********/
    searchComboboxSelectChuang:function(combo,record,index){
        var searchField = this.lookupReference('searchFieldName').getValue();
        if(searchField==='startDate'){
            this.lookupReference('searchFieldValue').hide();
            this.lookupReference('searchDataFieldValue').show();
            this.lookupReference('searchDataFieldValue2').show();
        }else{
            this.lookupReference('searchFieldValue').show();
            this.lookupReference('searchDataFieldValue').hide();
            this.lookupReference('searchDataFieldValue2').hide();
        }
    },
     /*Quick Search*/    
    quickSearch:function(btn){
        var searchField = this.lookupReference('searchFieldName').getValue();
        var searchValue = this.lookupReference('searchFieldValue').getValue();

        var searchDataFieldValue = this.lookupReference('searchDataFieldValue').getValue();
        var searchDataFieldValue2 = this.lookupReference('searchDataFieldValue2').getValue();

        var store = Ext.data.StoreManager.lookup('paibanStoreId');
        
        Ext.apply(store.proxy.extraParams, {empName:"",empNo:"",startDate:"",deptName:""});
        
  

        if(searchField==='empName'){
            Ext.apply(store.proxy.extraParams, {empName:searchValue});
        }
       
        if(searchField==='empNo'){
            Ext.apply(store.proxy.extraParams, {empNo:searchValue});
        }
        
        if(searchField==='startDate'){
            Ext.apply(store.proxy.extraParams,{
                traStartTime:Ext.util.Format.date(searchDataFieldValue, 'Y-m-d H:i:s'),
                traEndTime:Ext.util.Format.date(searchDataFieldValue2, 'Y-m-d H:i:s')
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
                        selectIds.push(row.data.id);
                    });
                    Ext.Ajax.request({ 
                        url : '/CalendarEvent/deletes', 
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

    /***员工删除模块***/
    onDeleteButton:function(grid, rowIndex, colIndex){
        Ext.Msg.alert('删除该员工', '确认是否删除',function(){
            var store = grid.getStore();
            var record = store.getAt(rowIndex);
            store.remove(record);
        });
    },
    openSearchWindow:function(btn){
        var store = Ext.data.StoreManager.lookup('paibanStoreId');
        Ext.apply(store.proxy.extraParams, {empName:"",userName:"",deptName:"",empNo:"",traStartTime:"",traEndTime:""});
        store.load({params:{start:0, limit:20, page:1}});
    }





});
