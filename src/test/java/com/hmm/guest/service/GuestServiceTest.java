package com.hmm.guest.service;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.hmm.guest.entity.Guest;

@RunWith(SpringRunner.class)
@SpringBootTest
public class GuestServiceTest {

	@Autowired
	private IGuestService guestService;
	
	@Test
	public void test() {
		
//		 Guest allGuest = guestService.findGuestByIdCard("441225199608130076");
//		 System.out.println(allGuest);
		Iterable<Guest> guestLists = guestService.findAllGuest();
		for (Guest guest : guestLists) {
			System.out.println(guest);
		}
	}

}
