package com.hmm.overtime.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.Nullable;

import com.hmm.overtime.entity.Overtime;




public interface OvertimeService {
	Overtime save(Overtime entity);
	Optional<Overtime> findById(Integer id);
	boolean existsById(Integer id);
	void deleteById(Integer id);
	Page<Overtime> findAll(@Nullable Specification<Overtime> spec, Pageable pageable);
	long count(@Nullable Specification<Overtime> spec);
}
