package com.hmm.room.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hmm.room.entity.Room;
import com.hmm.room.repository.RoomRepository;

@Service
public class RoomService implements IRoomService {

	@Autowired
	private RoomRepository roomRepository;


	@Override
	public List<Room> findRoomByFloorId(Long floorId) {

		List<Room> roomList = null;
		
		roomList = roomRepository.findFloorNodes(floorId);
		
		return roomList.size() <= 0 ? null : roomList;
	}
}
