package com.hmm.Work.entity;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

public class workQueryDTO {
	private Integer workid;
	private Date ontudytime;
	private Date offdutytime;
	private String flag;
	private String empNo;
	private String empName;
	private String deptName;
	private String calendar;
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public String getDeptName() {
		return deptName;
	}
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	public String getCalendar() {
		return calendar;
	}
	public void setCalendar(String calendar) {
		this.calendar = calendar;
	}
	public Integer getWorkid() {
		return workid;
	}
	public void setWorkid(Integer workid) {
		this.workid = workid;
	}
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	public Date getOntudytime() {
		return ontudytime;
	}
	public void setOntudytime(Date ontudytime) {
		this.ontudytime = ontudytime;
	}
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	public Date getOffdutytime() {
		return offdutytime;
	}
	public void setOffdutytime(Date offdutytime) {
		this.offdutytime = offdutytime;
	}
	public String getEmpNo() {
		return empNo;
	}
	public void setEmpNo(String empNo) {
		this.empNo = empNo;
	}
	public String getEmpName() {
		return empName;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
	
	

}
