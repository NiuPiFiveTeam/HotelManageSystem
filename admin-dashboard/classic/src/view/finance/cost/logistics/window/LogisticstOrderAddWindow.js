Ext.define('Aria.view.finance.cost.logisticst.window.RoomOrderAddWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.roomOrderAddWindow',
    height: 200,
    minHeight: 100,
    minWidth: 300,
    width: 500,
    scrollable: true,
    title: 'Add Order Window',
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
            fieldLabel: 'orderId',
            name:'orderId',
            hidden: true,
            readOnly: true
        },{
            xtype: 'textfield',
            fieldLabel: '用户编号',
            name:'userId',
            // hidden: true,
            // readOnly: true
        }, {
            xtype: 'textfield',
            fieldLabel: '客房号',
            name:'roomId'
        }, {
            xtype: 'datefield',
            fieldLabel: '入住时间',
            name:'comeDate',
            format: 'Y/m/d H:i:s'
        }]
    }],
   
 
    buttons: [ {
            xtype:'button',
            text:'submit',
            handler:'orderAddFormSubmit'
        },{
            text: 'Cancel', 
            handler: function(btn) {
                btn.up('window').close();
            }
    }]
});
