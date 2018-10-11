package com.hmm.calendars.entity;

import java.util.Date;

import org.springframework.beans.BeanUtils;

import com.fasterxml.jackson.annotation.JsonFormat;

public class EventCalendarDTO {
	private Long id;
	private String title;
	private Date startDate;
	private Date endDate; 
	private String calendar;
	private String  description;
	private String  empName;
	private String  empNo;
	private String  deptName;
	
	
	//后到前：1.针对“前端”设计的数据封装对象(查询)
		public static void entityToDto(SchedulEvent entity,EventCalendarDTO dto ) {
			BeanUtils.copyProperties(entity, dto);			
		}
		//前到后：2.维护多个对象 的数据 以及 对象之间的关联关系 (创建关联、更新关联)
		public static void dtoToEntity(EventCalendarDTO dto ,SchedulEvent entity) {
			BeanUtils.copyProperties(dto, entity);
					
		}
		
		
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public String getCalendar() {
		return calendar;
	}
	public void setCalendar(String calendar) {
		this.calendar = calendar;
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
	public String getDeptName() {
		return deptName;
	}
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	
}
