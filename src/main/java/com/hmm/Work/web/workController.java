package com.hmm.Work.web;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.hibernate.engine.jdbc.spi.ResultSetReturn;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.Work.entity.ExtworkForm;
import com.hmm.Work.entity.Work;
import com.hmm.Work.entity.WorkEmpDTO;
import com.hmm.Work.entity.WorkQueryDTO;
import com.hmm.Work.entity.WorkRecord;
import com.hmm.Work.service.workService;
import com.hmm.calendars.entity.Calendar;
import com.hmm.calendars.entity.SchedulEvent;
import com.hmm.calendars.entity.SchedulQueryDTO;
import com.hmm.calendars.service.SchedulEventService;
import com.hmm.common.SessionUtil;
import com.hmm.common.beans.BeanUtils;
import com.hmm.common.web.ExtAjaxResponse;
import com.hmm.common.web.ExtjsPageRequest;
import com.hmm.department.entity.Department;
import com.hmm.department.service.IDeptService;
import com.hmm.employee.entity.Employee;
import com.hmm.employee.service.EmployeeService;
import com.hmm.employee.util.ExtForm;



@RestController
@RequestMapping("work")
public class workController {
	@Autowired
	private workService workServiceImpl;
	@Autowired
	private EmployeeService employServiceImpl;
	
	
	@Autowired
	private IDeptService iDeptService;
	
	
	@Autowired
	private SchedulEventService schedulEventService;
	private static final Logger logger = LoggerFactory.getLogger(workController.class);
	
	@RequestMapping("add")
	public @ResponseBody ExtAjaxResponse saveWork(HttpSession httpSession)throws ParseException {
		String userId = SessionUtil.getUserName(httpSession);
		return workServiceImpl.save(userId);
	}

	@PutMapping(value="{workid}")
	public ExtAjaxResponse update(@PathVariable("workid") Long workid , @RequestBody WorkEmpDTO empDTO) {
		try {
			Work work = workServiceImpl.findById(workid).get();
			BeanUtils.copyProperties(empDTO,work);
			workServiceImpl.save(work);
			return new ExtAjaxResponse(true,"修改成功");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ExtAjaxResponse(false,"修改失败");
		}
	}
	
	
	@DeleteMapping(value="{workid}")
	public ExtAjaxResponse delete(@PathVariable("workid") Long workid) {
		try {
			Work work = workServiceImpl.findById(workid).get();
			if(null != work) {
				workServiceImpl.deleteById(workid);
				return new ExtAjaxResponse(true,"删除成功");
			}else {
				return new ExtAjaxResponse(false,"数据错误");
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ExtAjaxResponse(false,"异常错误");
		}
		
	}
	
	@RequestMapping("/deletes")
	public ExtAjaxResponse deletes(@RequestParam(name="ids")Long[] ids) {
		try {
			if(null != ids) {
				workServiceImpl.deleteByIds(ids);
				return new ExtAjaxResponse(true,"删除成功");
			}else {
				return new ExtAjaxResponse(true,"删除失败");
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ExtAjaxResponse(true,"删除失败");
		}
		
	}
	
	@GetMapping
	public Page<WorkEmpDTO> getPage(WorkQueryDTO queryDTO ,ExtjsPageRequest pageRequest){
		
		return workServiceImpl.findAllByDTO(WorkQueryDTO.getWhereClause(queryDTO), pageRequest.getPageable());
	}
	
	@RequestMapping("record")
	public ExtworkForm  attenceTotalTime(HttpSession httpSession) {
		String userName = SessionUtil.getUserName(httpSession);
		if(null != userName) {
			WorkRecord record = new WorkRecord();
			Integer totalLate = workServiceImpl.findByEmployAndOntudytimelate(userName);
			Integer totalleaveEarly = workServiceImpl.findByEmployAndOntudytimeleaveEarly(userName);
			Integer totalCard = workServiceImpl.findByEmployAndOntudytimelackCard(userName);
			Integer totalnormal = workServiceImpl.findByEmployAndOntudytimenormal(userName);
			Float worktime = workServiceImpl.findattenceTotalovertime(userName);
			Float overtime = workServiceImpl.findattenceTotalworktime(userName);
			Float ExactlyTime = worktime+overtime;
			float attenceTotalTime= schedulEventService.findattenceTotalTime(userName);
			float totalday = schedulEventService.findWorkTotalDay(userName);
			//Long attenceTotalTime = map.get("attenceTotalTime");
			Float attenceTotalTime2 = ((attenceTotalTime)/60)/60 - totalday;
			record.setAttenceTotalTime(attenceTotalTime2);
			record.setExactlyTime(ExactlyTime);
			record.setOvertime(overtime);
			record.setTotalCard(totalCard);
			record.setTotalLate(totalLate);
			record.setTotalleaveEarly(totalleaveEarly);
			record.setTotalnormal(totalnormal);
			record.setWorktime(worktime);
			
			return new ExtworkForm(true,record);
		}else {
			return null;
		}
	}
	
	
	
	
	@RequestMapping("/test")
	public List<WorkEmpDTO> find(){
		Department department = iDeptService.findByDeptNo("A000");
		WorkQueryDTO dto = new WorkQueryDTO();
		dto.setDepartment(department);
		//dto.setDeptName("Admin管理部门");
		List<Work> list = workServiceImpl.findByDto(WorkQueryDTO.getWhereClause(dto));
		List<WorkEmpDTO> dtos = new ArrayList<>();
		for (Work work : list) {
			WorkEmpDTO empDTO = new WorkEmpDTO();
			WorkEmpDTO.entityToDto(work, empDTO);
			Employee employee = work.getEmploy();
			empDTO.setEmpName(employee.getEmpName());
			empDTO.setEmpNo(employee.getEmpNo());
			empDTO.setDeptName(department.getDeptName());
			dtos.add(empDTO);
		}
		return dtos;
	}

}
