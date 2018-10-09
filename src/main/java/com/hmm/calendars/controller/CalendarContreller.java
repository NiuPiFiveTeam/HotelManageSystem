package com.hmm.calendars.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import java.util.Date;
import java.util.List;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.calendars.entity.Calendar;
import com.hmm.calendars.entity.CalendarDTO;
import com.hmm.calendars.entity.ExtResultJson;
import com.hmm.calendars.service.CalendarService;
import com.hmm.common.beans.BeanUtils;
import com.hmm.common.web.ExtAjaxResponse;





@RestController
@RequestMapping("/calendar")
public class CalendarContreller 
{
	@Autowired
	private CalendarService calendarServiceImpl;
	private static final Logger logger = LoggerFactory.getLogger(CalendarContreller.class);
	
	@PostMapping 
	public ExtAjaxResponse saveCalendar(@RequestBody Calendar entity) {
		try {
			if(null != entity) {
				calendarServiceImpl.save(entity);
			}
			return new ExtAjaxResponse(true,"添加成功");
		} catch (Exception e) {
			// TODO: handle exception
			return new ExtAjaxResponse(true,"添加失败");
		}
	}
	
	@PutMapping(value="{id}")
	public ExtAjaxResponse Update(@PathVariable("id") Long id ,@RequestBody Calendar dto) {
		try {
			Calendar calendar = calendarServiceImpl.findById(id).get();
			if(null != calendar) {
				BeanUtils.copyProperties(dto, calendar);
				calendarServiceImpl.save(calendar);
				return new ExtAjaxResponse(true,"修改成功");
			}
			return new ExtAjaxResponse(true,"不存在");
			
		} catch (Exception e) {
			// TODO: handle exception
			return new ExtAjaxResponse(true,"修改失败");
		}
	}
	
	@DeleteMapping("id")
	public ExtAjaxResponse Delete(@PathVariable("id")Long id) {
		try {
			if(null != id) {
				calendarServiceImpl.deleteById(id);
				return new ExtAjaxResponse(true,"删除成功");
			}else {
				return new ExtAjaxResponse(true,"不存在");
			}
		} catch (Exception e) {
			// TODO: handle exception
			return new ExtAjaxResponse(true,"删除失败");
		}
		
	}
	
