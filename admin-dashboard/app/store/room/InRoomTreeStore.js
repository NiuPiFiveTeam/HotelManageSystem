Ext.define('Admin.store.room.InRoomTreeStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.inroomTreeStore',
    // model:'',
    // storeId: 'inroomTree',
    
    proxy: {
		type: 'ajax',
		url: 'floor/findNodes',	//后台Controller中的接口url地址
		reader: {
			type:'json'
		}
	},
    
    root : {
		text : '楼层',
        iconCls:'fa-university',
        expanded : true	 //发送node=root，这个设置true就是默认打开，打开就会访问ajax
      
	}


	// root: {
    //     text:'楼层',
    //     expanded: true,
    //     iconCls:'fa-university',
    //     children: [
    //         { text: '一楼', leaf: false ,expanded:true, iconCls:'fa-server', children: [
    //             { text: '101',iconCls:'fa-bed', leaf: true },
    //             { text: '102',iconCls:'fa-bed', leaf: true}
    //         ] },
    //         { text: '二楼', expanded: false, iconCls:'fa-server',children: [
    //             { text: '203',iconCls:'fa-bed', leaf: true },
    //             { text: '204', iconCls:'fa-bed',leaf: true}
    //         ] },
    //         { text: '三楼', leaf: false ,iconCls:'fa-server', children: [
    //             { text: 'book report',iconCls:'fa-bed', leaf: true },
    //             { text: 'algebra',iconCls:'fa-bed', leaf: true}
    //         ] }
    //     ]
	// }
});