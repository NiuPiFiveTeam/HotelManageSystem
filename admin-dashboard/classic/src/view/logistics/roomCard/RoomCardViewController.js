Ext.define('Admin.view.logistics.roomCard.RoomCardViewController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.roomCardViewController',

	add:function(toolbar,rowIndex, colIndex){
		toolbar.up('panel').up('container').add(Ext.widget('loseGoodsAddWindow')).show();
	},
	getGoods:function(grid, rowIndex, colIndex){
		var record = grid.getStore().getAt(rowIndex);
		if (record) {
			var win = grid.up('container').add(Ext.widget('loseGoodsAddWindow1'));
			win.show();
			win.down('form').getForm().loadRecord(record);
		}
		//toolbar.up('panel').up('container').add(Ext.widget('loseGoodsAddWindow1')).show();
	}
});
