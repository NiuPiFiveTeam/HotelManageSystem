package com.hmm.guest.service;

import com.hmm.guest.entity.Guest;

public interface IGuestService {

	public abstract Guest findGuestByIdCard(String idCard);
	
	public abstract Iterable<Guest> findAllGuest();
}
