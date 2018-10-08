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

	/**
	  * 加载树形菜单，返回json
	 */
	@Override
	public List<Room> loadTreeMenu() {
		
		Iterable<Room> roomIterable = roomRepository.findAll();
		List<Room> roomlist = new ArrayList<>();
		
		for (Room room : roomIterable) {
			roomlist.add(room);
			
		}
		System.out.println(roomlist);
		return roomlist;
	}
}
