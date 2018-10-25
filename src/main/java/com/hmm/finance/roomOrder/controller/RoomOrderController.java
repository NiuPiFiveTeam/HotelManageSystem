package com.hmm.finance.roomOrder.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.activiti.engine.identity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.common.SessionUtil;
import com.hmm.common.web.ExtAjaxResponse;
import com.hmm.common.web.ExtjsPageRequest;
import com.hmm.finance.roomOrder.domain.RoomOrderDTO;
import com.hmm.finance.roomOrder.domain.RoomOrderQueryDTO;
import com.hmm.finance.roomOrder.service.IRoomOrderService;

@RestController
@RequestMapping(value="/roomOrder")
public class RoomOrderController {
	@Autowired
	private IRoomOrderService roomOrderService;
	
	//入账
	@RequestMapping(value = "/save")
    public ExtAjaxResponse save(@RequestParam(name="dataArray") String[] dataArray,HttpSession session) {
		try {
			User user = SessionUtil.getUser(session);
			roomOrderService.save(dataArray,user);
			return new ExtAjaxResponse(true);
		} catch (Exception e) {
			return new ExtAjaxResponse(false);
		}
    }
	
	//结账
	@RequestMapping("/overOrder")
	public ExtAjaxResponse save2(String bookRoomNo, HttpSession session){
		try {
			User user = SessionUtil.getUser(session);
			roomOrderService.save2(bookRoomNo,user);
			return new ExtAjaxResponse(true);
		} catch (Exception e) {
			return new ExtAjaxResponse(false);
		}
	}

	//返回前台展示
	@RequestMapping(value = "/getOrderInfo")
    public List<RoomOrderDTO> findByRoomNo(String roomNo) {
		try {
			List<RoomOrderDTO> list = roomOrderService.findByRoomNo(roomNo);
			return list;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
    }
	
	@GetMapping
	public Page<RoomOrderDTO> findAll(RoomOrderQueryDTO roomOrderQueryDTO,ExtjsPageRequest pageRequest){
		return roomOrderService.findAll(RoomOrderQueryDTO.getWhereClause(roomOrderQueryDTO),
				pageRequest.getPageable());
	}
	
	
}
