Ext.define('Admin.view.companyWork.workChart.EmpworkYearchartController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.empworkYearchartController',

    onAxisLabelRender: function (axis, label, layoutContext) {
        
        var value = layoutContext.renderer(label) ;
        return value === 0 ? '$0' : Ext.util.Format.number(value, '$0K');
    },

    onSeriesLabelRender: function (value) {
        return Ext.util.Format.number(value, '$0K');
    },

    onGridColumnRender: function (v) {
        return Ext.util.Format.number(v, '$0,000');
    },
    searchComboboxSelect:function(btn){
        var store = Ext.data.StoreManager.lookup('WorkyearempchartStoreid')
        store.load();
        var departmentvalue = this.lookupReference('searchFieldName').getValue();        
        Ext.apply(store.proxy.extraParams, {year:departmentvalue});
        store.load();
    }

});