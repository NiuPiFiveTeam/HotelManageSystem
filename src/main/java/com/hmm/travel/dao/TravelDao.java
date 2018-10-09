package com.hmm.travel.dao;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.travel.entity.Travel;



@Repository
public interface TravelDao extends JpaSpecificationExecutor<Travel> ,
								PagingAndSortingRepository<Travel, Integer> {
	
}
