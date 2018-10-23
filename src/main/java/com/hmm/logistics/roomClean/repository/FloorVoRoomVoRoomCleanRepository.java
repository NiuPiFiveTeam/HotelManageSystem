package com.hmm.logistics.roomClean.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.logistics.roomClean.entity.FloorVoRoomVoRoomClean;
/**
 * 
* @Title: FloorVoRoomVoRoomCleanRepository.java
* @Package com.hmm.logistics.roomClean.repository
* @Description: TODO(过渡表使用)
* @author DJDU
* @date 2018年10月17日
* @version V1.0
 */
@Repository
public interface FloorVoRoomVoRoomCleanRepository extends PagingAndSortingRepository<FloorVoRoomVoRoomClean, Long>,JpaSpecificationExecutor<FloorVoRoomVoRoomClean>{

}
