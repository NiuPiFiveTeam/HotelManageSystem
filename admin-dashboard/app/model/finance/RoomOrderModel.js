Ext.define('Admin.model.finance.RoomOrderModel', {
    extend: 'Admin.model.Base',
    idProperty:'roomOrderId',
 
    fields: [
        {type: 'int',name: 'bookRoomNo'},//房间订单号   20181022161752
        {type: 'string',name: 'roomType'},//房间类型  单人房
        {type: 'string',name: 'booksource'},//订单来源,  到店订房
        {type: 'float',name: 'roomPrice'},//房价, 100

        {type: 'date',name: 'checkInTime'},//入住时间,  2018-10-22 16:17:47
        {type: 'date',name: 'checkOutTime'},//退房时间,  2018-10-22 16:17:47
        {type: 'string',name: 'bookGuest'},//预定人
        {type: 'string',name: 'bookPhone'},//预定号码, 无

        {type: 'string',name: 'remark'},//备注
        {type: 'float',name: 'totalIncome'},//订单总收入


        {type: 'int',name: 'roomNo'},//客房号
        {type: 'float',name: 'realIncome'},//实际收入
        {type: 'string',name: 'roomOrderStatus'},//客房状态
        
        
    ]
    
});
