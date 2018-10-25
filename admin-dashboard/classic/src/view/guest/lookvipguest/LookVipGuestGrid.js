Ext.define('Admin.view.guest.lookvipguest.LookVipGuestGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'lookVipGuestGrid',
   title:'会员信息',
    bind: '{vipguestList}',
    scrollable: false,
    selModel: {
        selType: 'checkboxmodel'
        },
    columns: [
        {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'realName',  text: '姓名', align:'center',flex: 1, },
        {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'idCard',text: '证件号码', align:'center',flex: 1},
        {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'gender', text: '性别', align:'center',flex: 1,
        renderer:function(value){
            if(value == 'MALE'){
                return '男性';
            }else if(value == 'FEMALE'){
                return '女性';
            }
        }},
        {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'phone',  text: '手机号码', align:'center',flex: 1},
        {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'state',  text: '状态', align:'center',flex: 1,
        renderer:function(value){
            if(value == 'CASUAL'){
                return '临时客人';
            }else if(value == 'STARMEMBER'){
                return '星标会员';
            }else if(value == 'BLACKLIST'){
                return '黑名单';
            }else if(value == 'MEMBER'){
                return '普通会员';
            }
        },
        },
    ] ,
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        // itemId: 'userPaginationToolbar',
        displayInfo: true,
        bind: '{vipguestList}'
    }],
});
