package com.hmm.travel.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.Nullable;

import com.hmm.travel.entity.Travel;




public interface TravelService {
	Travel save(Travel entity);
	Optional<Travel> findById(Integer id);
	boolean existsById(Integer id);
	void deleteById(Integer id);
	Page<Travel> findAll(@Nullable Specification<Travel> spec, Pageable pageable);
	long count(@Nullable Specification<Travel> spec);
}
