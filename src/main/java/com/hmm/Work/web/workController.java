package com.hmm.Work.web;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

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

import com.hmm.Work.entity.Work;
import com.hmm.Work.entity.WorkEmpDTO;
import com.hmm.Work.entity.WorkQueryDTO;
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
		try {
			 String userId = SessionUtil.getUserName(httpSession);
			  
			 if(null != userId) {
				 Employee employee = employServiceImpl.findByUserName(userId);
				 if(null != employee) {
					
					 //SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					 SimpleDateFormat formatter2 = new SimpleDateFormat("yyyy-MM-dd");
					 Date date = new Date();
					 String currentDate = formatter2.format(date);
					 SchedulQueryDTO scheduldto = new SchedulQueryDTO();
					 scheduldto.setUserName(userId);
					 scheduldto.setEventDate(currentDate);
					 List<SchedulEvent> schedulEvents = schedulEventService.findByDTO(SchedulQueryDTO.getWhereClause(scheduldto));

					 if(schedulEvents.size() != 0) {
						 SchedulEvent schedulEvent = schedulEvents.get(0);
						 //schedulEvent.setEmploy(null);
						 Map<String,String> map=new HashMap<String, String>();
						 WorkQueryDTO spec = new WorkQueryDTO();
						 spec.setUserName(userId);
						 spec.setWorkDate(currentDate);
						 List<Work> works = workServiceImpl.findByDto(WorkQueryDTO.getWhereClause(spec));
						 
						 Calendar calendar = schedulEvent.getCalendar();
						 //work.setEmploy(null);
						 if(works.size() == 0) {
							 //work.setEmploy(null);
							 Work work = new Work();
							 
							 if(null != calendar) {
								 if(calendar.getTitle().indexOf("白班") != -1) {
									 work.setEmploy(employee);
									 work.setOntudytime(date);
									 work.setCalendar(calendar.getTitle());
									 //String da = schedulEvent.getStartDate().toString();
									 
									 //Date currentDate3=formatter2.parse(da);
									 work.setWorkDate(currentDate);
									 if(date.after(schedulEvent.getStartDate())) {
										 work.setLate(1);
										 
										 map.put("Late", "你已经迟到了");
									 }else {
										 work.setLate(0);
										 map.put("Late", "你已经正常打卡");
									}
								 }else if (calendar.getTitle().indexOf("夜班") != -1) {
									 work.setEmploy(employee);
									 work.setOntudytime(date);
									 work.setCalendar(calendar.getTitle());
									 //String da = schedulEvent.getStartDate().toString();
									 //Date currentDate3=formatter2.parse(da);
									 work.setWorkDate(currentDate);
									 if(date.after(schedulEvent.getStartDate())) {
										 work.setLate(1);
										 map.put("Late", "你已经迟到了");
									 }else {
										 work.setLate(0);
										 map.put("Late", "你已经正常打卡");
									}
								}
								 workServiceImpl.save(work);
							 }else {
								 return new ExtAjaxResponse(false,"考勤异常!");
							}
						 }else {
							 //有记录
							//work.setEmploy(null);
							 Work work = works.get(0);
							 if(calendar != null) {
								 if(calendar.getTitle().indexOf("白班") != -1) {
									 SimpleDateFormat dfs = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");									 
									 String time_1= dfs.format(date);//下班时间
									 String time_2 = dfs.format(work.getOntudytime());//上班时间
									 String time_3 = dfs.format(schedulEvent.getStartDate());//排班
									 String time_4 = dfs.format(schedulEvent.getEndDate());//排班
 									 Date end = dfs.parse(time_1);//下班时间
									 Date begin = dfs.parse(time_2);//上班时间
									 Date paiban = dfs.parse(time_3);//排班上班时间
									 Date paibanend = dfs.parse(time_4);//排班下班时间
									 float overtime = (float) ((((paibanend.getTime()-paiban.getTime())/1000)/60)/60-1.5);//整体上班时间
									 long fen = ((end.getTime()-begin.getTime())/1000)/60;//两次打卡时间间隔分钟
									 if(fen>120) {//大于2小时下班卡
										 work.setOffdutytime(date);
										 String flagtime = "13:30:00";
										 String flagtime2 = currentDate +" " +flagtime;
										 
 										 Date overDate =  dfs.parse(flagtime2);//
 										 
 										String flagtime3 = "18:30:00";
										 String flagtime4 = currentDate +" " +flagtime3;
										 
										 Date overDate2 =  dfs.parse(flagtime4);//
										 
										 if(begin.before(paiban)) {//早上正常打卡
											 if(date.before(schedulEvent.getEndDate())) {//提前下班
												 if(end.before(overDate2)) {
													 float hourdate = (float) ((((end.getTime()-paiban.getTime())/1000)/60)/60-1.5);//基本工作时长
													 work.setWorktime(hourdate);
													 work.setOvertime((float) 0);
												 }else {
													 float hourdate = (float) ((((overDate2.getTime()-paiban.getTime())/1000)/60)/60-1.5);//基本工作时长
													 work.setWorktime(hourdate);
													 float hourdate2 = (float) (((end.getTime()-overDate2.getTime())/1000)/60)/60;//基本工作时长
													 work.setOvertime(hourdate2);
												 }												 
												
												 map.put("leaveEarly", "提早下班，早退");
											 }else {//正常下班
												if(overtime>8) {//加班
													work.setWorktime((float) 8);
													work.setOvertime(overtime-8);
												}else {//不加班
													work.setWorktime((float) 8);
													work.setOvertime((float) 0);
												}
												map.put("leaveEarly", "正常下班，加油");
											}
										 }else {//早上不正常打卡
											 if(date.before(schedulEvent.getEndDate())) {//提前下班
												 if(end.before(overDate2)) {
													 if(begin.before(overDate)) {//早上打卡13：30：00之前
														 float hourdate = (float) ((((end.getTime()-begin.getTime())/1000)/60)/60-1.5);//基本工作时长
														 work.setWorktime(hourdate);
														 work.setOvertime((float) 0);
													 }else {//早上打卡13：30：00之后
														 float hourdate = (float) (((end.getTime()-begin.getTime())/1000)/60)/60;//基本工作时长
														 work.setWorktime(hourdate);
														 work.setOvertime((float) 0);
													 } 
												 }else {
													 if(begin.before(overDate)) {//早上打卡13：30：00之前
														 float hourdate = (float) ((((overDate2.getTime()-begin.getTime())/1000)/60)/60-1.5);//基本工作时长
														 work.setWorktime(hourdate);
														 float hourdate2 =  (((end.getTime()-overDate2.getTime())/1000)/60)/60;//基本工作时长
														 work.setOvertime(hourdate2);
													 }else {//早上打卡13：30：00之后
														 float hourdate = (float) (((end.getTime()-begin.getTime())/1000)/60)/60;//基本工作时长
														 work.setWorktime(hourdate);
														 float hourdate2 =  (((end.getTime()-overDate2.getTime())/1000)/60)/60;//基本工作时长
														 work.setOvertime(hourdate2);
													 }
												}
												 
												 map.put("leaveEarly", "提早下班，早退");
												 
											 }else {//正常下班
												 if(overtime>8) {//加班
													 if(begin.before(overDate)) {//早上打卡13：30：00之前
														 float hourdate = (float) ((((overDate2.getTime()-begin.getTime())/1000)/60)/60-1.5);//基本工作时长
														 work.setWorktime(hourdate);
														 float hourdate2 = (float) (((end.getTime()-overDate2.getTime())/1000)/60)/60;
														 work.setOvertime(hourdate2);
													 }else {//早上打卡13：30：00之后
														 float hourdate = (float) (((overDate2.getTime()-begin.getTime())/1000)/60)/60;//基本工作时长
														 work.setWorktime(hourdate);
														 float hourdate2 = (float) (((end.getTime()-overDate2.getTime())/1000)/60)/60;
														 work.setOvertime(hourdate2);
													 }
													 map.put("leaveEarly", "正常下班，加油");
												 }else {//不加班
													 if(begin.before(overDate)) {//早上打卡13：30：00之前
														 float hourdate = (float) ((((paibanend.getTime()-begin.getTime())/1000)/60)/60-1.5);//基本工作时长
														 work.setWorktime(hourdate);
														 work.setOvertime((float) 0);
													 }else {//早上打卡13：30：00之后
														 float hourdate = (float) (((paibanend.getTime()-begin.getTime())/1000)/60)/60;//基本工作时长
														 work.setWorktime(hourdate);
														
														 work.setOvertime((float) 0);
													 }
													 map.put("leaveEarly", "正常下班，加油");
												 }
											 }
										 }
									 }else {
										 //上班卡
										 work.setOntudytime(date);
									} 
									 
								 }else if(calendar.getTitle().indexOf("夜班") != -1) {
									 SimpleDateFormat dfs = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");									 
									 String time_1= dfs.format(date);//下班时间
									 String time_2 = dfs.format(work.getOntudytime());//上班时间
									 String time_3 = dfs.format(schedulEvent.getStartDate());//排班
									 String time_4 = dfs.format(schedulEvent.getEndDate());//排班
 									 Date end = dfs.parse(time_1);//下班时间
									 Date begin = dfs.parse(time_2);//上班时间
									 Date paiban = dfs.parse(time_3);//排班上班时间
									 Date paibanend = dfs.parse(time_4);//排班下班时间
									 float overtime = (float) ((((paibanend.getTime()-paiban.getTime())/1000)/60)/60-1);//整体上班时间
									 long fen = ((end.getTime()-begin.getTime())/1000)/60;//两次打卡时间间隔分钟
									 if(fen>120) {
										 work.setOffdutytime(date);
										 float fenfen = (float) (fen/60-1);// 
										 if(begin.before(paiban)) {//正常上班
											 if(date.before(schedulEvent.getEndDate())) {
												float hour = (((paibanend.getTime()-end.getTime())/1000)/60)/60;
												 
												 
												work.setWorktime((float) 9-hour); 
												work.setOvertime((float) 0);
												 
												work.setLeaveEarly(1);
												map.put("leaveEarly", "提早下班，早退");
												 
											 }else {
												 
												work.setWorktime((float) 9); 
												work.setOvertime((float) 0);
												 
												work.setLeaveEarly(0);
												map.put("leaveEarly", "正常下班");
											}
										 }else {
											 float hour = (((begin.getTime()-paiban.getTime())/1000)/60)/60;
											 if(end.before(paibanend)) {
												float hour2 = (((paibanend.getTime()-end.getTime())/1000)/60)/60;
												work.setWorktime((float) 9-hour-hour2); 
												work.setOvertime((float) 0);
												work.setLeaveEarly(1);
												map.put("leaveEarly", "提早下班，早退");
											 }else {
												work.setWorktime((float) 9); 
												work.setOvertime((float) 0);
													 
												work.setLeaveEarly(0);
												map.put("leaveEarly", "正常下班");
											}
											 
										 }
										 
									 }else {
										 work.setOntudytime(date);
									}
								 }
								 workServiceImpl.save(work);
								 
							 }
							 
						 }
						 
						 return new ExtAjaxResponse(true,map);
						 
					 }else {
						 return new ExtAjaxResponse(false,"今天无需考勤!");
					 }
				 }else {
					 return new ExtAjaxResponse(false,"用户不存在，重新登入!");
				 }
				 
			 }else {
				  return new ExtAjaxResponse(false,"系统未登入!");
			 }
		} catch (Exception e) {
			// TODO: handle exception
			return new ExtAjaxResponse(false,"系统错误!");
		}
		
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
