Ext.define('Admin.view.finance.inStorage.AddInStoreOrderWindow', {
    extend: 'Ext.window.Window',
    xtype: 'addInStoreOrderWindow',

    height:200,
    width:400,
    title:'入库申请',
    modal:true,
    layout:'fit',		//弹出窗口内布局会充满整个窗口;
    closable:false,    	//隐藏关闭按钮; 
    x : 300,y : 100, 
 	constrain:true,		//保证整个窗口不会越过浏览器的边界;
	// constrainHeader:true//值保证窗口的顶部不会越过浏览器的边界;
    
    // draggable:true,     //窗口可拖动; 
    // minimizable:true,   //窗口最小化按钮; 需重写minimize()函数;
    // maximizable:true    //窗口最大化按钮;
    // progress:true,        //显示进度条参数;

    // resizable:true,         //窗口可拖动改变大小;
    // resizeHandles:'se',     //south-east:右下角可拖动;
    items: [{
        xtype: 'form',
        layout: 'form',
        padding: '10px',
        ariaLabel: 'Enter your name',
        items: [{
            xtype: 'combobox',
            fieldLabel: '待申请单号',
            name:'kitchen'
        },{
        	xtype:'tagfield'
        }]
    }],
    buttons: ['->',{
        xtype: 'button',
        text: '申请',
		
    },{
        xtype: 'button',
        text: '取消',
        handler: function(btn) {
            btn.up('window').close();
        }
    },'->']
});