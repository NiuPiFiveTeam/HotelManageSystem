Ext.define('Admin.view.travel.travelList.TravelAddWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.travelAddWindow',
    //height: 350,
    minHeight: 350,
    minWidth: 300,
    width: 500,
    scrollable: true,
    title: 'Add travel Window',
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
            fieldLabel: 'travelId',
            name:'travelId',
            hidden: true,
            readOnly: true
        },{
            xtype: 'textfield',
            fieldLabel: 'processStatus',
            name:'processStatus',
            value:'NEW',
            hidden: true,
            readOnly: true
        },{
			xtype: 'textfield',
			name: 'empName',
			fieldLabel: '出差员工',
			//value:loginUser,
			allowBlank: false
		},{
            xtype: 'textfield',
            name: 'empNo',
            fieldLabel: '员工编号',
            //value:loginUser,
            allowBlank: false
        },{
			xtype: 'datefield',
			fieldLabel: '开始时间',
			format: 'Y/m/d H:i:s', 
			name: 'traStartTime'
		},{
			xtype: 'datefield',
			fieldLabel: '结束时间',
			format: 'Y/m/d H:i:s', 
			name: 'traEndTime'
		},{
			xtype     : 'textareafield',
			grow      : true,
			name      : 'process',
			fieldLabel: '出差内容',
			anchor    : '100%'
		},{
            xtype: 'textfield',
            name: 'approval',
            fieldLabel: '派发人',
            allowBlank: false
        }]
    }],
	buttons: ['->',{
        xtype: 'button',
        text: 'Submit',
        handler: 'submitAddForm'
    },{
        xtype: 'button',
        text: 'Close',
        handler: function(btn) {
            btn.up('window').close();
        }
    },'->']
});