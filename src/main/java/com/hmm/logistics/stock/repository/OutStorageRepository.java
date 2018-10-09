package com.hmm.logistics.stock.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.hmm.logistics.stock.entity.OutStorage;

/**
 * 
* @Title: OutStorageRepository.java
* @Package com.hmm.logistics.stock.repository
* @Description: TODO(出库总表与数据库的各种操作)
* @author DJDU
* @date 2018年10月9日
* @version V1.0
 */
public interface OutStorageRepository extends PagingAndSortingRepository<OutStorage, Long>,JpaSpecificationExecutor<OutStorage>{

}
