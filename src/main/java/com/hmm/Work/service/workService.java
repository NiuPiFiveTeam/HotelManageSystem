package com.hmm.Work.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.Nullable;

import com.hmm.Work.entity.Work;




public interface workService {
	Work save(Work entity);
	Optional<Work> findById(Integer id);
	boolean existsById(Integer id);
	void deleteById(Integer id);
	Page<Work> findAll(@Nullable Specification<Work> spec, Pageable pageable);
	long count(@Nullable Specification<Work> spec);
}
