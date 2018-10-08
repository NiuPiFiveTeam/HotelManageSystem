package com.hmm.logistics.roomClean.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
//	@GetMapping
//	public Page<RoomClean> getPage(ExtjsPageRequest pageable){
//		return roomCleanService.findAll(null, pageable.getPageable());
//	}
	@GetMapping
	public Page<RoomClean> getPage(RoomCleanQueryDTO roomCleanQueryDTO , ExtjsPageRequest pageRequest) 
	{
		if(roomCleanQueryDTO.getRoomNumber()/100>6 && roomCleanQueryDTO.getRoomNumber()/100<1) {
			return roomCleanService.findAll(roomCleanQueryDTO.getWhereClause(roomCleanQueryDTO), pageRequest.getPageable());
		}
		return roomCleanService.findAll(roomCleanQueryDTO.getWhereClause(roomCleanQueryDTO), pageRequest.getPageable());
	}
	
	

	/**
	 * 设置测试数据
	 */
	@RequestMapping("/data")
	public String testData() {
		try {
			for (int i = 0; i < 4; i++) {
				RoomClean roomClean = new RoomClean();
				roomClean.setRoomNumber(605+i);
				roomClean.setFloor("六楼");
				if(((605+i)/100)%2==0) {
				roomClean.setRoomType("双人房");
				}
				else {
				roomClean.setRoomType("单人房");	
				}
				roomClean.setRoomDate(new Date());
				if(i==0) {
					roomClean.setRoomState("退房清洁");
					roomClean.setRoomWorker("阿强");
					roomClean.setRoomOther("无");
				}
				else if(i==1) {
					roomClean.setRoomState("房间服务");
					roomClean.setRoomWorker("阿强");
					roomClean.setRoomOther("清洁房间、送牙刷");
				}
				else if(i==2) {
					roomClean.setRoomState("等待入住");
					roomClean.setRoomWorker("阿强");
					roomClean.setRoomOther("无");
				}
				else if(i==3) {
					roomClean.setRoomState("清洁中");
					roomClean.setRoomWorker("阿强");
					roomClean.setRoomOther("无");
				}
				roomCleanService.save(roomClean);
			}
			RoomClean roomClean = new RoomClean();
			roomClean.setRoomNumber(101);
			roomClean.setFloor("一楼");
			roomClean.setRoomType("单人房");
			roomClean.setRoomDate(new Date());
			roomClean.setRoomState("退房清洁");
			roomClean.setRoomWorker("阿强");
			roomClean.setRoomOther("无");
			roomCleanService.save(roomClean);
			return "success:true";
		} catch (Exception e) {
			return "success:false";
		}
	}
	
}
