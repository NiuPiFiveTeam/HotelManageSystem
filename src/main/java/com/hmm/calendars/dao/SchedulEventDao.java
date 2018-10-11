package com.hmm.calendars.dao;

import java.util.Date;
import java.util.List;


import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.calendars.entity.SchedulEvent;





@Repository
public interface SchedulEventDao extends JpaSpecificationExecutor<SchedulEvent>,
					PagingAndSortingRepository<SchedulEvent, Long>{
	@Query("SELECT e FROM SchedulEvent e join e.employ o WHERE date_format(e.startDate,'%Y-%m-%d') = str_to_date(?1,'%Y-%m-%d') and o.userName = ?2")
	List<SchedulEvent> findStartDate(Date date ,String userName);
	
}
