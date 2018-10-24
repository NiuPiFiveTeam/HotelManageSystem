package com.hmm.logistics.roomClean.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.logistics.roomClean.entity.RoomClean;
import com.hmm.logistics.roomClean.entity.RoomCleanRecord;

/**
 * 
* @Title: RoomCleanRecordRepository.java
* @Package com.hmm.logistics.roomClean.repository
* @Description: TODO(定义房间操作记录与数据库的各种操作)
* @author DJDU
* @date 2018年10月9日
* @version V1.0
 */

@Repository//扫描持久层
public interface RoomCleanRecordRepository extends PagingAndSortingRepository<RoomCleanRecord, Long>,JpaSpecificationExecutor<RoomCleanRecord>{

	/*自定义查询*/
	
//	 @Query("from User o where o.id = :id") 
//	 public Order findByUserId(@Param("id") Long myid);
	@Query("FROM RoomCleanRecord rcr WHERE rcr.room.roomId=?1") 
	public List<RoomCleanRecord> findByRoomId(Long roomId);
}
