package com.hmm.logistics.stock.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

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
public interface InDetailedRepository extends PagingAndSortingRepository<InDetailed, Long>,JpaSpecificationExecutor<InDetailed>{

}
