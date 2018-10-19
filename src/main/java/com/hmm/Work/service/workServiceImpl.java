package com.hmm.Work.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.hmm.Work.dao.WorkDao;
import com.hmm.Work.entity.Work;
import com.hmm.Work.entity.WorkEmpDTO;
import com.hmm.department.entity.Department;
import com.hmm.department.service.IDeptService;
import com.hmm.employee.entity.Employee;
import com.hmm.employee.service.EmployeeService;



@Service
@Transactional
public class workServiceImpl implements workService {

	@Autowired
	private WorkDao workDao;
	
	@Autowired
	private EmployeeService  employeeService;
	
	@Autowired
	private IDeptService  iDeptService;
	
	
	@Override
	public void save(Date dayetime,String userId) {
		// TODO Auto-generated method stub
		Employee employee = employeeService.findByUserName(userId);
		
//		return workDao.save(entity);
	}

	@Override
	public Optional<Work> findById(Long id) {
		// TODO Auto-generated method stub
		return workDao.findById(id);
	}

	@Override
	public boolean existsById(Long id) {
		// TODO Auto-generated method stub
		return workDao.existsById(id);
	}

	@Override
	public void deleteById(Long id) {
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

	@Override
	public void save(Work entity) {
		// TODO Auto-generated method stub
		workDao.save(entity);
	}

	@Override
	public Work findByWorkDateAndEmploy(Date workDate, Employee employee) {
		// TODO Auto-generated method stub
		return workDao.findByWorkDateAndEmploy(workDate, employee);
	}

	@Override
	public void deleteByIds(Long[] ids) {
		// TODO Auto-generated method stub
		List<Long> list = new ArrayList<>(Arrays.asList(ids));
		List<Work> list2 = (List<Work>) workDao.findAllById(list);
		workDao.deleteAll(list2);
	}

	@Override
	public Page<WorkEmpDTO> findAllByDTO(Specification<Work> spec, Pageable pageable) {
		// TODO Auto-generated method stub
		List<Work> works = workDao.findAll(spec);
		List<WorkEmpDTO> empDTOs = null;
		if(null != works) {
			empDTOs = new ArrayList<>();
			for (Work work : works) {
				WorkEmpDTO dto = new WorkEmpDTO();
				WorkEmpDTO.entityToDto(work, dto);
				Employee employee = work.getEmploy();
				Department department = employee.getDepartmentes();
				dto.setDeptName(department.getDeptName());
				dto.setEmpName(employee.getEmpName());
				dto.setEmpNo(employee.getEmpNo());
				empDTOs.add(dto);
			}
		}
		
		return new PageImpl<WorkEmpDTO>(empDTOs, pageable, null != works?works.size():null);
	}

	@Override
	public List<Work> findByDto(Specification<Work> spec) {
		// TODO Auto-generated method stub
		return workDao.findAll(spec);
	}

	@Override
	public Page<WorkEmpDTO> findAllBydeptName(String deptName ,Pageable pageable) {
		// TODO Auto-generated method stub
		Department department = iDeptService.findByDeptName(deptName);
//		List<Employee> employees 
		return null;
	}

}
