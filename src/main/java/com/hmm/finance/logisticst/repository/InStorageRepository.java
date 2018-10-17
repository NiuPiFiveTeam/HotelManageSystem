package com.hmm.finance.logisticst.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.employee.entity.Employee;
import com.hmm.finance.logisticst.domain.InStorage;


@Repository
public interface InStorageRepository extends PagingAndSortingRepository<InStorage, String>,JpaSpecificationExecutor<InStorage>
{

	List<InStorage> findByEmployee(Employee emp);
//	@Query("from Leave leave where leave.userId = ?1") 
//	public Page<Leave> findLeave(String userId,Pageable pageable); 
}
