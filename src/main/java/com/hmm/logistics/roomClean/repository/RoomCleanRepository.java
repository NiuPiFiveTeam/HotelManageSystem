package com.hmm.logistics.roomClean.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.logistics.roomClean.dto.FloorVoRoomVoRoomCleanDTO;
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
	@Query("FROM RoomClean rc WHERE rc.room.roomId=?1") 
	public RoomClean findByRoomId(Long roomId);
	
//	@Query("FROM Floor f,Room r,RoomClean rc WHERE r.roomId=rc.room.roomId and r.floorNode.floorId=f.floorId") 
//	public List<Object> findAllFloorVoRoomVoRoomClean();
}