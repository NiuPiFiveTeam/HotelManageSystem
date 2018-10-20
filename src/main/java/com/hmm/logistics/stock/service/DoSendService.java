package com.hmm.logistics.stock.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hmm.logistics.stock.entity.DoSend;
import com.hmm.logistics.stock.repository.DoSendRepository;

@Service
@Transactional
public class DoSendService implements IDoSendService {
	private DoSendRepository doSendRepository;
	
	
	@Override
	public DoSend save(DoSend entity) {
		// TODO Auto-generated method stub
		return doSendRepository.save(entity);
	}

	@Override
	public long count() {
		// TODO Auto-generated method stub
		return doSendRepository.count();
	}

	@Override
	public Page<DoSend> findAll(Specification<DoSend> spec, Pageable pageable) {
		// TODO Auto-generated method stub
		return doSendRepository.findAll(spec, pageable);
	}

	@Override
	public void deleteById(Long id) {
		// TODO Auto-generated method stub
		doSendRepository.deleteById(id);
	}

	@Override
	public DoSend findById(Long id) {
		// TODO Auto-generated method stub
		return doSendRepository.findById(id).get();
	}

	@Override
	public boolean existsById(Long id) {
		// TODO Auto-generated method stub
		return doSendRepository.existsById(id);
	}

	@Override
	public void deleteAll(Long[] ids) {
		// TODO Auto-generated method stub
		List<Long> idLists=new ArrayList<Long>(Arrays.asList(ids));
		List<DoSend>doSend=(List<DoSend>)doSendRepository.findAllById(idLists);
		if(doSend!=null) {
			doSendRepository.deleteAll(doSend);
		}
	}

}
