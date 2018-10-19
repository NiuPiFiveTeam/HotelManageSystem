package com.hmm.guest.service;

import com.hmm.guest.dto.GuestInfoDto;
import com.hmm.guest.entity.Guest;

public interface IGuestService {

	public abstract Guest findGuestByIdCard(String idCard);
	
	public abstract Iterable<Guest> findAllGuest();

	public abstract void save(Guest guest);
}
