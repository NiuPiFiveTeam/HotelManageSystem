package com.hmm.employee.controller;



import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.activiti.service.IWorkflowService;
import com.hmm.common.beans.BeanUtils;
import com.hmm.common.web.ExtAjaxResponse;
import com.hmm.common.web.ExtjsPageRequest;
import com.hmm.department.entity.Department;
import com.hmm.department.service.DeptService;
import com.hmm.employee.entity.Employee;
import com.hmm.employee.entity.EmployeeDTO;
import com.hmm.employee.entity.EmployeeQueryDTO;
import com.hmm.employee.service.EmployeeService;
import com.hmm.userRole.entity.GroupRole;
import com.hmm.userRole.service.GroupRoleService;



@Controller
@RestController
@RequestMapping("employ")
public class EmployeeController {
	@Autowired
	private EmployeeService employServiceImpl;
	@Autowired
	private DeptService iDeptService;
	
	@Autowired
	private GroupRoleService  groupRoleService;
	
	@Autowired
	private IWorkflowService workflowService;
	private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);
	
	
	@PostMapping
	public ExtAjaxResponse saveEmploy(@RequestBody EmployeeDTO employ) {
		try {
			employServiceImpl.save(employ);
			logger.info("add empoly success");
			return new ExtAjaxResponse(true,"添加成功");
		} catch (Exception e) {
			// TODO: handle exception
			logger.info("add empoly false");
			return new ExtAjaxResponse(true,"添加失败");
		}
	}
	
	@PutMapping(value="{emp_id}")
	public ExtAjaxResponse updateEmploy(@PathVariable("emp_id") Integer emp_id , @RequestBody EmployeeDTO dto) {
		try {
			    Employee employ = employServiceImpl.findById(emp_id).get();
			    Department department = iDeptService.findByDeptName(dto.getDeptName());
			    List<GroupRole> groupRoless = employ.getGroupRoles();
			    GroupRole groupRole = groupRoleService.findByGroupName(dto.getGroupName());
			    if(null != dto.getUserName() || null != dto.getGroupName()) {
			    	for(GroupRole role:groupRoless) {
			    		workflowService.deleteUser(employ.getUserName(), role.getGroupId());
			    	}
			    	
			    }
			    BeanUtils.copyProperties(dto,employ);
				if(null != groupRole) {
					List<GroupRole> groupRoles = new ArrayList<>();
					groupRoles.add(groupRole);
					employ.setGroupRoles(groupRoles);
					workflowService.addUser(employ.getUserName(), employ.getPassword(), groupRole.getGroupId());
				}
			    if(null != department) {
			    	employ.setDepartmentes(department);
			    }
				employServiceImpl.save(employ);			
			return new ExtAjaxResponse(true,"修改成功");		
		} catch (Exception e) {

			return new ExtAjaxResponse(true,"修改失败");	
		}
	}
	
	@DeleteMapping(value="{emp_id}")
	public ExtAjaxResponse deleteEmploy(@PathVariable("emp_id") Integer emp_id ) {
		try {
			if(emp_id != null) {
				Employee employ = employServiceImpl.findById(emp_id).get();
				List<GroupRole> groupRole = employ.getGroupRoles();
				for (GroupRole groupRole2 : groupRole) {
					workflowService.deleteUser(employ.getUserName(), groupRole2.getGroupId());
				}
				employServiceImpl.deleteById(emp_id);
			}
			return new ExtAjaxResponse(true,"删除成功");	
			
		} catch (Exception e) {
			// TODO: handle exception
			return new ExtAjaxResponse(true,"删除失败");	
		}
	}
	
	@GetMapping(value="{emp_id}")
	
	public Employee findone(@PathVariable("emp_id") Integer emp_id) {

		return  employServiceImpl.findById(emp_id).get();
				
	}
	

	
	@GetMapping
	public Page<EmployeeDTO> getPage(EmployeeQueryDTO employQueryDTO , ExtjsPageRequest pageRequest) 
	{
		return employServiceImpl.findAll(employQueryDTO, 		
				pageRequest.getPageable());
	}
	
	@PostMapping("/deletes")
	public ExtAjaxResponse deleterows(@RequestParam(name="ids") Integer[] ids) {
		try {
			if(ids != null) {
				employServiceImpl.deleteAll(ids);
			}
			return new ExtAjaxResponse(true,"批量删除成功！");
		} catch (Exception e) {
			// TODO: handle exception
			return new ExtAjaxResponse(true,"批量删除失败！");
		}
	}
		
//	@RequestMapping("save")
//	public String  saveEmployTest() {
//		for (int i = 0; i < 50; i++) {
//			employ employ = new employ();
//			employ.setAddress("广东东莞");
//			employ.setDepartment("运营");
//			employ.setEmpName("cowboy"+i);
//			employ.setEmpSex("男");
//			employ.setEmptype("运营部普工");
//			employ.setIdcard("44208119940307"+i);
//			employ.setIntroduce("我很好啊,哈哈哈"+i);
//			employ.setJobtype("试用员工");
//			employ.setTel("18719335358"+i);
//			employ.setEmpNo(CommonUtils.UUID());
//			employ.setEntryDate(new Date());
//			employServiceImpl.save(employ);
//			
//		}
//		return "success:true";
//	}
	
//	@RequestMapping("/demo")
//	public String demo() {
//		return "redirect:../../index.jsp";
//	}
	
	
	
	
	
}
