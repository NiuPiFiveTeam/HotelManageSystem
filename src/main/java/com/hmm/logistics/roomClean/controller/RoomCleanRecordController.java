package com.hmm.logistics.roomClean.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.common.web.ExtAjaxResponse;
import com.hmm.common.web.ExtjsPageRequest;
import com.hmm.logistics.roomClean.entity.RoomCleanRecord;
import com.hmm.logistics.roomClean.service.IRoomCleanRecordService;

/**
 * 
* @Title: RoomCleanRecordController.java
* @Package com.hmm.logistics.roomClean.controller
* @Description: TODO(客房内务操作记录控制类，用于与前端交互)
* @author DJDU
* @date 2018年10月9日
* @version V1.0
 */

@RestController
@RequestMapping("roomCleanRecord")
public class RoomCleanRecordController {
	@Autowired
	private IRoomCleanRecordService roomCleanRecordService;
	
	
	//增
	@PostMapping(consumes=MediaType.APPLICATION_JSON_VALUE)
	public ExtAjaxResponse save(@RequestBody RoomCleanRecord roomCleanRecord) 
	{
		try {
			roomCleanRecordService.save(roomCleanRecord);
			return new ExtAjaxResponse(true,"保存成功！");
		} catch (Exception e) {
			return new ExtAjaxResponse(true,"保存失败！");
		}
	}
	
	
	
	
	
}
