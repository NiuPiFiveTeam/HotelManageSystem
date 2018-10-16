package com.hmm.guest.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hmm.guest.entity.Guest;
import com.hmm.guest.repository.GuestRepository;

@Service
public class GuestService implements IGuestService {
	
	@Autowired
	private GuestRepository guestRepository ;

	@Override
	public Guest findGuestByIdCard(String idCard) {
		return guestRepository.findGuestByIdCard(idCard);
	}
	
	@Override
	public Iterable<Guest> findAllGuest() {
		
		Iterable<Guest> allGuest = guestRepository.findAll();
		if (allGuest == null) {
			return null;
		}
		return allGuest;
	}
}
