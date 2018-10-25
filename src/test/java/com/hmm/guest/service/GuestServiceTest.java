package com.hmm.guest.service;

import static org.junit.Assert.*;

import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.hmm.guest.entity.Guest;
import com.hmm.guest.repository.GuestRepository;
import com.hmm.guest.util.Gender;
import com.hmm.guest.util.GuestState;

@RunWith(SpringRunner.class)
@SpringBootTest
public class GuestServiceTest {

	@Autowired
	private IGuestService guestService;
	
	private GuestRepository GuestRepository;
	
	@Test
	public void test() {
	
			for (int i = 0; i < 30; i++) {
				 Guest guest = new Guest();
				 String idCard = null;
				 if (i<=9) {
					 idCard = "44122519960813110"+i;
				}else  {
					 idCard = "4412251996081311"+i;
				}
				 
				 guest.setGuestId("Guest"+idCard);
				 guest.setIdCard(idCard);
				 guest.setAddress("广东省肇庆市封开县江口镇");
				 if (i %2==0) {
					 guest.setGender(Gender.MALE);
				}else {
					guest.setGender(Gender.FEMALE);
				}
				 
				 guest.setPhone("13538364468");
				 guest.setRealName("Guest"+i);
				 guest.setRegisterTime(new Date());
				 guest.setState(GuestState.CASUAL);
				 guestService.save(guest);
			}
	}
//	@Test
//	public void test1() {
//	
//		Long id = 129;
//	}
//	

}
