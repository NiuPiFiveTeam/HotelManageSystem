package com.hmm.logistics.roomClean.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.hmm.logistics.roomClean.entity.RoomCleanRecord;
/**
 * 
* @Title: IRoomCleanRecordService.java
* @Package com.hmm.logistics.roomClean.service
* @Description: TODO(客房内务操作记录接口业务流程)
* @author DJDU
* @date 2018年10月9日
* @version V1.0
 */
public interface IRoomCleanRecordService {
	public RoomCleanRecord save(RoomCleanRecord entity);//保存和更新
	public long count();//得出记录总数
	public Page<RoomCleanRecord> findAll(Specification<RoomCleanRecord> spec, Pageable pageable);//分页查找数据
	public void deleteById(Long id);//删除记录
	public RoomCleanRecord findById(Long id);
//	public boolean existsById(Long id);
//	public void deleteById(Long id);
//	public void deleteAll(Long[] ids);
}
