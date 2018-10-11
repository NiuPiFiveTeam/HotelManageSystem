package com.hmm.Work.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name="t_work")
public class Work {
	private Long workid;
	//private String workNo;
	private Integer worktime;
	private Date ontudytime;//上班打卡时间
	private Date offdutytime;//下班打卡时间
	private String flag;//打卡状态
	private Employee employ;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getWorkid() {
		return workid;
	}
	
	@ManyToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="emp_id")
	public Employee getEmploy() {
		return employ;
	}
	
	
//	@Column(nullable=false)
//	public String getWorkNo() {
//		return workNo;
//	}
//	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
//	@DateTimeFormat(pattern="yyyy-MM-dd")
//	public Date getWorktime() {
//		return worktime;
//	}
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	public Date getOntudytime() {
		return ontudytime;
	}
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	public Date getOffdutytime() {
		return offdutytime;
	}
	public void setWorkid(Long workid) {
		this.workid = workid==null?null:workid;
		
	}
//	public void setWorkNo(String workNo) {
//		this.workNo = workNo;
//	}
//	public void setWorktime(Date worktime) {
//		this.worktime = worktime;
//	}
	public void setOntudytime(Date ontudytime) {
		this.ontudytime = ontudytime;
	}
	public void setOffdutytime(Date offdutytime) {
		this.offdutytime = offdutytime;
	}
	
	public void setEmploy(Employee employ) {
		this.employ = employ;
	}

	public Integer getWorktime() {
		return worktime;
	}

	public void setWorktime(Integer worktime) {
		this.worktime = worktime;
	}
	

}
