package com.hmm.calendars.entity;

import java.util.Date;

import org.springframework.beans.BeanUtils;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;


import com.fasterxml.jackson.annotation.JsonFormat;

public class SchedulEventDto {
	private Long id;
	private String title;
	private Boolean allDay=false;
	//@DateTimeFormat(iso=ISO.DATE_TIME)
	private Date startDate; //2018-01-05T00:00:00.000Z,//UTC
	//@DateTimeFormat(iso=ISO.DATE_TIME)
	private Date endDate;  //2018-01-06T00:00:00.000Z,
	private Long calendarId=1L;
	private String  description;
	private String  empName;
	private String  empNo;
	
	
	//后到前：1.针对“前端”设计的数据封装对象(查询)
	public static void entityToDto(SchedulEvent entity,SchedulEventDto dto ) {
		BeanUtils.copyProperties(entity, dto);			
	}
	//前到后：2.维护多个对象 的数据 以及 对象之间的关联关系 (创建关联、更新关联)
	public static void dtoToEntity(SchedulEventDto dto ,SchedulEvent entity) {
		BeanUtils.copyProperties(dto, entity);
				
	}
	public Long getId() {
		return id;
	}
	public String getTitle() {
		return title;
	}
	
	public Boolean getAllDay() {
		return allDay;
	}
	//@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", locale = "zh", timezone = "GMT+8")
	//@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	public Date getStartDate() {
		return startDate;
	}
	//@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", locale = "zh", timezone = "GMT+8")
	//@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	public Date getEndDate() {
		return endDate;
	}
	public Long getCalendarId() {
		return calendarId;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public void setAllDay(Boolean allDay) {
		this.allDay = allDay;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public void setCalendarId(Long calendarId) {
		this.calendarId = calendarId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getEmpName() {
		return empName;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
	public String getEmpNo() {
		return empNo;
	}
	public void setEmpNo(String empNo) {
		this.empNo = empNo;
	}

     
     
     
}
