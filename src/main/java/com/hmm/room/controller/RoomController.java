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

import com.hmm.logistics.stock.service.IStockService;
import com.hmm.room.dto.DailyNecessaryDto;
import com.hmm.room.dto.RoomDto;
import com.hmm.room.entity.Room;
import com.hmm.room.service.IRoomService;
import com.hmm.room.util.RoomState;

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
	@Autowired
	private IStockService stockService;
	
	private Logger logger = LoggerFactory.getLogger(this.getClass()); 
	
	
	/**
	 * @Description 搜索出当前楼层的房屋
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
				if(room.getState() == RoomState.CHECKIN) {
					roomDto.setState(1);  //表示正常入住状态
				}else if(room.getState() == RoomState.NEEDCLEAN){
					roomDto.setState(2);  //表示需要清洁状态
				}else if(room.getState() == RoomState.NEED_DAILY_NECESSITIES){
					roomDto.setState(3);  //表示需要日用品状态
				}
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
	@RequestMapping("/getDaily")
	public @ResponseBody List<DailyNecessaryDto> findDailyNecessary(){
		
//		List<Stock> stockList = ;
		List<DailyNecessaryDto> dailyNecessaryList = new ArrayList<>();
		for (int i = 0; i < 5; i++) {
			DailyNecessaryDto dailyNecessaryDto = new DailyNecessaryDto();
			dailyNecessaryDto.setId("Daily_"+i);
			dailyNecessaryDto.setShow("黄欣健"+i);
			dailyNecessaryDto.setNumber(0);  //默认初始化为0
			dailyNecessaryDto.setName("daily"+i);
			dailyNecessaryList.add(dailyNecessaryDto);
		}
		return dailyNecessaryList;
	}
	
	
	
}
