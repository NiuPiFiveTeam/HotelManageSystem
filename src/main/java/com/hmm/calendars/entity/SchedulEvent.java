package com.hmm.calendars.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.hmm.employee.entity.Employee;

@Entity
@Table(name="t_schedulEvent")
public class SchedulEvent {
	private Long id;
	private String title;
	private Boolean allDay=false;
	//@DateTimeFormat(iso=ISO.DATE_TIME)
	private Date startDate; //2018-01-05T00:00:00.000Z,//UTC
	//@DateTimeFormat(iso=ISO.DATE_TIME)
	private Date endDate;  //2018-01-06T00:00:00.000Z,
	private String  description;
	//@Temporal(TemporalType.DATE)
	private String eventDate;//日期
	private String  deptName;
	private Calendar calendar;	
	private Employee employ;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}
	
	@ManyToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="calendarId")
	public Calendar getCalendar() {
		return calendar;
	}
	
	
	@ManyToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="emp_id")
	public Employee getEmploy() {
		return employ;
	}
	
	public String getTitle() {
		return title;
	}
	//@DateTimeFormat(iso=ISO.DATE_TIME)
	
	public Boolean getAllDay() {
		return allDay;
	}
	//@DateTimeFormat(iso=ISO.DATE_TIME)
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	public Date getStartDate() {
		return startDate;
	}
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	public Date getEndDate() {
		return endDate;
	}

	public String getDescription() {
		return description;
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

	public void setDescription(String description) {
		this.description = description;
	}

	public void setCalendar(Calendar calendar) {
		this.calendar = calendar;
	}

	public void setEmploy(Employee employ) {
		this.employ = employ;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getEventDate() {
		return eventDate;
	}

	public void setEventDate(String eventDate) {
		this.eventDate = eventDate;
	}




	
	
}
