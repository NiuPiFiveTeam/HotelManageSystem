package com.hmm.Work.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import org.activiti.engine.runtime.ProcessInstance;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.hmm.Work.dao.WorkDao;
import com.hmm.Work.entity.Work;
import com.hmm.Work.entity.BcardDTO;
import com.hmm.Work.entity.WorkEmpDTO;
import com.hmm.Work.entity.WorkQueryDTO;
import com.hmm.activiti.domain.ProcessStatus;
import com.hmm.activiti.domain.WorkflowDTO;
import com.hmm.activiti.service.IWorkflowService;
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
import com.hmm.leave.entity.Leave;
import com.hmm.leave.entity.LeaveDTO;



@Service
@Transactional
public class workServiceImpl implements workService {

	@Autowired
	private WorkDao workDao;
	
	@Autowired 
	private IWorkflowService workflowService;
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
						 
						 
						 
						 for (SchedulEvent schedulEvent : schedulEvents) {							 
							 Calendar calendar = schedulEvent.getCalendar();
							 WorkQueryDTO spec = new WorkQueryDTO();
							 spec.setUserName(userId);
							 spec.setWorkDate(currentDate);
							 spec.setCalendar(calendar.getTitle());
							 List<Work> works = workServiceImpl.findByDto(WorkQueryDTO.getWhereClause(spec));
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
												 String flagtime = "12:00:00";
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
	public ExtAjaxResponse UpdateWork(String Userid) {
		// TODO Auto-generated method stub
		try {
			if(null != Userid) {
				List<SchedulEvent> events = (List<SchedulEvent>) schedulEventService.findPassDay();
				if(events.size()==0) {
					return new ExtAjaxResponse(false,"无记录!");
				}else {
					for (SchedulEvent schedulEvent : events) {
						String date = schedulEvent.getEventDate();
						Employee employee = schedulEvent.getEmploy();
						Calendar calendar = schedulEvent.getCalendar();
						WorkQueryDTO spec = new WorkQueryDTO();
						spec.setEmpNo(employee.getEmpNo());
						spec.setWorkDate(date);
						spec.setCalendar(calendar.getTitle());
						List<Work> works = workServiceImpl.findByDto(WorkQueryDTO.getWhereClause(spec));
						if(works.size()!=0 ) {//修改
							Work work = works.get(0);
							
							if(calendar.getTitle().indexOf("白班")!=0) {
								if(null!=work.getOffdutytime()&&null!=work.getOntudytime()) {//未缺卡
									SimpleDateFormat dfs = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
									
									 String time_1= dfs.format(work.getOffdutytime());//下班时间
									 String time_2 = dfs.format(work.getOntudytime());//上班时间
									 String time_3 = dfs.format(schedulEvent.getStartDate());//排班
									 String time_4 = dfs.format(schedulEvent.getEndDate());//排班
									Date begin = dfs.parse(time_2);
									Date end = dfs.parse(time_1);;
									Date paibanbegin = dfs.parse(time_3);;
									Date paibanEnd = dfs.parse(time_4);
									String flagtime = "13:30:00";
									 String flagtime2 = date +" " +flagtime;
									 String flagtime5 = "12:00:00";
									 String flagtime6 = date +" "+ flagtime5;
									
									 
									String flagtime3 = "18:30:00";//加班时间标志
									 String flagtime4 = date +" " +flagtime3;
									 
									 String flagtime7 = "19:30:00";//加班时间标志
									 String flagtime8 = date +" " +flagtime7;
									 Date timenoon = dfs.parse(flagtime6);//12:00:00
									 Date timeAfternoon =  dfs.parse(flagtime2);// "13:30:00";
									 Date timeevening =  dfs.parse(flagtime4);//"18:30:00";/
									 Date timeeveningafter =  dfs.parse(flagtime8);//"19:30:00";
									float overtime = (float) ((((paibanEnd.getTime()-paibanbegin.getTime())/1000)/60)/60-2.5);//整体上班时间
									work.setLackCard(0);
									if(begin.after(paibanbegin)) {//上班异常打卡（迟到）
										work.setNormal(0);
										work.setLate(1);
										if(end.before(paibanEnd)) {//下班早退
											work.setLeaveEarly(1);
											if(overtime>8) {//加班
												if(begin.after(timenoon)) {//十二点后
													if(begin.after(timeAfternoon)) {//一点之后
														if(end.after(timeevening)) {//六点前
															float worktime = (float) ((((end.getTime()-begin.getTime())/1000)/60)/60);
															work.setWorktime(worktime);
															work.setOvertime((float) 0);
														}else {//六点后
															if(end.after(timeeveningafter)) {//七点后
																float worktime = (float) ((((timeevening.getTime()-begin.getTime())/1000)/60)/60);
																float overwork = (float) ((((end.getTime()-timeeveningafter.getTime())/1000)/60)/60);
																work.setWorktime(worktime);
																work.setOvertime(overwork);
															}else {//七点前
																float worktime = (float) ((((timeevening.getTime()-begin.getTime())/1000)/60)/60);
																work.setWorktime(worktime);
																work.setOvertime((float) 0);
															}
														}
													}else {//一点之前
														if(end.after(timeevening)) {//六点前
															float worktime = (float) ((((end.getTime()-timeAfternoon.getTime())/1000)/60)/60);
															work.setWorktime(worktime);
															work.setOvertime((float) 0);
														}else {//六点后
															if(end.after(timeeveningafter)) {//七点后
																float worktime = (float) ((((timeevening.getTime()-timeAfternoon.getTime())/1000)/60)/60);//18-13
																float overwork = (float) ((((end.getTime()-timeeveningafter.getTime())/1000)/60)/60);
																work.setWorktime(worktime);
																work.setOvertime(overwork);
															}else {//七点前
																float worktime = (float) ((((timeevening.getTime()-timeAfternoon.getTime())/1000)/60)/60);
																work.setWorktime(worktime);
																work.setOvertime((float) 0);
															}
														}
													}
												}else {//十二点前
													if(end.after(timeevening)) {//六点前
														float worktime = (float) ((((end.getTime()-begin.getTime())/1000)/60)/60-1.5);
														work.setWorktime(worktime);
														work.setOvertime((float) 0);
													}else {//六点后
														if(end.after(timeeveningafter)) {//七点后
															float worktime = (float) ((((timeevening.getTime()-begin.getTime())/1000)/60)/60-1.5);
															float overwork = (float) ((((end.getTime()-timeeveningafter.getTime())/1000)/60)/60);
															work.setWorktime(worktime);
															work.setOvertime(overwork);
														}else {//七点前
															float worktime = (float) ((((timeevening.getTime()-begin.getTime())/1000)/60)/60-1.5);
															work.setWorktime(worktime);
															work.setOvertime((float) 0);
														}
													}
													
												}
												
											}else {//不加班
												if(begin.after(timenoon)) {//十二点后
													if(begin.after(timeAfternoon)) {//一点之后
														if(end.after(timeevening)) {//六点前
															float worktime = (float) ((((end.getTime()-begin.getTime())/1000)/60)/60);
															work.setWorktime(worktime);
															work.setOvertime((float) 0);
														}else {//六点后
															
																float worktime = (float) ((((timeevening.getTime()-begin.getTime())/1000)/60)/60);
																work.setWorktime(worktime);
																work.setOvertime((float) 0);
															
														}
													}else {//一点之前
														if(end.after(timeevening)) {//六点前
															float worktime = (float) ((((end.getTime()-timeAfternoon.getTime())/1000)/60)/60);
															work.setWorktime(worktime);
															work.setOvertime((float) 0);
														}else {//六点后
															
																float worktime = (float) ((((timeevening.getTime()-timeAfternoon.getTime())/1000)/60)/60);
																work.setWorktime(worktime);
																work.setOvertime((float) 0);
															
														}
													}
												}else {//十二点前
													if(end.after(timeevening)) {//六点前
														float worktime = (float) ((((end.getTime()-begin.getTime())/1000)/60)/60-1.5);
														work.setWorktime(worktime);
														work.setOvertime((float) 0);
													}else {//六点后
														
															float worktime = (float) ((((timeevening.getTime()-begin.getTime())/1000)/60)/60-1.5);
															work.setWorktime(worktime);
															work.setOvertime((float) 0);
														
													}
													
												}
												
											}
										}else {//下班正常
											work.setLeaveEarly(0);
											if(overtime>8) {//加班
												if(begin.after(timenoon)) {//十二点后
													if(begin.after(timeAfternoon)) {//一点之后
														
																float worktime = (float) ((((timeevening.getTime()-begin.getTime())/1000)/60)/60);
																float overwork = (float) ((((paibanEnd.getTime()-timeeveningafter.getTime())/1000)/60)/60);
																work.setWorktime(worktime);
																work.setOvertime(overwork);
														
													}else {//一点之前
														
																float worktime = (float) ((((timeevening.getTime()-timeAfternoon.getTime())/1000)/60)/60);//18-13
																float overwork = (float) ((((paibanEnd.getTime()-timeeveningafter.getTime())/1000)/60)/60);
																work.setWorktime(worktime);
																work.setOvertime(overwork);
														
													}
												}else {//十二点前
													
															float worktime = (float) ((((timeevening.getTime()-begin.getTime())/1000)/60)/60-1.5);
															float overwork = (float) ((((paibanEnd.getTime()-timeeveningafter.getTime())/1000)/60)/60);
															work.setWorktime(worktime);
															work.setOvertime(overwork);
													
													
												}
												
											}else {//不加班
												if(begin.after(timenoon)) {//十二点后
													if(begin.after(timeAfternoon)) {//一点之后
														
															
																float worktime = (float) ((((paibanEnd.getTime()-begin.getTime())/1000)/60)/60);
																work.setWorktime(worktime);
																work.setOvertime((float) 0);
															
														
													}else {//一点之前
														
															
																float worktime = (float) ((((paibanEnd.getTime()-timeAfternoon.getTime())/1000)/60)/60);
																work.setWorktime(worktime);
																work.setOvertime((float) 0);
															
														
													}
												}else {//十二点前
													
														float worktime = (float) ((((paibanEnd.getTime()-begin.getTime())/1000)/60)/60-1.5);
														work.setWorktime(worktime);
														work.setOvertime((float) 0);
													
													
													
												}
												
											}
											
										}
									}else {//早上正常
										if(end.before(paibanEnd)) {//早退
											work.setLeaveEarly(1);
											if(overtime>8) {
												if(end.before(timenoon)) {//十二点前
													float worktime = (float) ((((end.getTime()-paibanbegin.getTime())/1000)/60)/60);
													work.setWorktime(worktime);
													work.setOvertime((float) 0); 
												}else {//十二点后
													if(end.after(timeAfternoon)) {//一点后
														if(end.before(timeevening)) {//六点前
															float worktime = (float) ((((end.getTime()-paibanbegin.getTime())/1000)/60)/60-1.5);
															work.setWorktime(worktime);
															work.setOvertime((float) 0);
														}else {//六点后
															if(end.after(timeeveningafter)) {//七点后
																float worktime = (float) ((((timeevening.getTime()-paibanbegin.getTime())/1000)/60)/60-1.5);
																float overwork = (float) ((((end.getTime()-timeeveningafter.getTime())/1000)/60)/60);
																work.setWorktime(worktime);
																work.setOvertime(overwork);
															}else {//七点前
																float worktime = (float) ((((timeevening.getTime()-paibanbegin.getTime())/1000)/60)/60-1.5);
																work.setWorktime(worktime);
																work.setOvertime((float) 0);
															}
														}
													}else {//一点前
														float worktime = (float) ((((timenoon.getTime()-paibanbegin.getTime())/1000)/60)/60);
														work.setWorktime(worktime);
														work.setOvertime((float) 0);
													}
												}
											}else {//不加班
												if(end.before(timenoon)) {//十二点前
													float worktime = (float) ((((end.getTime()-paibanbegin.getTime())/1000)/60)/60);
													work.setWorktime(worktime);
													work.setOvertime((float) 0); 
												}else {//十二点后
													if(end.after(timeAfternoon)) {//一点后
														if(end.before(timeevening)) {//六点前
															float worktime = (float) ((((end.getTime()-paibanbegin.getTime())/1000)/60)/60-1.5);
															work.setWorktime(worktime);
															work.setOvertime((float) 0);
														}else {//六点后
															
																float worktime = (float) ((((end.getTime()-paibanbegin.getTime())/1000)/60)/60-1.5);
																work.setWorktime(worktime);
																work.setOvertime((float) 0);
															
														}
													}else {//一点前
														float worktime = (float) ((((timenoon.getTime()-paibanbegin.getTime())/1000)/60)/60);
														work.setWorktime(worktime);
														work.setOvertime((float) 0);
													}
												}
												
											}
										}else {//下班正常
											work.setLate(0);
											//work.setLackCard(0);
											work.setNormal(1);
											if(overtime>8) {
												float worktime = (float) ((((timeevening.getTime()-paibanbegin.getTime())/1000)/60)/60-1.5);
												float overwork = (float) ((((paibanEnd.getTime()-timeeveningafter.getTime())/1000)/60)/60);
												work.setWorktime(worktime);
												work.setOvertime(overwork);
											}else {
												float worktime = (float) ((((paibanEnd.getTime()-paibanbegin.getTime())/1000)/60)/60-1.5);
												work.setWorktime(worktime);
												work.setOvertime((float) 0);
											}
											
										}
										
									}
								}else {//缺卡
									work.setLackCard(1);
									work.setNormal(0);
								}
							}else if(calendar.getTitle().indexOf("夜班")!=0) {
								
								if(work.getOntudytime()!= null&&work.getOffdutytime()!=null) {
									SimpleDateFormat dfs = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
									
									 String time_1= dfs.format(work.getOffdutytime());//下班时间
									 String time_2 = dfs.format(work.getOntudytime());//上班时间
									 String time_3 = dfs.format(schedulEvent.getStartDate());//排班
									 String time_4 = dfs.format(schedulEvent.getEndDate());//排班
									Date begin = dfs.parse(time_2);
									Date end = dfs.parse(time_1);;
									Date paibanbegin = dfs.parse(time_3);;
									Date paibanEnd = dfs.parse(time_4);
									String flagtime = "13:30:00";
									 String flagtime2 = date +" " +flagtime;
									 String flagtime5 = "12:00:00";
									 String flagtime6 = date +" "+ flagtime5;
									
									 
									String flagtime3 = "18:30:00";//加班时间标志
									 String flagtime4 = date +" " +flagtime3;
									 
									 String flagtime7 = "19:30:00";//加班时间标志
									 String flagtime8 = date +" " +flagtime7;
									 Date timenoon = dfs.parse(flagtime6);//12:00:00
									 Date timeAfternoon =  dfs.parse(flagtime2);// "13:30:00";
									 Date timeevening =  dfs.parse(flagtime4);//"18:30:00";/
									 Date timeeveningafter =  dfs.parse(flagtime8);//"19:30:00";
									float overtime = (float) ((((paibanEnd.getTime()-paibanbegin.getTime())/1000)/60)/60-2.5);//整体上班时间
									if(null!=begin&&null!=end) {
										work.setLackCard(0);
										 if(begin.before(paibanbegin)) {//正常上班
											 if(end.before(paibanEnd)) {//早退
												float hour = (float) ((((end.getTime()-paibanbegin.getTime())/1000)/60)/60-1.5);
												 
												 
												work.setWorktime(hour); 
												work.setOvertime((float) 0);
												 
												work.setLeaveEarly(1);
												work.setNormal(0);
												
												 
											 }else {
												float hour = (float) ((((paibanEnd.getTime()-paibanbegin.getTime())/1000)/60)/60-1.5); 
												work.setWorktime((float) 9); 
												work.setOvertime((float) 0);
												 
												work.setLeaveEarly(0);
												work.setNormal(1);
											}
										 }else {//迟到
											 work.setLate(1);
											 work.setNormal(0);
											 if(end.before(paibanEnd)) {
												work.setLeaveEarly(1);
												
												float hour2 = (float) ((((end.getTime()-begin.getTime())/1000)/60)/60-1.5);
												work.setWorktime(hour2); 
												work.setOvertime((float) 0);
												
												
											 }else {//
												float hour2 = (float) ((((paibanEnd.getTime()-begin.getTime())/1000)/60)/60-1.5);
												work.setWorktime(hour2); 
												work.setOvertime((float) 0);
													 
												work.setLeaveEarly(0);
												
											}
											 
										 }
									}else {
										work.setLackCard(1);
										work.setNormal(0);
										
									}
								
								}else {
									work.setLackCard(1);
									work.setNormal(0);
								}
								
								}else if(calendar.getTitle().indexOf("加班")!=0) {
								 if(work.getOffdutytime()!= null && work.getOntudytime()!=null) {
									 SimpleDateFormat dfs = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
										
									 String time_1= dfs.format(work.getOffdutytime());//下班时间
									 String time_2 = dfs.format(work.getOntudytime());//上班时间
									 String time_3 = dfs.format(schedulEvent.getStartDate());//排班
									 String time_4 = dfs.format(schedulEvent.getEndDate());//排班
									Date begin = dfs.parse(time_2);
									Date end = dfs.parse(time_1);;
									Date paibanbegin = dfs.parse(time_3);;
									Date paibanEnd = dfs.parse(time_4);
									String flagtime = "13:30:00";
									 String flagtime2 = date +" " +flagtime;
									 String flagtime5 = "12:00:00";
									 String flagtime6 = date +" "+ flagtime5;
									
									 
									String flagtime3 = "18:30:00";//加班时间标志
									 String flagtime4 = date +" " +flagtime3;
									 
									 String flagtime7 = "19:30:00";//加班时间标志
									 String flagtime8 = date +" " +flagtime7;
									 Date timenoon = dfs.parse(flagtime6);//12:00:00
									 Date timeAfternoon =  dfs.parse(flagtime2);// "13:30:00";
									 Date timeevening =  dfs.parse(flagtime4);//"18:30:00";/
									 Date timeeveningafter =  dfs.parse(flagtime8);//"19:30:00";
									float overtime = (float) ((((paibanEnd.getTime()-paibanbegin.getTime())/1000)/60)/60-2.5);//整体上班时间
									if(null!=begin&&null!=end) {

										if(begin.before(paibanbegin)) {//正常上班
											 if(end.before(paibanEnd)) {//早退
												 //
												float hour = (((end.getTime()-paibanbegin.getTime())/1000)/60)/60;
												 
												work.setNormal(0); 
												work.setWorktime((float) 0); 
												work.setOvertime(hour);
												 
												work.setLeaveEarly(1);
												
												 
											 }else {
												float hour = (((paibanEnd.getTime()-paibanbegin.getTime())/1000)/60)/60; 
												work.setWorktime((float) 0); 
												work.setOvertime(hour);
												work.setNormal(1); 
												work.setLeaveEarly(0);
												
											}
										 }else {//上班迟到
											 //float hour = (((begin.getTime()-paiban.getTime())/1000)/60)/60;
											 work.setLate(1);
											 work.setNormal(0); 
											 if(end.before(paibanEnd)) {
												float hour2 = (((end.getTime()-begin.getTime())/1000)/60)/60;
												work.setWorktime((float) 0); 
												work.setOvertime(hour2);
												work.setLeaveEarly(1);
												
											 }else {
												float hour = (((paibanEnd.getTime()-begin.getTime())/1000)/60)/60;
												work.setWorktime((float) 0); 
												work.setOvertime(hour);
													 
												work.setLeaveEarly(0);
												
											}
											 
										 }
									
									}else {
										work.setLackCard(1);
										work.setNormal(0);
									}
								 }else {
									 work.setLackCard(1);
										work.setNormal(0);
								 }
							}
							
							workServiceImpl.save(work);
							
						}else if(works.size() == 0){//新建
							Work work = new Work();
							work.setEmploy(employee);
							work.setCalendar(calendar.getTitle());
							work.setLackCard(1);
							work.setNormal(0);
							work.setLate(3);
							work.setLeaveEarly(3);
							work.setWorkDate(schedulEvent.getEventDate());
							workServiceImpl.save(work);
						}
						
						
					}
					return new ExtAjaxResponse(true,"成功");
				}
				
			}else {
				return new ExtAjaxResponse(false,"系统未登入!");
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ExtAjaxResponse(false,"系统错误!");
		}
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
		Page<Work> works = workDao.findAll(spec,pageable);
		List<WorkEmpDTO> empDTOs = null;
		if(null != works) {
			empDTOs = new ArrayList<>();
			for (Work work : works) {
				WorkEmpDTO dto = new WorkEmpDTO();
				WorkEmpDTO.entityToDto(work, dto);
				Employee employee = work.getEmploy();
				if(null != employee) {
					Department department = employee.getDepartmentes();
					dto.setDeptName(department.getDeptName());
					dto.setEmpName(employee.getEmpName());
					dto.setEmpNo(employee.getEmpNo());
					empDTOs.add(dto);
				}
				
				
			}
		}
		
		return new PageImpl<WorkEmpDTO>(empDTOs, pageable, null != works?works.getTotalElements():null);
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
		if(null != userName) {
			Integer late = workDao.findByEmployAndOntudytimelate(userName);
			if(null!=late) {
				return late;
			}else {
				return 0;
			}
		}else {
			return 0;
		}
	
	}

	@Override
	public int findByEmployAndOntudytimelackCard(String userName) {
		// TODO Auto-generated method stub
		if(null != userName) {
			Integer late = workDao.findByEmployAndOntudytimelackCard(userName);
			if(null!=late) {
				return late;
			}else {
				return 0;
			}
		}else {
			return 0;
		}
	}

	@Override
	public int findByEmployAndOntudytimeleaveEarly(String userName) {
		// TODO Auto-generated method stub
		if(null != userName) {
			Integer late =  workDao.findByEmployAndOntudytimeleaveEarly(userName);
			if(null!=late) {
				return late;
			}else {
				return 0;
			}
		}else {
			return 0;
		}
		
	}

	@Override
	public int findByEmployAndOntudytimenormal(String userName) {
		// TODO Auto-generated method stub
		if(null != userName) {
			Integer late =  workDao.findByEmployAndOntudytimenormal(userName);
			if(null!=late) {
				return late;
			}else {
				return 0;
			}
		}else {
			return 0;
		}
		
	}

	@Override
	public float findattenceTotalworktime(String userbname) {
		// TODO Auto-generated method stub
		if(null != userbname) {
			Float late =   workDao.findattenceTotalworktime(userbname);
			if(null!=late) {
				return late;
			}else {
				return 0;
			}
		}else {
			return 0;
		}
		
	}

	@Override
	public float findattenceTotalovertime(String userbname) {
		// TODO Auto-generated method stub
		if(null != userbname) {
			Float late =   workDao.findattenceTotalovertime(userbname);
			if(null!=late) {
				return late;
			}else {
				return 0;
			}
		}else {
			return 0;
		}
		
	}

	@Override
	public Integer findExactlyPerson() {
		// TODO Auto-generated method stub
		Integer late =   workDao.findExactlyPerson();
		if(null!=late) {
			return late;
		}else {
			return 0;
		}
	}

	@Override
	public Integer findTatalPersonNomal() {
		// TODO Auto-generated method stub
		Integer late =   workDao.findTatalPersonNomal();
		if(null!=late) {
			return late;
		}else {
			return 0;
		}
	}

	@Override
	public Integer findTatalPersonLate() {
		// TODO Auto-generated method stub
		Integer late =   workDao.findTatalPersonLate();
		if(null!=late) {
			return late;
		}else {
			return 0;
		}
	}

	@Override
	public Integer findTatalPersonleaveEarly() {
		// TODO Auto-generated method stub
		Integer late =   workDao.findTatalPersonleaveEarly();
		if(null!=late) {
			return late;
		}else {
			return 0;
		}
	}

	@Override
	public Integer findTatalPersonOvertime() {
		// TODO Auto-generated method stub
		Integer late =   workDao.findTatalPersonOvertime();
		if(null!=late) {
			return late;
		}else {
			return 0;
		}
	}

	@Override
	public List<Map<Object, Object>> findlate(Integer year) {
		// TODO Auto-generated method stub
		return workDao.findlate(year);
	}

	@Override
	public List<Map<Object, Object>> findleaveEarly(Integer year) {
		// TODO Auto-generated method stub
		return workDao.findleaveEarly(year);
	}

	@Override
	public List<Map<Object, Object>> findlackcard(Integer year) {
		// TODO Auto-generated method stub
		return workDao.findlackcard(year);
	}

	@Override
	public List<Map<Object, Object>> findByyearAndOntudytimelate(Integer year, String userName) {
		// TODO Auto-generated method stub
		return workDao.findByyearAndOntudytimelate(year, userName);
	}

	@Override
	public List<Map<Object, Object>> findByyearAndOntudytimeleaveEary(Integer year, String userName) {
		// TODO Auto-generated method stub
		return workDao.findByyearAndOntudytimeleaveEary(year, userName);
	}

	@Override
	public List<Map<Object, Object>> findByyearAndOntudytimelackcard(Integer year, String userName) {
		// TODO Auto-generated method stub
		return workDao.findByyearAndOntudytimelackcard(year, userName);
	}

	

	



}
