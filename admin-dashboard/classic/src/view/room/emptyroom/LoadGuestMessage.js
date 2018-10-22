Ext.define('Admin.view.room.emptyRoom.LoadGuestMessage', {
    extend:'Ext.window.Window',

    alias:'widget.loadGuestMessage',
    id:'loadGuestMessage',
    title: '选择客人信息',
   
    
    // draggable:false,//拖动
    resizable:false,	//变大小	
    height:350,
    width: 750,
    layout: 'fit',
    viewModel : {type: 'emptyRoomViewModel'},	 //读取store
    items:[
        {
            xtype: 'gridpanel',
            cls: 'user-grid',
            bind: '{guestList}',
            scrollable: false,
            selModel: {
                selType: 'checkboxmodel'
             },
            columns: [
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'realName',  text: '姓名', align:'center',flex: 1, },
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'idCard',text: '证件号码', align:'center',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'gender', text: '性别', align:'center',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'phone',  text: '手机号码', align:'center',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'state',  text: '状态', align:'center',flex: 1},
            ] ,
            bbar:['->',{
                xtype:'button',
                ui:'soft-blue',
                text:'确认',
                handler:function(btn){
                    let grid = btn.up('gridpanel');
                    let selModel = grid.getSelectionModel();
                    let roomType = document.getElementById('roomType');
                    console.log(1);
                   
                    if (selModel.hasSelection()) {
                        let rows = selModel.getSelection();
                        let selectIds = [];//选中的数据
                        Ext.each(rows,function(row){
                            selectIds.push(row.data);
                        })
                        if(roomType.innerText == "单人房"){
                            if(selectIds.length > 1){
                                Ext.MessageBox.alert('错误提示','单人房最多入住一人!');
                                return;
                            }
                        }else if(roomType.innerText == "双人房"){
                            if(selectIds.length > 2){
                                Ext.MessageBox.alert('错误提示','双人房最多入住两人!');
                                return;
                            }
                        }else if(roomType.innerText == "三人房"){
                            if(selectIds.length > 3){
                                Ext.MessageBox.alert('错误提示','三人房最多入住三人!');
                                return;
                            }
                        }else if(roomType.innerText == "钟点房"){
                            if(selectIds.length > 2){
                                Ext.MessageBox.alert('错误提示','钟点房最多入住两人!');
                                return;
                            }
                        }

                        addTableItems(selectIds);
                        let loadWin = Ext.getCmp('loadGuestMessage');
                        loadWin.destroy();
                        //
                    } else{
                          alert('未选择记录！');
                    }
                }        
            }]
        }
    ],
       
});



