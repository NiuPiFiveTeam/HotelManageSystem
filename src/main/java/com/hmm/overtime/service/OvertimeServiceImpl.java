package com.hmm.overtime.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.hmm.overtime.dao.OvertimeDao;
import com.hmm.overtime.entity.Overtime;


@Service
@Transactional
public class OvertimeServiceImpl implements OvertimeService {
	
	@Autowired
	private OvertimeDao overtimeDao;

	@Override
	public Overtime save(Overtime entity) {
		// TODO Auto-generated method stub
		return overtimeDao.save(entity);
	}

	@Override
	public Optional<Overtime> findById(Integer id) {
		// TODO Auto-generated method stub
		return overtimeDao.findById(id);
	}

	@Override
	public boolean existsById(Integer id) {
		// TODO Auto-generated method stub
		return overtimeDao.existsById(id);
	}

	@Override
	public void deleteById(Integer id) {
		// TODO Auto-generated method stub
		overtimeDao.deleteById(id);
		
	}

	@Override
	public Page<Overtime> findAll(Specification<Overtime> spec, Pageable pageable) {
		// TODO Auto-generated method stub
		return overtimeDao.findAll(spec, pageable);
	}

	@Override
	public long count(Specification<Overtime> spec) {
		// TODO Auto-generated method stub
		return overtimeDao.count(spec);
	}

}
