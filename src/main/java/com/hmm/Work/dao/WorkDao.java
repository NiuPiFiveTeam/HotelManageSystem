package com.hmm.Work.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.Work.entity.Work;
import com.hmm.employee.entity.Employee;



@Repository
public interface WorkDao extends JpaSpecificationExecutor<Work> , PagingAndSortingRepository<Work, Long> {
	
	Work findByWorkDateAndEmploy(Date workDate,Employee employee);
	
	@Query("SELECT COUNT(*) from Employee e, Work w where DATE_FORMAT(w.workDate,'%Y-%m') = date_format(now(),'%Y-%m') " + 
			"AND e.userName = ?1 AND w.employ.emp_id = e.emp_id AND w.late = 1")
	int findByEmployAndOntudytimelate(String userName);//迟到次数（当月）
	
	@Query("SELECT COUNT(*) from Employee e, Work w where DATE_FORMAT(w.workDate,'%Y-%m') = date_format(now(),'%Y-%m') " + 
			"AND e.userName = ?1 AND w.employ.emp_id = e.emp_id AND w.lackCard = 1")
	int findByEmployAndOntudytimelackCard(String userName);//缺卡次数（当月）
	
	@Query("SELECT COUNT(*) from Employee e, Work w where DATE_FORMAT(w.workDate,'%Y-%m') = date_format(now(),'%Y-%m') " + 
			"AND e.userName = ?1 AND w.employ.emp_id = e.emp_id AND w.leaveEarly = 1")
	int findByEmployAndOntudytimeleaveEarly(String userName);//早退次数（当月）
	
	@Query("SELECT COUNT(*) from Employee e, Work w where DATE_FORMAT(w.workDate,'%Y-%m') = date_format(now(),'%Y-%m') " + 
			"AND e.userName = ?1 AND w.employ.emp_id = e.emp_id AND w.normal = 1")
	int findByEmployAndOntudytimenormal(String userName);//不正常次数（当月）
	
	@Query("select SUM(w.worktime)  from Work w , Employee e  where date_format(w.workDate,'%Y-%m')=date_format(now(),'%Y-%m')"
			+ "AND e.userName = ?1 and w.employ.emp_id = e.emp_id ")
	public float findattenceTotalworktime(String userbname);//当月上班时间
	
	@Query("select SUM(w.overtime)  from Work w , Employee e  where date_format(w.workDate,'%Y-%m')=date_format(now(),'%Y-%m')"
			+ "AND e.userName = ?1 and w.employ.emp_id = e.emp_id ")
	public float findattenceTotalovertime(String userbname);//当月加班时间
	
	
	
	
	
	
}
