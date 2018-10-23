package com.hmm.finance.logisticst.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.employee.entity.Employee;
import com.hmm.finance.logisticst.domain.InStorage;
import com.hmm.finance.logisticst.domain.InStorageDTO;


@Repository
public interface InStorageRepository extends PagingAndSortingRepository<InStorage, String>,JpaSpecificationExecutor<InStorage>
{

	List<InStorage> findByEmployee(Employee emp);
//	@Query("from Leave leave where leave.userId = ?1") 
//	public Page<Leave> findLeave(String userId,Pageable pageable); 

	@Query("select new com.hmm.finance.logisticst.domain.InStorageDTO(i.inStorageId,i.inStorageDate,i.vender,"
			+ "i.amount,i.employee.userName,i.applyTime,i.processStatus)"
			+ " from InStorage i ")
	Page<InStorageDTO> findCompleteInStorage(Pageable pageable);
}
