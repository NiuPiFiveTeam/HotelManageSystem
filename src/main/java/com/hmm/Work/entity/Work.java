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
	private Integer workid;
	private String workNo;
	private Date worktime;
	private Date ontudytime;
	private Date offdutytime;
	private Employee employ;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Integer getWorkid() {
		return workid;
	}
	
	@ManyToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="ID_")
	public Employee getEmploy() {
		return employ;
	}
	
	
	@Column(nullable=false)
	public String getWorkNo() {
		return workNo;
	}
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
	@DateTimeFormat(pattern="yyyy-MM-dd")
	public Date getWorktime() {
		return worktime;
	}
	@JsonFormat(pattern = "HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern="HH:mm:ss")
	public Date getOntudytime() {
		return ontudytime;
	}
	@JsonFormat(pattern = "HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern="HH:mm:ss")
	public Date getOffdutytime() {
		return offdutytime;
	}
	public void setWorkid(Integer workid) {
		this.workid = workid==null?null:workid;
		
	}
	public void setWorkNo(String workNo) {
		this.workNo = workNo;
	}
	public void setWorktime(Date worktime) {
		this.worktime = worktime;
	}
	public void setOntudytime(Date ontudytime) {
		this.ontudytime = ontudytime;
	}
	public void setOffdutytime(Date offdutytime) {
		this.offdutytime = offdutytime;
	}
	
	public void setEmploy(Employee employ) {
		this.employ = employ;
	}
	@Override
	public String toString() {
		return "Work [workid=" + workid + ", workNo=" + workNo + ", worktime=" + worktime + ", ontudytime=" + ontudytime
				+ ", offdutytime=" + offdutytime + ", getWorkid()=" + getWorkid() + ", getWorkNo()=" + getWorkNo()
				+ ", getWorktime()=" + getWorktime() + ", getOntudytime()=" + getOntudytime() + ", getOffdutytime()="
				+ getOffdutytime() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()="
				+ super.toString() + "]";
	}

}
