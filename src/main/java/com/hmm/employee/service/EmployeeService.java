package com.hmm.employee.service;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.Nullable;

import com.hmm.common.web.ExtAjaxResponse;
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
	Page<EmployeeDTO> findAll(@Nullable Specification<Employee> spec, Pageable pageable);
	long count(@Nullable Specification<Employee> spec);
	public void deleteAll(Integer[] ids);
	public Employee findByEmpNo(String empNo);
	public List<EmployeeDTO> findByids(Integer[] ids);
	public Employee findByEmpNameAndEmpNo(String empName , String empNo);
	public Employee findByEmpName(String empName);
	public void updatePassword(String password , String userName );
	public Employee findByUserName(String userName);
	ExtAjaxResponse ajaxUploadExcel(HttpServletRequest request,HttpServletResponse response);
}
