package com.hmm.Work.dao;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.Work.entity.Work;
import com.hmm.employee.entity.Employee;



@Repository
public interface WorkDao extends JpaSpecificationExecutor<Work> , PagingAndSortingRepository<Work, Long> {
	
	Work findByWorkDateAndEmploy(Date workDate,Employee employee);
	
}
