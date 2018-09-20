Ext.define('Aria.view.finance.cost.logisticst.window.LogisticstOrderSearchWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.logisticstOrderSearchWindow',
    height: 200,
    minHeight: 100,
    minWidth: 300,
    width: 500,
    scrollable: true,
    title: 'Order Search Window',
    closable: true,
    constrain: true,
    defaultFocus: 'textfield',
    modal:true,
    layout: 'fit',
    items: [{
        xtype: 'form',
        layout: 'form',
        padding: '10px',
        ariaLabel: 'Enter your name',
        items: [{
            xtype: 'textfield',
            fieldLabel: '客户编号',
            name:'userId'
        }, {
            xtype: 'datefield',
            fieldLabel: '入住日期',
            name:'comeDate',
            format: 'Y/m/d H:i:s'
        }]
    }],
   
    buttons: [ {
            xtype:'button',
            text:'submit',
            handler:'orderSearchFormSubmit'
        },{
            text: 'Cancel', 
            handler: function(btn) {
                btn.up('window').close();
            }
        }]
});
