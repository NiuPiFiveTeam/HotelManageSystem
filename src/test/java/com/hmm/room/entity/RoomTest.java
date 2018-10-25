package com.hmm.room.entity;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.hmm.room.repository.RoomRepository;
import com.hmm.room.service.RoomService;
import com.hmm.room.util.RoomState;
import com.hmm.room.util.RoomType;


@RunWith(SpringRunner.class)
@SpringBootTest
public class RoomTest {

	@Autowired
	private RoomRepository roomRepository;
	
	@Test
	public void test() {
		
		Floor floor = new Floor();
		floor.setFloorId(1000006L);
		for (int i = 0; i < 30; i++) {
			Room roon = new Room();
			roon.setRoomId((long)(i+150));
			if (i<=9) {
				roon.setRoomNo("60"+i);
			}else {
				roon.setRoomNo("6"+i);
			}
			
			roon.setState(RoomState.EMPTY);
			if (i%2 ==0) {
				roon.setPrice("200");
				roon.setType(RoomType.DOUBLEROOM);
			}else if(i%3 == 0){
				roon.setPrice("80");
				roon.setType(RoomType.HOURROOM);
			}
			else {
				roon.setPrice("300");
				roon.setType(RoomType.TRIPLEROOM);
			}
			
			
			roon.setRoomPass("123456");
			roon.setFloorNode(floor);
			roomRepository.save(roon);
		}
	}

}
