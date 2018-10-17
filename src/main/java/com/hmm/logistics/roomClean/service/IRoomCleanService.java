package com.hmm.logistics.roomClean.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.hmm.logistics.roomClean.dto.FloorVoRoomVoRoomCleanDTO;
import com.hmm.logistics.roomClean.entity.RoomClean;



/**
 * 
* @Title: IRoomCleanService.java
* @Package com.hmm.logistics.roomClean.service
* @Description: TODO(客房内务接口业务流程)
* @author DJDU
* @date 2018年10月8日
* @version V1.0
 */

public interface IRoomCleanService {
	public RoomClean save(RoomClean entity);//保存和更新
	public long count();//得出记录总数
	public Page<RoomClean> findAll(Specification<RoomClean> spec, Pageable pageable);//分页查找数据
	public void deleteById(Long id);//删除记录
	public RoomClean findById(Long id);
	public List<FloorVoRoomVoRoomCleanDTO> findAllFloorVoRoomVoRoomCleanDTO();//多表查询全部
	public RoomClean findByRoomId(Long roomId);
	public void set();//设置RoomClean数据
//	public boolean existsById(Long id);
//	public void deleteById(Long id);
//	public void deleteAll(Long[] ids);
}
