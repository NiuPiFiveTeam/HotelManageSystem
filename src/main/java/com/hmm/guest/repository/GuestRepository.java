package com.hmm.guest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.guest.entity.Guest;

@Repository
public interface GuestRepository extends PagingAndSortingRepository<Guest, String>{

	@Query("from Guest g where g.idCard = ?1 ")
	public Guest findGuestByIdCard(String idCard);
	

}
