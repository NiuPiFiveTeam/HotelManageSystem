Ext.define('Admin.view.finance.cost.salaryCost.DateSelect', {
    extend:'Ext.form.Panel',
    xtype: 'salaryDateSelect',
    
    items: [{
        xtype: 'salaryMonthfield', 
        id:'salaryMonthfieldId',
        fieldLabel: '查询月份', 
        editable: false, 
        width: 200, 
        labelWidth: 70, 
        labelAlign: 'right',
        format: 'Y - m',
        value:new Date()
    }]
  
});
Ext.Date.monthNames = [    
   '一月', '二月', '三月', '四月', '五月', '六月',     
   '七月', '八月', '九月', '十月', '十一月', '十二月'    
]; 
Ext.define('Ext.ux.form.salaryMonthfield', {
    extend: 'Ext.form.field.Picker',
    alias: 'widget.salaryMonthfield',
    format: "Y-m",

    //多个时间输入格式组成的字符串，不同的格式之间使用“|”进行分割
    altFormats: "m/y|m/Y|m-y|m-Y|my|mY|y/m|Y/m|y-m|Y-m|ym|Ym", 

    triggerCls: Ext.baseCSSPrefix + 'form-date-trigger',
    matchFieldWidth: false,

    startDay: new Date(),

    initComponent: function () {
        var me = this;


        me.disabledDatesRE = null;

        me.callParent();
    },

    initValue: function () {
        var me = this,
            value = me.value;

        if (Ext.isString(value)) {
            me.value = Ext.Date.parse(value, this.format);
        }
        if (me.value)
            me.startDay = me.value;
        me.callParent();
    },

    rawToValue: function (rawValue) {
        return Ext.Date.parse(rawValue, this.format) || rawValue || null;
    },

    valueToRaw: function (value) {
        return this.formatDate(value);
    },



    formatDate: function (date) {
        return Ext.isDate(date) ? Ext.Date.dateFormat(date, this.format) : date;
    },
    createPicker: function () {
        var me = this,
            format = Ext.String.format;

        return Ext.create('Ext.picker.Month', {
            //renderTo: me.el,
            pickerField: me,
            ownerCt: me.ownerCt,
            renderTo: document.body,
            floating: true,
            shadow: false,
            focusOnShow: true,
            listeners: {
                scope: me,
                cancelclick: me.onCancelClick,
                okclick: me.onOkClick,
                yeardblclick: me.onOkClick,
                monthdblclick: me.onOkClick
            }
        });
    },

    onExpand: function () {
        //this.picker.show();
        this.picker.setValue(this.startDay);
        //
        
    },

    //    onCollapse: function () {
    //        this.focus(false, 60);
    //    },

    onOkClick: function (picker, value) {
        var me = this,
            month = value[0],
            year = value[1],
            date = new Date(year, month, 1);
        me.startDay = date;
        me.setValue(date);
        this.picker.hide();
        //this.blur();
        var store = Ext.data.StoreManager.lookup('salaryOrderGridStroe');
        Ext.apply(store.proxy.extraParams,{month:""});
        Ext.apply(store.proxy.extraParams,{
            month:Ext.util.Format.date(date, 'Y/m/d H:i:s')
        });
        store.load({params:{start:0,limit:20,page:1}});
    },

    onCancelClick: function () {
        this.picker.hide();
        //this.blur();
    }
});