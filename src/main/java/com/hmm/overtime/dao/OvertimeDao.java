package com.hmm.overtime.dao;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.overtime.entity.Overtime;



@Repository
public interface OvertimeDao extends JpaSpecificationExecutor<Overtime> , 
				PagingAndSortingRepository<Overtime, Integer> {

}
