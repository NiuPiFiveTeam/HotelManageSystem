package com.hmm.calendars.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.calendars.entity.SchedulEvent;
import com.hmm.employee.entity.Employee;





@Repository
public interface SchedulEventDao extends JpaSpecificationExecutor<SchedulEvent>,
					PagingAndSortingRepository<SchedulEvent, Long>{
	@Query("SELECT e FROM SchedulEvent e left join e.employ o WHERE date_format(e.startDate,'%Y-%m-%d') = str_to_date(?1,'%Y-%m-%d') and o.userName = ?2")
	SchedulEvent findStartDate(String date ,String userName);
	
	SchedulEvent findByEventDateAndEmploy(Date EventDate , Employee employee);
	
	@Query("select SUM(UNIX_TIMESTAMP(s.endDate)- UNIX_TIMESTAMP(s.startDate))  from "
			+ "SchedulEvent s , Employee e , Calendar c where date_format(s.endDate,'%Y-%m')=date_format(now(),'%Y-%m')  "
			+ "AND e.userName = ?1 and s.employ.emp_id = e.emp_id and c.title <> '休息' and c.id = s.calendar.id ")
	public float findattenceTotalTime(String userbname);
	
	
	
	@Query("select COUNT(*)  from "
			+ "SchedulEvent s , Employee e , Calendar c where date_format(s.endDate,'%Y-%m')=date_format(now(),'%Y-%m')  "
			+ "AND e.userName = ?1 and s.employ.emp_id = e.emp_id  and c.title <> '休息'  and c.title <> '加班'  and c.id = s.calendar.id ")
	public int findWorkTotalDay(String username);
	
	
	
	
}
