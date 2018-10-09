package com.hmm.department.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.Nullable;

import com.hmm.department.entity.Department;
import com.hmm.department.entity.DeptDTO;
import com.hmm.department.entity.DeptDTOCombox;




public interface DeptService {
	void save(DeptDTO entitydto);
	Optional<Department> findById(Integer id);
	boolean existsById(Integer id);
	void deleteById(Integer id);
	Page<DeptDTO> findAllByDTO(DeptDTO deptDTO, Pageable pageable);
	Page<DeptDTO> findAll(@Nullable Specification<Department> spec, Pageable pageable);
	long count(@Nullable Specification<Department> spec);
	public void deleteAll(Integer[] ids);
	public Department findByDeptNo(String deptNo);
	public Department findByDeptName(String deptName);
	void save(Department department);
	public List<DeptDTOCombox> findDeptCombox();
	public Department findByDeptNoAndDeptName(String deptNo,String deptName);
}
