Ext.define('Admin.view.employ.EmpTabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.empTabController',

    // onTabChange: function(tabs, newTab, oldTab) {
    //     Ext.suspendLayouts();
    //     newTab.setTitle('添加员工');
    //     oldTab.setTitle('员工信息浏览');
    //     Ext.resumeLayouts(true);
    // },

    onOpenPhotoButton:function(btn){
    	btn.up('panel').up('panel').up('container').add(Ext.widget('addPhotoWindow')).show();
    }
    
});