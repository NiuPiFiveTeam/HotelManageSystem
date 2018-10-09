package com.hmm.Work.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.hmm.Work.dao.WorkDao;
import com.hmm.Work.entity.Work;



@Service
@Transactional
public class workServiceImpl implements workService {

	@Autowired
	private WorkDao workDao;
	
	@Override
	public Work save(Work entity) {
		// TODO Auto-generated method stub
		return workDao.save(entity);
	}

	@Override
	public Optional<Work> findById(Integer id) {
		// TODO Auto-generated method stub
		return workDao.findById(id);
	}

	@Override
	public boolean existsById(Integer id) {
		// TODO Auto-generated method stub
		return workDao.existsById(id);
	}

	@Override
	public void deleteById(Integer id) {
		// TODO Auto-generated method stub
		workDao.deleteById(id);
	}

	@Override
	public Page<Work> findAll(Specification<Work> spec, Pageable pageable) {
		// TODO Auto-generated method stub
		return workDao.findAll(spec, pageable);
	}

	@Override
	public long count(Specification<Work> spec) {
		// TODO Auto-generated method stub
		return workDao.count(spec);
	}

}
