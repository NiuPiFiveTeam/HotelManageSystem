package com.hmm.logistics.stock.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.hmm.logistics.stock.entity.InDetailed;
import com.hmm.logistics.stock.repository.InDetailedRepository;
/**
 * 
* @Title: InDetailedService.java
* @Package com.hmm.logistics.stock.service
* @Description: TODO(入库详情表的业务流程)
* @author DJDU
* @date 2018年10月9日
* @version V1.0
 */
public class InDetailedService implements IInDetailedService {
	@Autowired
	private InDetailedRepository inDetailedRepository;
	
	@Override
	public InDetailed save(InDetailed entity) {
		// TODO Auto-generated method stub
		return inDetailedRepository.save(entity);
	}

	@Override
	public long count() {
		// TODO Auto-generated method stub
		return inDetailedRepository.count();
	}

	@Override
	public Page<InDetailed> findAll(Specification<InDetailed> spec, Pageable pageable) {
		// TODO Auto-generated method stub
		return inDetailedRepository.findAll(spec, pageable);
	}

	@Override
	public void deleteById(Long id) {
		// TODO Auto-generated method stub
		inDetailedRepository.deleteById(id);
	}

	@Override
	public InDetailed findById(Long id) {
		// TODO Auto-generated method stub
		return inDetailedRepository.findById(id).get();
	}

	@Override
	public boolean existsById(Long id) {
		// TODO Auto-generated method stub
		return inDetailedRepository.existsById(id);
	}

	@Override
	public void deleteAll(Long[] ids) {
		// TODO Auto-generated method stub
		List<Long> idLists=new ArrayList<Long>(Arrays.asList(ids));
		List<InDetailed>inDetailed=(List<InDetailed>)inDetailedRepository.findAllById(idLists);
		if(inDetailed!=null) {
			inDetailedRepository.deleteAll(inDetailed);
		}
	}

}
