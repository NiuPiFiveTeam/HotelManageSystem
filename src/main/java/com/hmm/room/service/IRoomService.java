package com.hmm.room.service;

import java.util.List;

import com.hmm.room.entity.Room;

public interface IRoomService {


	List<Room> findRoomByFloorId(Long floorId);  //根据楼层Id加载对应的房间List

	Room changeEmptyToCheckIn(String selectRoomNo);
	
	Iterable<Room> findAllRoom();

}
