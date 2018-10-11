package com.hmm.room.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.room.dto.DailyNecessaryDto;
import com.hmm.room.dto.RoomDto;
import com.hmm.room.entity.Room;
import com.hmm.room.service.IRoomService;
import com.hmm.room.util.TreeNode;

/**
 * @Description 客房相关控制器
 * @author huangxinjian
 *
 */
@RestController
@RequestMapping("/room")
public class RoomController {
	
	@Autowired
	private IRoomService roomService;
	private Logger logger = LoggerFactory.getLogger(this.getClass()); 
	
	
	/**
	 * @Description搜索出当前楼层的房屋
	 * @return
	 */
	@RequestMapping("/findRoom")
	public @ResponseBody List<RoomDto> findRoomByFloorId(@RequestParam("floorId") String floorId) {
//		logger.info("nihao");
		
		Long floorIdL = Long.parseLong(floorId);
		List<Room> roomList = roomService.findRoomByFloorId(floorIdL);
		List<RoomDto> roomDtos = null;
		if (roomList.size()>0) {
			roomDtos = new ArrayList<RoomDto>();
			for (Room room : roomList) {
				RoomDto roomDto  = new RoomDto();
				BeanUtils.copyProperties(room, roomDto);
				roomDto.setFloorId(room.getFloorNode().getFloorId());
				roomDtos.add(roomDto);
			}
		}
		
		return roomDtos;
	}
	
	/**
	 * @Description 找出所有的 日用品清单项
	 * @return
	 */
	public @ResponseBody List<DailyNecessaryDto> findDailyNecessary(){
		
		
		
		return null;
	}
	
	
	
}
