Ext.define('Admin.view.finance.financeReport.PieChartsViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pieChartsViewController',

    onPreview: function () {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart = this.lookup('chart');
        chart.preview();
    },

    onDataRender: function (v) {
        return v + '%';
    },

    onSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('type') + ': ' + record.get('data') + '%');
    }

});