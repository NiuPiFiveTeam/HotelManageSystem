package com.hmm.finance.salary.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.employee.entity.Employee;
import com.hmm.finance.salary.domain.SalaryOrder;

@Repository
public interface SalaryOrderRepository extends PagingAndSortingRepository<SalaryOrder, Long>,JpaSpecificationExecutor<SalaryOrder>{

} 
