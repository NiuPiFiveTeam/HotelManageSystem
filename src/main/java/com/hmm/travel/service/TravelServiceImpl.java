package com.hmm.travel.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.hmm.travel.dao.TravelDao;
import com.hmm.travel.entity.Travel;



@Service
@Transactional
public class TravelServiceImpl implements TravelService {
	
	@Autowired
	private TravelDao travelDao;

	@Override
	public Travel save(Travel entity) {
		// TODO Auto-generated method stub
		return travelDao.save(entity);
	}

	@Override
	public Optional<Travel> findById(Integer id) {
		// TODO Auto-generated method stub
		return travelDao.findById(id);
	}

	@Override
	public boolean existsById(Integer id) {
		// TODO Auto-generated method stub
		return travelDao.existsById(id);
	}

	@Override
	public void deleteById(Integer id) {
		// TODO Auto-generated method stub
		travelDao.deleteById(id);
	}

	@Override
	public Page<Travel> findAll(Specification<Travel> spec, Pageable pageable) {
		// TODO Auto-generated method stub
		return travelDao.findAll(spec, pageable);
	}

	@Override
	public long count(Specification<Travel> spec) {
		// TODO Auto-generated method stub
		return travelDao.count(spec);
	}

}
