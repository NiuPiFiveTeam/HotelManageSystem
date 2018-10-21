package com.hmm.Work.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import com.hmm.Work.entity.WorkQueryDTO;
import com.hmm.calendars.entity.Calendar;
import com.hmm.calendars.entity.SchedulEvent;
import com.hmm.calendars.entity.SchedulQueryDTO;
import com.hmm.calendars.service.SchedulEventService;
import com.hmm.common.SessionUtil;
import com.hmm.common.web.ExtAjaxResponse;
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
	private IDeptService iDeptService1;
	@Autowired
	private workService workServiceImpl;
	@Autowired
	private EmployeeService employServiceImpl;
	
	
	@Autowired
	private IDeptService iDeptService;
	@Autowired
	private SchedulEventService schedulEventService;
	@Override
	public ExtAjaxResponse save(String userId) {
		// TODO Auto-generated method stub
		try {
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
						 Map<String,String> map=new HashMap<String, String>();
						 WorkQueryDTO spec = new WorkQueryDTO();
						 spec.setUserName(userId);
						 spec.setWorkDate(currentDate);
						 
						 List<Work> works = workServiceImpl.findByDto(WorkQueryDTO.getWhereClause(spec));
						 for (SchedulEvent schedulEvent : schedulEvents) {							 
							 Calendar calendar = schedulEvent.getCalendar();
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
										workServiceImpl.save(work);
										break;
										//return new ExtAjaxResponse(true,map);
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
										 workServiceImpl.save(work);
										 break;
										 //return new ExtAjaxResponse(true,map);
									 }else if(calendar.getTitle().indexOf("加班") != -1&&calendar.getTitle().indexOf("夜班") == -1&&calendar.getTitle().indexOf("白班") == -1) {
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
										 workServiceImpl.save(work);
										 break;
										 //return new ExtAjaxResponse(true,map);
										 
									 }
									
								 }
							 }else {
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
														 work.setLeaveEarly(1);
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
														 work.setLeaveEarly(1);
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
											 workServiceImpl.save(work);
											 break;
											 
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
											 workServiceImpl.save(work);
											 break;
										 }else if(calendar.getTitle().indexOf("加班") != -1&&calendar.getTitle().indexOf("夜班") == -1&&calendar.getTitle().indexOf("白班") == -1) {
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
														float hour = (((end.getTime()-paiban.getTime())/1000)/60)/60;
														 
														 
														work.setWorktime((float) 0); 
														work.setOvertime(hour);
														 
														work.setLeaveEarly(1);
														map.put("leaveEarly", "提早下班，早退");
														 
													 }else {
														float hour = (((paibanend.getTime()-paiban.getTime())/1000)/60)/60; 
														work.setWorktime((float) 0); 
														work.setOvertime(hour);
														 
														work.setLeaveEarly(0);
														map.put("leaveEarly", "正常下班");
													}
												 }else {//上班迟到
													 //float hour = (((begin.getTime()-paiban.getTime())/1000)/60)/60;
													 if(end.before(paibanend)) {
														float hour2 = (((end.getTime()-begin.getTime())/1000)/60)/60;
														work.setWorktime((float) 0); 
														work.setOvertime(hour2);
														work.setLeaveEarly(1);
														map.put("leaveEarly", "提早下班，早退");
													 }else {
														float hour = (((paiban.getTime()-begin.getTime())/1000)/60)/60;
														work.setWorktime((float) 0); 
														work.setOvertime(hour);
															 
														work.setLeaveEarly(0);
														map.put("leaveEarly", "正常下班");
													}
													 
												 }
												 
											 }else {
												 work.setOntudytime(date);
											}
											 workServiceImpl.save(work);
											 break; 
										 }
										 
									 }
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
		Department department = iDeptService1.findByDeptName(deptName);
//		List<Employee> employees 
		return null;
	}

	@Override
	public int findByEmployAndOntudytimelate(String userName) {
		// TODO Auto-generated method stub
		return workDao.findByEmployAndOntudytimelate(userName);
	}

	@Override
	public int findByEmployAndOntudytimelackCard(String userName) {
		// TODO Auto-generated method stub
		return workDao.findByEmployAndOntudytimelackCard(userName);
	}

	@Override
	public int findByEmployAndOntudytimeleaveEarly(String userName) {
		// TODO Auto-generated method stub
		return workDao.findByEmployAndOntudytimeleaveEarly(userName);
	}

	@Override
	public int findByEmployAndOntudytimenormal(String userName) {
		// TODO Auto-generated method stub
		return workDao.findByEmployAndOntudytimenormal(userName);
	}

	@Override
	public float findattenceTotalworktime(String userbname) {
		// TODO Auto-generated method stub
		return workDao.findattenceTotalworktime(userbname);
	}

	@Override
	public float findattenceTotalovertime(String userbname) {
		// TODO Auto-generated method stub
		return workDao.findattenceTotalovertime(userbname);
	}

}
