package com.hmm.employee.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.Nullable;

import com.hmm.employee.entity.Employee;
import com.hmm.employee.entity.EmployeeDTO;
import com.hmm.employee.entity.EmployeeQueryDTO;


public interface EmployeeService {
	void save(EmployeeDTO entity);
	void save(Employee entity);
	Optional<Employee> findById(Integer id);
	EmployeeDTO findDTOByID(Integer id);
	boolean existsById(Integer id);
	void deleteById(Integer id);
	Page<EmployeeDTO> findAll(EmployeeQueryDTO employQueryDTO, Pageable pageable);
	long count(@Nullable Specification<Employee> spec);
	public void deleteAll(Integer[] ids);
	public Employee findByEmpNo(String empNo);
	public Employee findByEmpNameAndEmpNo(String empName , String empNo);
	public Employee findByEmpName(String empName);
	public void updatePassword(String password , String userName );
}
