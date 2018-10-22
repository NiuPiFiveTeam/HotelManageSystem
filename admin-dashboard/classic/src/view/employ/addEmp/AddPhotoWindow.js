Ext.define('Admin.view.employ.addEmp.AddPhotoWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.addPhotoWindow',
    //controller: 'employViewController',
    requires: [
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.File',//引入上传控件
        'Ext.form.field.HtmlEditor'
    ],
    height: 180,
    minHeight: 100,
    minWidth: 300,
    width: 500,
    scrollable: true,
    title: 'Upload Window',
    closable: true,
    constrain: true,
    defaultFocus: 'textfield',
    modal:true,
    layout: 'fit',
    items: [{
        xtype: 'form',
        layout: 'form',
        padding: '10px',
        items: [{
        	xtype: 'filefield',
	        width: 400,
	        labelWidth: 80,
	        name:'file',
	        emptyText: 'Select an photo/.jpg/.png file!', 
	        fieldLabel: '上传文件:',
	        labelSeparator: '',
	        buttonConfig: {
	            xtype: 'filebutton',//选择上传文件按钮
	            glyph:'',
	            iconCls: 'x-fa fa-cloud-upload',
	            text: 'Browse'
	        }
	    }]
    }],
	buttons: ['->',{
        xtype: 'button',
        text: 'Upload',
        handler: 'onClickUploadSumbitButton'
    },{
        xtype: 'button',
        text: 'Close',
        handler: function(btn) {
            btn.up('window').close();
        }
    },'->']
});
