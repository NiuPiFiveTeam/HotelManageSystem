package com.hmm.calendars.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import com.hmm.calendars.entity.Calendar;
import com.hmm.calendars.entity.ExtResultJson;
import com.hmm.calendars.entity.SchedulEvent;
import com.hmm.calendars.entity.SchedulEventDto;
import com.hmm.calendars.entity.SchedulQueryDTO;
import com.hmm.calendars.service.CalendarService;
import com.hmm.calendars.service.SchedulEventService;
import com.hmm.common.beans.BeanUtils;
import com.hmm.common.web.ExtAjaxResponse;
import com.hmm.employee.entity.Employee;
import com.hmm.employee.service.EmployeeService;


@RestController
@RequestMapping("/CalendarEvent")
public class CalendarEventController {
	@Autowired
	private CalendarService calendarServiceImpl;
	@Autowired
	private SchedulEventService schedulEventServiceImpl;
	
	@Autowired
	private EmployeeService employService;
	private static final Logger logger = LoggerFactory.getLogger(CalendarEventController.class);
	
	@PostMapping(value="/add")
	public ExtAjaxResponse Save(SchedulEventDto eventDto) {
		try {
			
			Calendar calendar =  calendarServiceImpl.findById(eventDto.getCalendarId()).get();
			logger.info(eventDto.getStartDate().toString());
			Employee employ = employService.findByEmpName(eventDto.getEmpName());
			if(null != eventDto) {
				SchedulEvent event = new SchedulEvent();
				SchedulEventDto.dtoToEntity(eventDto, event);
				if(null != calendar && null != employ) {
					event.setCalendar(calendar);
					event.setEmploy(employ);
					schedulEventServiceImpl.save(event);
				}
			}
			return new ExtAjaxResponse(true,"添加成功");
		} catch (Exception e) {
			// TODO: handle exception
			return new ExtAjaxResponse(true,"添加失败");
		}
		
	}
	
	@PostMapping(value="/edit")
	public ExtAjaxResponse edit(SchedulEventDto eventDto) {
		try {
			SchedulEvent event = schedulEventServiceImpl.findById(eventDto.getId()).get();
			Calendar calendar =  calendarServiceImpl.findById(eventDto.getCalendarId()).get();
			Employee employ = employService.findByEmpName(eventDto.getEmpName());
			if(null != calendar && null != employ) {
				BeanUtils.copyProperties(eventDto, event);
				event.setCalendar(calendar);
				event.setEmploy(employ);
				schedulEventServiceImpl.save(event);
				return new ExtAjaxResponse(true,"成功");
			}
			return new ExtAjaxResponse(true,"失败");
		} catch (Exception e) {
			// TODO: handle exception
			return new ExtAjaxResponse(true,"失败");
		}
	}
	
	@PostMapping("/delete")
	public ExtAjaxResponse delete(@RequestParam("id") Long id) {
		try {
			if(null != id) {
				schedulEventServiceImpl.deleteById(id);
				return new ExtAjaxResponse(true,"成功");
				
			}
			return new ExtAjaxResponse(true,"失败");
		} catch (Exception e) {
			// TODO: handle exception
			return new ExtAjaxResponse(true,"失败");
		}
	}
	
	@GetMapping("/Events")
	Page<SchedulEventDto> findAll(SchedulQueryDTO employQueryDTO, Pageable pageable){
		return schedulEventServiceImpl.findAll(employQueryDTO, pageable);
	}
	
	@RequestMapping("/findEvents")
	public @ResponseBody ExtResultJson<SchedulEventDto> findEvents(Long calendar, 
			@DateTimeFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")Date startDate, 
			@DateTimeFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")Date endDate){
		
		return schedulEventServiceImpl.findEvents(calendar, startDate, endDate);
	}
	
	
	@InitBinder	
	public void initBinder(WebDataBinder binder, WebRequest request) {					
		DateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");		
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}
	

	
}
