package com.hmm.room.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.common.web.ExtAjaxResponse;
import com.hmm.guest.entity.Guest;
import com.hmm.guest.service.IGuestService;
import com.hmm.logistics.stock.service.IStockService;
import com.hmm.room.dto.DailyNecessaryDto;
import com.hmm.room.dto.RoomDto;
import com.hmm.room.entity.Room;
import com.hmm.room.service.IRoomService;
import com.hmm.room.util.RoomState;
import com.hmm.room.util.RoomType;

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
	
	@Autowired
	private IGuestService guestService;
	
	private Logger logger = LoggerFactory.getLogger(this.getClass()); 
	
	
	@RequestMapping("/findAllRoom")
	public @ResponseBody ExtAjaxResponse findAllRoom() {
		
		/**
		 *  房型 房间总数、房价、在住、停售房、当前可售、楼层
		 *  
		 */
		int singleRoomCount = 0;  //单人房总数
		int singleRoomCheckInCount = 0; //入住数
		String singleRoomPrice = null;
		int doubleRoomCount = 0;  //双人房总数
		int doubleRoomCheckInCount = 0; //入住
		String doubleRoomPrice = null;
		int thipleRoomCount = 0;  //三人房总数
		int thipleRoomCheckInCount = 0; //入住
		String thipleRoomPrice = null;
		int hourRoomCount = 0;  //钟点房总数
		int hourRoomCheckInCount = 0;  //入住
		String hourRoomPrice = null;
		
		int firstFloorNumber = 0; //1楼房间数
		int secondFloorNumber = 0; //1楼房间数
		int thirdFloorNumber = 0; //1楼房间数
		int fourFloorNumber = 0; //1楼房间数
		int fiveFloorNumber = 0; //1楼房间数
		int sixFloorNumber = 0; //1楼房间数
		
		int firstFloorCINumber = 0; //1楼房间数
		int secondFloorCINumber = 0; //1楼房间数
		int thirdFloorCINumber = 0; //1楼房间数
		int fourFloorCINumber = 0; //1楼房间数
		int fiveFloorCINumber = 0; //1楼房间数
		int sixFloorCINumber = 0; //1楼房间数
		
		Map<String, String> maps = new HashMap<>();
		List<RoomDto> roomDtos = new ArrayList<>();
		Iterable<Room> roomIterable = roomService.findAllRoom();
		for (Room room : roomIterable) {
			String floorName = room.getFloorNode().getFloorName();
			System.out.println(floorName);
			if (floorName.equals("一楼")) {
				if (room.getState() != RoomState.EMPTY) {
					firstFloorCINumber += 1;
				}
				firstFloorNumber += 1;
			}else if (floorName.equals("二楼")) {
				if (room.getState() != RoomState.EMPTY) {
					secondFloorCINumber += 1;
				}
				secondFloorNumber += 1;
			}else if (floorName.equals("三楼")) {
				if (room.getState() != RoomState.EMPTY) {
					thirdFloorCINumber += 1;
				}
				thirdFloorNumber += 1;
			}else if (floorName.equals("四楼")) {
				if (room.getState() != RoomState.EMPTY) {
					fourFloorCINumber += 1;
				}
				fourFloorNumber += 1;
			}else if (floorName.equals("五楼")) {
				if (room.getState() != RoomState.EMPTY) {
					fiveFloorCINumber += 1;
				}
				fiveFloorNumber += 1;
			}else if (floorName.equals("六楼")) {
				if (room.getState() != RoomState.EMPTY) {
					sixFloorCINumber += 1;
				}
				sixFloorNumber += 1;
			}
			
			System.out.println(room);
			RoomType roomType = room.getType();
			RoomState roomState = room.getState();
			if (roomType == RoomType.SINGLEROOM) {
				singleRoomCount += 1;  //房间数+1
				singleRoomPrice = room.getPrice();
				if (roomState != RoomState.EMPTY) {
					singleRoomCheckInCount += 1;  //入住数+1
				}
			}else if(roomType == RoomType.DOUBLEROOM) {
				doubleRoomCount += 1;
				doubleRoomPrice = room.getPrice();
				if (roomState != RoomState.EMPTY) {
					doubleRoomCheckInCount += 1;  //入住数+1
				}
			}else if(roomType == RoomType.TRIPLEROOM) {
				thipleRoomCount += 1;
				thipleRoomPrice = room.getPrice();
				if (roomState != RoomState.EMPTY) {
					thipleRoomCheckInCount += 1;  //入住数+1
				}
			}else if(room.getType() == RoomType.HOURROOM) {
				hourRoomCount += 1; 
				hourRoomPrice = room.getPrice();
				if (roomState != RoomState.EMPTY) {
					hourRoomCheckInCount += 1;  //入住数+1
				}
			}
		}
		String[] roomtypeArray = {"SINGLEROOM","DOUBLEROOM","TRIPLEROOM","HOURROOM"};
		int[] roomNumber = {singleRoomCount,doubleRoomCount,thipleRoomCount,hourRoomCount};
		int[] roomCheckInNumber = {singleRoomCheckInCount,doubleRoomCheckInCount,thipleRoomCheckInCount,hourRoomCheckInCount};
		int[] floorNumber = {firstFloorNumber,secondFloorNumber,thirdFloorNumber,fourFloorNumber,fiveFloorNumber,sixFloorNumber};
		int[] floorCINumber = {firstFloorCINumber,secondFloorCINumber,thirdFloorCINumber,fourFloorCINumber,fiveFloorCINumber,sixFloorCINumber};
		String[] roomPrice = {singleRoomPrice,doubleRoomPrice,thipleRoomPrice,hourRoomPrice};
		maps.put("roomType", Arrays.toString(roomtypeArray));
		maps.put("roomNumber", Arrays.toString(roomNumber));
		maps.put("roomCheckInNumber", Arrays.toString(roomCheckInNumber));
		maps.put("roomPrice", Arrays.toString(roomPrice));
		maps.put("floorNumber", Arrays.toString(floorNumber));
		maps.put("floorCINumber", Arrays.toString(floorCINumber));
		return new ExtAjaxResponse(true,maps);
		
	}
	
	/**
	 * @Description 搜索出当前楼层的房屋
	 * @return
	 */
	@RequestMapping("/findRoom")
	public @ResponseBody List<RoomDto> findRoomByFloorId(@RequestParam("floorId") String floorId,@RequestParam("type") String type) {
//		logger.info("nihao");
		
		Long floorIdL = Long.parseLong(floorId);
		List<Room> roomList = roomService.findRoomByFloorId(floorIdL);
		
		List<RoomDto> roomDtos = null;
		if (roomList.size()>0) {
			roomDtos = new ArrayList<RoomDto>();
			for (Room room : roomList) {
				RoomDto roomDto  = new RoomDto();
				BeanUtils.copyProperties(room, roomDto);
				if (type.equals("empty")) {
					if (room.getState() == RoomState.EMPTY) {
						roomDto.setState(0);  //表示空闲状态
						if (room.getType() == RoomType.SINGLEROOM) {  //说明是单人房
							roomDto.setType(1);
						}else if (room.getType() == RoomType.DOUBLEROOM) {
							roomDto.setType(2);
						}else if (room.getType() == RoomType.TRIPLEROOM) {
							roomDto.setType(3);
						}else if (room.getType() == RoomType.HOURROOM) {
							roomDto.setType(4);
						}
					}else {
						continue;
					}
				}else if (type.equals("checkIn")) {
					if (room.getState() != RoomState.EMPTY) {
						if(room.getState() == RoomState.CHECKIN) {
							roomDto.setState(1);  //表示正常入住状态
						}else if(room.getState() == RoomState.NEEDCLEAN){
							roomDto.setState(3);  //表示需要清洁状态
						}else if(room.getState() == RoomState.NEED_DAILY_NECESSITIES){
							roomDto.setState(2);  //表示需要日用品状态
						}
						if (room.getType() == RoomType.SINGLEROOM) {  //说明是单人房
							roomDto.setType(1);
						}else if (room.getType() == RoomType.DOUBLEROOM) {
							roomDto.setType(2);
						}else if (room.getType() == RoomType.TRIPLEROOM) {
							roomDto.setType(3);
						}else if (room.getType() == RoomType.HOURROOM) {
							roomDto.setType(4);
						}
					}else {
						continue;
					}
					
				}
				
				roomDto.setFloorId(room.getFloorNode().getFloorId());
				roomDtos.add(roomDto);
			}
		}
		
		return roomDtos;
	}
	
	@RequestMapping("/changeEmptyToCheckIn")
	public ExtAjaxResponse changeEmptyToCheckIn(@RequestParam("selectRoomNo") String selectRoomNo,@RequestParam(name="guestList") String[] guestList) {
		

		for (String string : guestList) {
			System.out.println(string);
		}
		Room room = roomService.changeEmptyToCheckIn(selectRoomNo);
		int size = guestList.length;  //入住有多少个人
		System.out.println(size);
		for (String idCard : guestList) {
			System.out.println(idCard+"123");
			Guest guest = guestService.findGuestByIdCard(idCard);
			Room guestRoom = guest.getRoom();
			if (guestRoom == null) {  //说明是还没入住的旅客
				guest.setRoom(room);
			}
			guestService.save(guest);
		}
		
		return new ExtAjaxResponse(true,"入住成功！请安排旅客休息！");
	}
	
	
	/**
	 * @Description 找出所有的 日用品清单项
	 * @return
	 */
	@RequestMapping("/getDaily")
	public @ResponseBody List<DailyNecessaryDto> findDailyNecessary(){
		
//		List<Stock> stockList = ;
		List<DailyNecessaryDto> dailyNecessaryList = new ArrayList<>();
//		for (int i = 0; i < 5; i++) {
//			DailyNecessaryDto dailyNecessaryDto = new DailyNecessaryDto();
//			
//			dailyNecessaryDto.setId("Daily_"+i);
//			dailyNecessaryDto.setShow("黄欣健"+i);
//			dailyNecessaryDto.setNumber(0);  //默认初始化为0
//			dailyNecessaryDto.setName("daily"+i);
//			
//			dailyNecessaryList.add(dailyNecessaryDto);
//		}
		dailyNecessaryList=stockService.findByStockType();
		return dailyNecessaryList;
	}
	
	
	@RequestMapping("/changeCheckOutRoomStatus")
	public @ResponseBody ExtAjaxResponse changeCheckOutRoomStatus(String roomNo){
		
		roomService.changeCheckOutRoomStatus(roomNo); //修改房间状态为需要清洁
		List<Guest> guests = guestService.findGuestByRoomNo(roomNo);
		for (Guest guest : guests) {
			guest.setRoom(null);
			System.out.println(guest);
			guestService.save(guest);
		}
		return new ExtAjaxResponse(true);
		
	}
		
	
	
}
