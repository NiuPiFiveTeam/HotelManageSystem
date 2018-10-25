package com.hmm.overtime.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.hmm.employee.entity.Employee;

@Entity
@Table(name="t_overtime")
public class Overtime {
	private Integer overtimeid;
	private String overtimeNo;
	private String overtimelength;
	private Date Ostartime;
	private Date Oendtime;
	private Date time;
	private Float overtimefee;
	
	private Employee employ;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Integer getOvertimeid() {
		return overtimeid;
	}
	
	@ManyToOne(cascade=CascadeType.MERGE , fetch=FetchType.LAZY)
	@JoinColumn(name="emp_id")
	public Employee getEmploy() {
		return employ;
	}
	public void setEmploy(Employee employ) {
		this.employ = employ;
	}
	
	@Column(unique=true)
	public String getOvertimeNo() {
		return overtimeNo;
	}
	public String getOvertimelength() {
		return overtimelength;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
	@DateTimeFormat(pattern="yyyy-MM-dd")
	public Date getTime() {
		return time;
	}
	@JsonFormat(pattern = "HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern="HH:mm:ss")
	public Date getOstartime() {
		return Ostartime;
	}
	@JsonFormat(pattern = "HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern="HH:mm:ss")
	public Date getOendtime() {
		return Oendtime;
	}
	public Float getOvertimefee() {
		return overtimefee;
	}

	public void setOvertimeNo(String overtimeNo) {
		this.overtimeNo = overtimeNo;
	}
	public void setOvertimelength(String overtimelength) {
		this.overtimelength = overtimelength;
	}
	public void setTime(Date time) {
		this.time = time;
	}
	public void setOvertimefee(Float overtimefee) {
		this.overtimefee = overtimefee;
	}
	
	public void setOendtime(Date oendtime) {
		Oendtime = oendtime;
	}
	
	public void setOstartime(Date ostartime) {
		Ostartime = ostartime;
	}
	
	public void setOvertimeid(Integer overtimeid) {
		this.overtimeid = overtimeid;
	}
	
	
	
	
}
