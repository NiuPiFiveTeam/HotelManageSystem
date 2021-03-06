package com.hmm.guest.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.hmm.guest.dto.GuestDto;
import com.hmm.guest.dto.GuestInfoDto;
import com.hmm.guest.entity.Guest;
import com.hmm.logistics.roomClean.entity.RoomClean;

public interface IGuestService {

	public abstract Guest findGuestByIdCard(String idCard);
	
	public abstract Iterable<Guest> findAllGuest();

	public abstract void save(Guest guest);

	public abstract Page<GuestDto> findAll( Pageable pageable);

	public abstract List<Guest> findGuestByRoomNo(String roomNo);

	public abstract Page<GuestDto> findAllVipGuest(Pageable pageable);

	public abstract Page<GuestDto> findAllCheckInGuest(Pageable pageable);
}
