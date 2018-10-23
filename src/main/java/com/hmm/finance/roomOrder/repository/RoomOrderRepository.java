package com.hmm.finance.roomOrder.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.finance.roomOrder.domain.RoomOrder;
import com.hmm.finance.salary.domain.SalaryOrder;

@Repository
public interface RoomOrderRepository extends PagingAndSortingRepository<RoomOrder, Long>,JpaSpecificationExecutor<RoomOrder>{
	
}