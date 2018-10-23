package com.hmm.guest.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.hmm.guest.dto.GuestDto;
import com.hmm.guest.dto.GuestInfoDto;
import com.hmm.guest.entity.Guest;
import com.hmm.guest.repository.GuestRepository;
import com.hmm.logistics.roomClean.entity.RoomClean;

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

	@Override
	public void save(Guest guest) {
		guestRepository.save(guest);		
	}

	@Override
	public Page<GuestDto> findAll(Pageable pageable) {
		return guestRepository.findGuestInfo(pageable);
	}
}
