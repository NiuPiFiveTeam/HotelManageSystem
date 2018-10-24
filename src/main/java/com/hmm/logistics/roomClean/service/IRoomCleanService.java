package com.hmm.logistics.roomClean.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hmm.common.web.ExtjsPageRequest;
import com.hmm.logistics.roomClean.entity.FloorVoRoomVoRoomClean;
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
	public Page<FloorVoRoomVoRoomClean> findAllFloorVoRoomVoRoomCleanDTO(Specification<FloorVoRoomVoRoomClean> spec,ExtjsPageRequest pageRequest);//多表查询全部
	public void saveAllFloorVoRoomVoRoomCleanDTO();
	public RoomClean findByRoomId(Long roomId);
	public void set();//设置RoomClean数据
//	public boolean existsById(Long id);
//	public void deleteById(Long id);
//	public void deleteAll(Long[] ids);
	public void dailyNecessary(String roomNo,String dailyTagData);
	public void changeRoomState(String roomNo,String selectValue,String remark);
	
}
