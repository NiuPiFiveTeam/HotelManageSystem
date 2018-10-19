package com.hmm.Work.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.Nullable;

import com.hmm.Work.entity.Work;
import com.hmm.Work.entity.WorkEmpDTO;
import com.hmm.employee.entity.Employee;




public interface workService {
	void save(Date dayetime,String userId);
	void save(Work entity);
	Optional<Work> findById(Long id);
	boolean existsById(Long id);
	void deleteById(Long id);
	void deleteByIds(Long[] ids);
	Page<Work> findAll(@Nullable Specification<Work> spec, Pageable pageable);
	Page<WorkEmpDTO> findAllByDTO(@Nullable Specification<Work> spec, Pageable pageable);
	Page<WorkEmpDTO> findAllBydeptName(String deptName , Pageable pageable);
	long count(@Nullable Specification<Work> spec);
	Work findByWorkDateAndEmploy(Date workDate,Employee employee);
	
	List<Work> findByDto(@Nullable Specification<Work> spec);
}
