package com.hmm.finance.roomOrder.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.common.web.ExtAjaxResponse;
import com.hmm.common.web.ExtjsPageRequest;
import com.hmm.employee.entity.EmployeeDTO;
import com.hmm.employee.entity.EmployeeQueryDTO;
import com.hmm.finance.roomOrder.domain.RoomOrder;
import com.hmm.finance.roomOrder.domain.RoomOrderQueryDTO;
import com.hmm.finance.roomOrder.service.IRoomOrderService;

@RestController
@RequestMapping(value="/roomOrder")
public class RoomOrderController {
	@Autowired
	private IRoomOrderService roomOrderService;
	
	@RequestMapping(value = "/save")
    public ExtAjaxResponse save(@RequestParam(name="dataArray") String[] dataArray) {
		try {
			roomOrderService.save(dataArray);
			return new ExtAjaxResponse(true);
		} catch (Exception e) {
			return new ExtAjaxResponse(false);
		}
    }
	
	@GetMapping
	public Page<RoomOrder> findAll(RoomOrderQueryDTO roomOrderQueryDTO,ExtjsPageRequest pageRequest){
		return roomOrderService.findAll(RoomOrderQueryDTO.getWhereClause(roomOrderQueryDTO),
				pageRequest.getPageable());
	}
	
	
}