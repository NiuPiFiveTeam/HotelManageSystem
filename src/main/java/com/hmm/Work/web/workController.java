package com.hmm.Work.web;

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

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.Work.entity.Work;

import com.hmm.Work.service.workService;
import com.hmm.calendars.entity.SchedulEvent;
import com.hmm.calendars.service.SchedulEventService;
import com.hmm.common.SessionUtil;
import com.hmm.common.web.ExtAjaxResponse;
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
	private SchedulEventService schedulEventService;
	private static final Logger logger = LoggerFactory.getLogger(workController.class);
	
	@RequestMapping("addOnduty")
	public @ResponseBody ExtAjaxResponse saveWork(@RequestParam("currentTime")String currentTime,HttpSession httpSession) {
		try {
			 String userId = SessionUtil.getUserName(httpSession);
			 Work work = null;
			 if(null != userId) {
				 Employee employee = employServiceImpl.findByUserName(userId);
				 if(null != employee) {
					 work = new Work();
					 SimpleDateFormat sDateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					 Date date=sDateFormat.parse(currentTime);
					 List<SchedulEvent> list = new ArrayList<>();
					 list = schedulEventService.findStartDate(date, userId);
					 if(null != list) {
						 work.setOntudytime(date);
						 work.setEmploy(employee);
						 workServiceImpl.save(work);
						 return new ExtAjaxResponse(false,"今天无需考勤!");
						 
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

	
	
	
	

}
