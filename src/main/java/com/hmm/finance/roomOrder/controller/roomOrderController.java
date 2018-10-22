package com.hmm.finance.roomOrder.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.common.web.ExtAjaxResponse;
import com.hmm.common.web.ExtjsPageRequest;

@RestController
@RequestMapping(value="/roomOrder")
public class roomOrderController {
	
	
	
	@RequestMapping(value = "/save")
    public ExtAjaxResponse save(@RequestParam(name="dataArray") String[] dataArray) {
		
		/**
		 *  1. bookRoomNo : 房间订单号   20181022161752
		 *  2. roomType ：房间类型  单人房
		 *  'booksource':订单来源,  到店订房
	     *   'roomPrice':房价, 100
	     *   'checkInTime':入住时间,  2018-10-22 16:17:47
	     *  'checkOutTime':退房时间, 2018-10-23 12:00:00
	     *   'bookGuest':预定人,  非预定
	     *  'bookPhone':预定号码, 无
	     *   'remark':备注,
		 */
		for (String string : dataArray) {
			System.out.println(string);
		}
		return new ExtAjaxResponse(true);
    }
	
}
