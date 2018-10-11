package com.hmm.logistics.roomClean.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hmm.logistics.roomClean.entity.RoomCleanRecord;
import com.hmm.logistics.roomClean.repository.RoomCleanRecordRepository;
/**
 * 
* @Title: RoomCleanRecordService.java
* @Package com.hmm.logistics.roomClean.service
* @Description: TODO(客房内务操作记录的业务流程)
* @author DJDU
* @date 2018年10月9日
* @version V1.0
 */

@Service
@Transactional
public class RoomCleanRecordService implements IRoomCleanRecordService{
	@Autowired
	private RoomCleanRecordRepository roomCleanRecordRepository;
	
	
	@Override
	public RoomCleanRecord save(RoomCleanRecord entity) {
		// TODO Auto-generated method stub
		return roomCleanRecordRepository.save(entity);
	}

	@Override
	public long count() {
		// TODO Auto-generated method stub
		return roomCleanRecordRepository.count();
	}

	@Override
	public Page<RoomCleanRecord> findAll(Specification<RoomCleanRecord> spec, Pageable pageable) {
		// TODO Auto-generated method stub
		return roomCleanRecordRepository.findAll(spec, pageable);
	}

	@Override
	public void deleteById(Long id) {
		// TODO Auto-generated method stub
		roomCleanRecordRepository.deleteById(id);
		
	}

	@Override
	public RoomCleanRecord findById(Long id) {
		// TODO Auto-generated method stub
		return roomCleanRecordRepository.findById(id).get();
	}

}