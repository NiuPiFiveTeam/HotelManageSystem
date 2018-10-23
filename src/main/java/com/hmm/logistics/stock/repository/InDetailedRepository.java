package com.hmm.logistics.stock.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.finance.logisticst.domain.InStorage;
import com.hmm.finance.logisticst.domain.InStorageDetailedDTO;
import com.hmm.logistics.stock.entity.InDetailed;

/**
 * 
* @Title: InDetailedRepository.java
* @Package com.hmm.logistics.stock.repository
* @Description: TODO(入库详情表与数据库的各种操作)
* @author DJDU
* @date 2018年10月9日
* @version V1.0
 */
@Repository
public interface InDetailedRepository extends PagingAndSortingRepository<InDetailed, Long>,JpaSpecificationExecutor<InDetailed>{
	@Query(value = "select new com.hmm.finance.logisticst.domain.InStorageDetailedDTO(i.id,i.goodsName,i.unit,i.price,i.amount)"
			+ "  from InDetailed i where inAll=?1")
	Page<InStorageDetailedDTO> findInStorageDetailedByInAll(InStorage inStorageId,Pageable pageable);

}
