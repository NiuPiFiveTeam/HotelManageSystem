Ext.define('Admin.view.calendar.CalendaEditWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.calendarEditWindow',
    height: 350,
    minHeight: 350,
    minWidth: 300,
    width: 500,
    scrollable: true,
    title: 'EditCalendarForm Window',
    closable: true,
    constrain: true,
    defaultFocus: 'textfield',
    modal:true,
    layout: 'fit',
	items: [{
        xtype: 'form',
        layout: 'form',
        reference :'EditCalendarForm',
        padding: '10px',
        ariaLabel: 'Enter your name',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'id',
            name:'id',
            hidden: true,
            readOnly: true
        },{
            xtype: 'textfield',
            name: 'title',
            fieldLabel: '类别',
            allowBlank: false
        },{
            xtype: 'textfield',
            name: 'color',
            hidden: true,
            fieldLabel: '颜色',
            value:''
        },{ xtype :'combobox',allowBlank:false, fieldLabel: '任务标记颜色', name: 'assignedColor',
                    store : new Ext.data.ArrayStore({
                    fields : ['assignedColor', 'assignedColortype'],
                    data : [["#7FFF00", '绿色'],
                            ["#FFFF00", '黄色'],
                            ["#FF0000", '红色'],
                            ["#FF8C00", '橙色'],
                            ["#1E90FF", '蓝色'],
                            ["#D19275", '朱红'],
                            ["#FF00FF", '紫色']]
                    }),
              
                valueField : 'assignedColor',
                displayField: 'assignedColortype',
                forceSelection:true,                
                editable : false,
                emptyText: '请选颜色'
        },{
            xtype: 'textfield',
            name: 'description',
            fieldLabel: '描述'
        },{
            xtype: 'textfield',
            name: 'hidden',
            hidden: true,
            value:'false',
            fieldLabel: '是否影藏'
        },{
            xtype: 'textfield',
            name: 'editable',
            hidden: true,
            value:'true',
            fieldLabel: '是否可编辑'
        }]
    }],
   buttons: ['->',{
        xtype: 'button',
        text: 'Submit',
        handler: 'submitEditCalendarForm'
    },{
        xtype: 'button',
        text: 'Close',
        handler: function(btn) {
            btn.up('window').close();
        }
    },'->']
  
});
