package com.hmm.employee.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.hmm.activiti.service.IWorkflowService;
import com.hmm.department.entity.Department;
import com.hmm.department.service.DeptService;
import com.hmm.employee.dao.EmployeeDao;
import com.hmm.employee.entity.Employee;
import com.hmm.employee.entity.EmployeeDTO;
import com.hmm.employee.entity.EmployeeQueryDTO;
import com.hmm.userRole.entity.GroupRole;
import com.hmm.userRole.service.GroupRoleService;



@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private EmployeeDao employdao;
	
	@Autowired
	private DeptService iDeptService;
	
	@Autowired
	private GroupRoleService groupRoleService;
	
	@Autowired
	private IWorkflowService workflowService;

	@Override
	public void save(EmployeeDTO entity) {
		// TODO Auto-generated method stub
		Employee employ = new Employee();
		EmployeeDTO.dtoToEntity(entity, employ);
		Department department = iDeptService.findByDeptName(entity.getDeptName());
		GroupRole groupRole = groupRoleService.findByGroupName(entity.getGroupName());
		
		if(null != groupRole) {
			List<GroupRole> groupRoles = new ArrayList<>();
			groupRoles.add(groupRole);
			employ.setGroupRoles(groupRoles);
			workflowService.addUser(entity.getUserName(), entity.getPassword(), groupRole.getGroupId());
		}
		if(null != department) {
			employ.setDepartmentes(department);			
		}
		employdao.save(employ);
	}


	@Override
	public boolean existsById(Integer id) {
		// TODO Auto-generated method stub
		return employdao.existsById(id);
	}

	@Override
	public void deleteById(Integer id) {
		// TODO Auto-generated method stub
		employdao.deleteById(id);
	}

	@Override
	public Page<EmployeeDTO> findAll(EmployeeQueryDTO employQueryDTO, Pageable pageable) {
		// TODO Auto-generated method stub
		
		List<Employee> employs = employdao.findAll(employQueryDTO.getWhereClause(employQueryDTO));
		List<EmployeeDTO> dtos = null;
		if(null != employs) {
			dtos = new ArrayList<>();
			for (Employee employ : employs) {
				EmployeeDTO dto = new EmployeeDTO();
				EmployeeDTO.entityToDto(employ, dto);
				Department department = employ.getDepartmentes();
				List<GroupRole> groupRole = employ.getGroupRoles();
				String roles = "";
				if(null != groupRole) {
					for(GroupRole groupRole2 : groupRole) {
						roles = roles +" "+ groupRole2.getGroupName();
					}
				}
				dto.setGroupName(roles);
				if(null != department) {
					dto.setDeptName(department.getDeptName());
				}
				dtos.add(dto);
			}
			
		}
		return new PageImpl<EmployeeDTO>(dtos, pageable,null!=employs?employs.size():0);
	}

	@Override
	public long count(Specification<Employee> spec) {
		// TODO Auto-generated method stub
		return employdao.count(spec);
	}

	@Override
	public void deleteAll(Integer[] ids) {
		// TODO Auto-generated method stub
		List<Integer> idlists = new ArrayList<Integer>(Arrays.asList(ids));
		List<Employee> employs = (List<Employee>) employdao.findAllById(idlists);
		if(employs != null) {
			employdao.deleteAll(employs);
		}
		
	}

	@Override
	public Employee findByEmpNo(String empNo) {
		// TODO Auto-generated method stub
		return employdao.findByEmpNo(empNo);
	}

	@Override
	public Optional<Employee> findById(Integer id) {
		// TODO Auto-generated method stub
		return employdao.findById(id);
	}

	@Override
	public EmployeeDTO findDTOByID(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public void save(Employee entity) {
		// TODO Auto-generated method stub
		employdao.save(entity);
	}


	@Override
	public Employee findByEmpNameAndEmpNo(String empName, String empNo) {
		// TODO Auto-generated method stub
		return employdao.findByEmpNameAndEmpNo(empName, empNo);
	}


	@Override
	public Employee findByEmpName(String empName) {
		// TODO Auto-generated method stub
		return employdao.findByEmpName(empName);
	}


	@Override
	public void updatePassword(String password, String userName) {
		// TODO Auto-generated method stub
		
		employdao.updatePassword(password, userName);
	}


}
