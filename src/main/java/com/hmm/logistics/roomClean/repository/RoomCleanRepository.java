package com.hmm.logistics.roomClean.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.logistics.roomClean.entity.RoomClean;

/**
 * 
* @Title: RoomCleanRepository.java
* @Package com.hmm.logistics.roomClean.repository
* @Description: TODO(定义与数据库的各种操作)
* @author DJDU
* @date 2018年10月8日
* @version V1.0
 */




@Repository//扫描持久层
public interface RoomCleanRepository extends PagingAndSortingRepository<RoomClean, Long>,JpaSpecificationExecutor<RoomClean>
{
	/*自定义查询*/
	
//	 @Query("from User o where o.id = :id") 
//	 public Order findByUserId(@Param("id") Long myid);
}