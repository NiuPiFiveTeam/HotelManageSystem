package com.hmm.logistics.roomClean.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hmm.logistics.roomClean.entity.RoomClean;
import com.hmm.logistics.roomClean.repository.RoomCleanRepository;

/**
 * 
* @Title: RoomCleanService.java
* @Package com.hmm.logistics.roomClean.service
* @Description: TODO(业务流程，调用repository进行业务)
* @author DJDU
* @date 2018年10月8日
* @version V1.0
 */



@Service
@Transactional
public class RoomCleanService implements IRoomCleanService{
	@Autowired
	private RoomCleanRepository roomCleanRepository;
	
	@Override
	public RoomClean save(RoomClean entity) {
		return roomCleanRepository.save(entity);
	}

	@Override
	@Transactional(readOnly=true)
	public long count() {
		// TODO Auto-generated method stub
		return roomCleanRepository.count();
	}

	@Override
	@Transactional(readOnly=true)
	public Page<RoomClean> findAll(Specification<RoomClean> spec, Pageable pageable) {
		// TODO Auto-generated method stub
		return roomCleanRepository.findAll(spec, pageable);
	}

	@Override
	public void deleteById(Long id) {
		// TODO Auto-generated method stub
		roomCleanRepository.deleteById(id);
		
	}
	
	

}