	@GetMapping(value="id")
	public Calendar findOne(@PathVariable("id") Long id) {
		return calendarServiceImpl.findById(id).get();
	}
	
	
	@GetMapping()
	@ResponseBody List<Calendar> findAll(){
		List<Calendar> calendars = calendarServiceImpl.findAll();
		for (Calendar calendar : calendars) {
			calendar.setEventStore(null);
		}
		return calendars;
	}
	
	
	@GetMapping("/findCalendars")
	@ResponseBody ExtResultJson<CalendarDTO> findCalendars(){
		List<Calendar> calendars = calendarServiceImpl.findAll();
		List<CalendarDTO> calendarDTOs = new ArrayList<>();
		for(Calendar calendar : calendars) {
			CalendarDTO calendarDTO = new CalendarDTO();
			BeanUtils.copyProperties(calendar,calendarDTO);
			//List<SchedulEvent> events = calendar.getEventStore();
			calendarDTO.setEventStore(null);
			calendarDTOs.add(calendarDTO);
		}
		
		return new ExtResultJson<CalendarDTO>(calendarDTOs);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
//	//查找日历类型
//	@RequestMapping("/findCalendars11")
//	public @ResponseBody ExtResultJson<Calendar> findCalendar()
//	{
//		List<Calendar>  clist = new ArrayList<Calendar>();
//		
//
//		Calendar c1 = new Calendar();
//		c1.setId(1L);
//		c1.setTitle("正常工作时间");
//		c1.setDescription("");
//		c1.setColor("");
//		c1.setAssignedColor("#F44336");
//		c1.setHidden(false);
//		c1.setEditable(true);
//	
//		Calendar c2 = new Calendar();
//		c2.setId(2L);
//		c2.setTitle("加班时间");
//		c2.setDescription("");
//		c2.setColor("");
//		c2.setAssignedColor("#3F51B5");
//		c2.setHidden(false);
//		c2.setEditable(true);
//		
//		
//		Calendar c3 = new Calendar();
//		c3.setId(3L);
//		c3.setTitle("休息时间");
//		c3.setDescription("");
//		c3.setColor("");
//		c3.setAssignedColor("#DEFF88");
//		c3.setHidden(false);
//		c3.setEditable(true);
//
//		clist.add(c1);
//		clist.add(c2);
//		clist.add(c3);
//		return new ExtResultJson<Calendar>(clist);
//		
//	}
//	
//	//按日历类型的id和时间区间查找对应的活动集合
//	/**
//	 *  calendar: Calendar类的Id
//		startDate:开始时间,为UTC格式:2017-11-09T00:00:00.000Z
//		endDate:结束时间:2018-03-11T00:00:00.000Z
//	 *  
//	 *  calendar:2
//		startDate:2017-11-09T00:00:00.000Z
//		endDate:2018-03-11T00:00:00.000Z
//	 * @return
//	 */
//	
//	@RequestMapping("/findEvents")
//	public @ResponseBody ExtResultJson<SchedulEventDto> findEvents(
//			Long calendar,
//			@DateTimeFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") Date startDate,
//			@DateTimeFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") Date endDate)
//	{
//		ExtResultJson<SchedulEventDto> json = new ExtResultJson<SchedulEventDto>(new ArrayList<SchedulEventDto>());
//		
//		try {
//				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//				
//				SchedulEventDto e1 = new SchedulEventDto();
//				e1.setId(101L);
//				e1.setTitle("Call Work");
//				e1.setStartDate(sdf.parse("2018-09-28 01:00:00"));
//				e1.setEndDate(sdf.parse("2018-09-28 12:30:00"));
//				e1.setCalendarId(1L);
//				e1.setDeptName("杜仁牛");
//				e1.setEmpName("durenniu");
//				e1.setDescription("Description 1!");
//				List<SchedulEventDto> eventStore1 = new ArrayList<SchedulEventDto>();
//				eventStore1.add(e1);
//				
////				Event e4 = new Event();
////				e1.setId(101L);
////				e1.setTitle("Call Work1");
////				e1.setStartDate(sdf.parse("2018-09-26 08:00:00"));
////				e1.setEndDate(sdf.parse("2018-09-26 08:30:00"));
////				e1.setCalendarId(1L);
////				e1.setDescription("Description 1!");
////				List<Event> eventStore4 = new ArrayList<Event>();
////				eventStore1.add(e4);
//				
//				SchedulEventDto e2 = new SchedulEventDto();
//				e2.setId(201L);
//				e2.setTitle("Call Personal");
//				e1.setDeptName("杜仁牛");
//				e1.setEmpName("durenniu");
//				e2.setStartDate(sdf.parse("2018-09-26 00:00:00"));
//				e2.setEndDate(sdf.parse("2018-09-26 09:30:00"));
//				//e2.setAllDay(true);
//				e2.setCalendarId(2L);
//				e2.setDescription("Description 2!");
//				List<SchedulEventDto> eventStore2 = new ArrayList<SchedulEventDto>();
//				eventStore2.add(e2);
//				
//				SchedulEventDto e3 = new SchedulEventDto();
//				e3.setId(301L);
//				e3.setTitle("Call Test");
//				e3.setStartDate(sdf.parse("2018-09-27 00:00:00"));
//				e3.setEndDate(sdf.parse("2018-09-27 15:30:00"));
//				//e2.setAllDay(true);
//				e3.setCalendarId(3L);
//				e1.setDeptName("杜仁牛");
//				e1.setEmpName("durenniu");
//				e3.setDescription("Description 2!");
//				List<SchedulEventDto> eventStore3 = new ArrayList<SchedulEventDto>();
//				eventStore3.add(e3);
//	
//				if(calendar==1L) {
//					json.setLists(eventStore1);
//				}else if(calendar==2L) {
//					json.setLists(eventStore2);
//				}else {
//					json.setLists(eventStore3);
//				}
//				
//		} catch (ParseException e) {
//			e.printStackTrace();
//		}
//		return json;
//	}
	
}
