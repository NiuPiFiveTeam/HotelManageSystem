package com.hmm.logistics.stock.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hmm.logistics.stock.entity.OutStorage;
import com.hmm.logistics.stock.repository.OutStorageRepository;

/**
 * 
* @Title: OutStorageService.java
* @Package com.hmm.logistics.stock.service
* @Description: TODO(出库总表的业务流程)
* @author DJDU
* @date 2018年10月9日
* @version V1.0
 */
@Service
@Transactional
public class OutStorageService implements IOutStorageService {
	@Autowired
	private OutStorageRepository outStorageRepository;
	
	@Override
	public OutStorage save(OutStorage entity) {
		// TODO Auto-generated method stub
		return outStorageRepository.save(entity);
	}

	@Override
	public long count() {
		// TODO Auto-generated method stub
		return outStorageRepository.count();
	}

	@Override
	public Page<OutStorage> findAll(Specification<OutStorage> spec, Pageable pageable) {
		// TODO Auto-generated method stub
		return outStorageRepository.findAll(spec, pageable);
	}

	@Override
	public void deleteById(Long id) {
		// TODO Auto-generated method stub
		outStorageRepository.deleteById(id);
	}

	@Override
	public OutStorage findById(Long id) {
		// TODO Auto-generated method stub
		return outStorageRepository.findById(id).get();
	}

	@Override
	public boolean existsById(Long id) {
		// TODO Auto-generated method stub
		return outStorageRepository.existsById(id);
	}

	@Override
	public void deleteAll(Long[] ids) {
		// TODO Auto-generated method stub
		List<Long> idLists=new ArrayList<Long>(Arrays.asList(ids));
		List<OutStorage>outStorage=(List<OutStorage>)outStorageRepository.findAllById(idLists);
		if(outStorage!=null) {
			outStorageRepository.deleteAll(outStorage);
		}
	}

}
