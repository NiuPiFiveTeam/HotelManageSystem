Ext.define('Admin.view.room.emptyRoom.LoadAccountWindow', {
    extend:'Ext.window.Window',

    alias:'widget.loadAccountWindow',
    id:'loadAccountWindow',
    title: '选择收入类型',
   
    
    // draggable:false,//拖动
    resizable:false,	//变大小	
    height:300,
    width: 400,
    layout: 'fit',

    // controller: 'emptyRoomViewController',   //事件控制器，用来编写事件
    viewModel : {type: 'emptyRoomViewModel'},	 //读取store
  
    items:[{
        xtype: 'form',
        layout: 'form',
        id:'roomStateChange',
        padding: '10px',
        ariaLabel: 'Enter your name',
        items: [
            {
                xtype: 'textfield',
                fieldLabel: '现金',
                name:'cash',
                // hidden: true,
                // disabled:true
                value:0
            },
            {
                xtype: 'textfield',
                fieldLabel: '银行卡',
                name:'bankcark',
                // hidden: true,
                // disabled:true
                value:0
            }
        ],
        bbar:['->',{
            xtype:'button',
            ui:'soft-blue',
            text:'确认',
            handler:function(btn){
                let form = btn.up('form');
                let cashNumber = form.items.get(0).value;
                let cashName = form.items.get(0).fieldLabel;
                let bankCardName = form.items.get(1).fieldLabel;
                let bankCardNumber = form.items.get(1).value;
                let moneyArray = [];
                if(bankCardNumber == 0){
                     moneyArray.push(cashName);
                     moneyArray.push(cashNumber);
                }else if(cashNumber == 0){
                     moneyArray.push(bankCardName);
                     moneyArray.push(bankCardNumber);
                }else {
                     moneyArray.push(cashName);
                     moneyArray.push(cashNumber);
                     moneyArray.push(bankCardName);
                     moneyArray.push(bankCardNumber);
                }
                
                console.log(moneyArray);
                addCashTableItems(moneyArray);
            }
        }]
    }]
});



