package com.hmm.employee.controller;



import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.IdentityService;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
import com.hmm.employee.util.ExportExcel;
import com.hmm.userRole.entity.GroupRole;
import com.hmm.userRole.service.GroupRoleService;

import jodd.io.upload.FileUpload;



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
	
	@Autowired
	private IdentityService identityService;
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
			    
			    Department department = iDeptService.findByDeptName(dto.getDeptName());//部门
			    
			    List<GroupRole> groupRoless = employ.getGroupRoles();//获取角色
			    
			    GroupRole groupRole = groupRoleService.findByGroupName(dto.getGroupName());//查询角色
			    
			    if(null != dto.getUserName()&&null ==dto.getPassword()) {//只更改用户名
			    	workflowService.deleteUser2(employ.getUserName());
			    	employ.setUserName(dto.getUserName());
			    	workflowService.addUser2( dto.getUserName(), employ.getPassword());
			    }
			    if(null != dto.getUserName()&&null !=dto.getPassword()) {//更改用户名和密码
			    	workflowService.deleteUser2(employ.getUserName());
			    	employ.setUserName(dto.getUserName());
			    	workflowService.addUser2( dto.getUserName(), dto.getPassword());
			    }
			    
			    if(null == dto.getUserName()&&null !=dto.getGroupName()) {//只更改角色
			    	if(groupRoless.size()!=0) {
			    		for(GroupRole role:groupRoless) {
				    		identityService.deleteMembership(employ.getUserName(), role.getGroupId());//解除关系
				    		identityService.createMembership(employ.getUserName(), groupRole.getGroupId());//创建关系
				    		
				    	}
			    	}else {
			    		identityService.createMembership(employ.getUserName(), groupRole.getGroupId());//创建关系
			    	}
			    	
			    }
			    
			    
			    
			    if(null != dto.getUserName()&&null !=dto.getGroupName()) {//更改角色和用户角色
			    	workflowService.deleteUser2(employ.getUserName());//删除用户
			    	employ.setUserName(dto.getUserName());
			    	workflowService.addUser2( dto.getUserName(), employ.getPassword());//创建user
			    	identityService.createMembership(dto.getUserName(), groupRole.getGroupId());//创建关系
			    }
			    
			    if(null != dto.getUserName()&&null !=dto.getGroupName()&&null !=dto.getPassword()) {//
			    	workflowService.deleteUser2(employ.getUserName());//删除用户
			    	workflowService.addUser2( dto.getUserName(), dto.getPassword());//创建user
			    	identityService.createMembership(dto.getUserName(), groupRole.getGroupId());//创建关系
			    }
			    BeanUtils.copyProperties(dto,employ);
				if(null != groupRole) {
					List<GroupRole> groupRoles = new ArrayList<>();
					groupRoles.add(groupRole);
					employ.setGroupRoles(groupRoles);
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
		return employServiceImpl.findAll(EmployeeQueryDTO.getWhereClause(employQueryDTO), 		
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
	
	
	@RequestMapping("/file")
	public ExtAjaxResponse FileUpload(@RequestParam("file") MultipartFile file,HttpServletRequest request, HttpServletResponse response) {
		if(file.isEmpty()) {
			return new ExtAjaxResponse(false,"文件为空");
		}else {
			String filename = file.getOriginalFilename();
			String suffixName = filename.substring(filename.lastIndexOf("."));
			String empNo = StringUtils.substringBefore(filename,"+");
			Employee employee = employServiceImpl.findByEmpNo(empNo);
			if(null != employee) {
				String filetype = ".jpg" + ".jpeg" +".png";
				if(filetype.indexOf(suffixName) != -1) {
					String savePath  = request.getServletContext().getRealPath("/resources/images/employee/");
					//String realPath = "/resources/images/employee/"+filename;
					//System.out.println(savePath);
					//System.out.println(realPath);
					File dest = new File(savePath + filename);
					if(!dest.getParentFile().exists()) {
						dest.getParentFile().mkdirs();
					}
					String path2 = "C:/Users/Lenovo/git/HotelManageSystem/admin-dashboard/resources/images/employee/";
					File dest2 = new File(path2 + filename);
					try {
						employee.setEmpImage(filename);
						file.transferTo(dest);
						file.transferTo(dest2);
						employServiceImpl.save(employee);
						return new ExtAjaxResponse(true,"上传成功");
					} catch (IllegalStateException | IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
						return new ExtAjaxResponse(false,"上传失败");
					}
					
				}else {
					return new ExtAjaxResponse(false,"文件格式不正确");
				}
			}else {
				return new ExtAjaxResponse(false,"文件格式不正确");
			}

		}
	}
	
	@RequestMapping(value="exportExcel/{selectIds}" ,method=RequestMethod.GET)
	public void exportExcelrows(@PathVariable("selectIds") Integer[] ids,HttpServletResponse response) throws IOException {
		List<EmployeeDTO> employeeDTOs =  employServiceImpl.findByids(ids);
		HSSFWorkbook workbook = ExportExcel.exportExcel(employeeDTOs);
        String fileName = "drn"  + ".xls";//设置要导出的文件的名字
        
        response.setContentType("application/octet-stream");
        response.setHeader("Content-disposition", "attachment;filename=" + fileName);
        response.flushBuffer();
        workbook.write(response.getOutputStream());
		
	}
	
	@RequestMapping(value = "/uploadExcel",method={RequestMethod.GET,RequestMethod.POST})
	public ExtAjaxResponse ajaxUploadExcel(HttpServletRequest request,HttpServletResponse response) {
		return employServiceImpl.ajaxUploadExcel(request, response);
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
	
	@RequestMapping("test")
	public Page<EmployeeDTO> getPage2(ExtjsPageRequest pageRequest) 
	{
		EmployeeQueryDTO employQueryDTO = new EmployeeQueryDTO();
		employQueryDTO.setDeptName("Admin管理部门");
		return employServiceImpl.findAll(EmployeeQueryDTO.getWhereClause(employQueryDTO), 		
				pageRequest.getPageable());
	}
	
	
	
	
}
