package com.hmm.calendars.dao;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.calendars.entity.SchedulEvent;



@Repository
public interface SchedulEventDao extends JpaSpecificationExecutor<SchedulEvent>,
					PagingAndSortingRepository<SchedulEvent, Long>{

}
