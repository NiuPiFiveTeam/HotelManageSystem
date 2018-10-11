package com.hmm.room.entity;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.hmm.room.repository.RoomRepository;
import com.hmm.room.service.RoomService;


@RunWith(SpringRunner.class)
@SpringBootTest
public class RoomTest {

	@Autowired
	private RoomRepository roomRepository;
	
	@Test
	public void test() {
		
		Floor floor = new Floor();
		floor.setFloorId(1000003L);
		for (int i = 0; i < 20; i++) {
			Room roon = new Room();
			roon.setRoomId((long)(i+25));
			if (i<=9) {
				roon.setRoomNo("30"+i);
			}else {
				roon.setRoomNo("3"+i);
			}
			
			roon.setRoomPass("123456");
			roon.setFloorNode(floor);
			roomRepository.save(roon);
		}
	}

}
