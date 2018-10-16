package com.hmm.guest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.guest.entity.Guest;
import com.hmm.guest.service.GuestService;
import com.hmm.guest.service.IGuestService;

@RestController
@RequestMapping("/guest")
public class GuestController {

	@Autowired
	private IGuestService guestService;
	
	@RequestMapping("/findGuestByIdCard")
	public @ResponseBody Guest findGuestByIdCard(String idCard) {
		
		Guest guest = guestService.findGuestByIdCard(idCard);
		System.out.println(guest);
		if (guest == null) {
			return null;
		}else {
			return guest;
		}
		
	}
}
