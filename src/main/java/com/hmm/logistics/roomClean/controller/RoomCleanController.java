package com.hmm.logistics.roomClean.controller;

import java.util.Date;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.common.beans.BeanUtils;
import com.hmm.common.web.ExtAjaxResponse;
import com.hmm.common.web.ExtjsPageRequest;
import com.hmm.logistics.roomClean.entity.RoomClean;
import com.hmm.logistics.roomClean.entity.RoomCleanQueryDTO;
import com.hmm.logistics.roomClean.service.IRoomCleanService;

/**
 * 
* @Title: RoomCleanController.java
* @Package com.hmm.logistics.roomClean.controller
* @Description: TODO(客房内务控制类，用于与前端交互)
* @author DJDU
* @date 2018年10月8日
* @version V1.0
 */

@RestController
@RequestMapping("roomClean")
public class RoomCleanController { 
	@Autowired
	private IRoomCleanService roomCleanService;
	@GetMapping
	public Page<RoomClean> getPage(RoomCleanQueryDTO roomCleanQueryDTO , ExtjsPageRequest pageRequest) 
	{
		return roomCleanService.findAll(roomCleanQueryDTO.getWhereClause(roomCleanQueryDTO), pageRequest.getPageable());
	}
	
	@PutMapping(value="{id}",consumes=MediaType.APPLICATION_JSON_VALUE)
	public ExtAjaxResponse update(@PathVariable("id") Long myId,@RequestBody RoomClean dto) {
		try {
			System.out.println(myId);
			RoomClean entity=roomCleanService.findById(myId);
			if(entity!=null) {
				BeanUtils.copyProperties(dto, entity);
				roomCleanService.save(entity);
			}
			return new ExtAjaxResponse(true,"更新成功！");
		}catch(Exception e) {
			e.printStackTrace();
			return new ExtAjaxResponse(true,"更新失败！");
		}
	}
	

	/**
	 * 设置测试数据
	 */
	@RequestMapping("/data")
	public String testData() {
		try {
			for (int i = 0; i < 4; i++) {
				RoomClean roomClean = new RoomClean();
				roomClean.setRoomNumber("60"+(i+1));
				roomClean.setFloor("六楼");
				if(((605+i)/100)%2==0) {
				roomClean.setRoomType("双人房");
				}
				else {
				roomClean.setRoomType("单人房");	
				}
				if(i==0) {
					roomClean.setRoomState("退房清洁");
					roomClean.setRoomOther("无");
				}
				else if(i==1) {
					roomClean.setRoomState("房间服务");
					roomClean.setRoomOther("清洁房间、送牙刷");
				}
				else if(i==2) {
					roomClean.setRoomState("等待入住");
					roomClean.setRoomOther("无");
				}
				else if(i==3) {
					roomClean.setRoomState("清洁中");
					roomClean.setRoomOther("无");
				}
				roomCleanService.save(roomClean);
			}
			
			
			RoomClean roomClean = new RoomClean();
			roomClean.setRoomNumber("101");
			roomClean.setFloor("一楼");
			roomClean.setRoomType("单人房");
			roomClean.setRoomState("退房清洁");
			roomClean.setRoomOther("无");
			roomCleanService.save(roomClean);
			
			
			
			return "success:true";
		} catch (Exception e) {
			return "success:false";
		}
	}

}
