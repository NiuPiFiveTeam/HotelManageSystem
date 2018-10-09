package com.hmm.travel.entity;

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
@Table(name="t_travel")
public class Travel {
	private Integer travelid;
	private String travelNo;
	private Date traStartTime;
	private Date traEndTime;
	private String process;
	private Float allowance;
	private Employee employ;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Integer getTravelid() {
		return travelid;
	}
	
	@ManyToOne(cascade=CascadeType.MERGE,fetch=FetchType.LAZY)
	@JoinColumn(name="ID_")
	public Employee getEmploy() {
		return employ;
	}
	@Column(unique=true)
	public String getTravelNo() {
		return travelNo;
	}
	
	@JsonFormat(pattern="HH:mm:ss" , timezone = "GMT+8")
	@DateTimeFormat(pattern="HH:mm:ss")
	public Date getTraStartTime() {
		return traStartTime;
	}
	
	@JsonFormat(pattern="HH:mm:ss" , timezone = "GMT+8")
	@DateTimeFormat(pattern="HH:mm:ss")
	public Date getTraEndTime() {
		return traEndTime;
	}
	public String getProcess() {
		return process;
	}
	public Float getAllowance() {
		return allowance;
	}

	public void setTravelNo(String travelNo) {
		this.travelNo = travelNo;
	}
	public void setTraStartTime(Date traStartTime) {
		this.traStartTime = traStartTime;
	}
	public void setTraEndTime(Date traEndTime) {
		this.traEndTime = traEndTime;
	}
	public void setProcess(String process) {
		this.process = process;
	}
	public void setAllowance(Float allowance) {
		this.allowance = allowance;
	}
	
	public void setEmploy(Employee employ) {
		this.employ = employ;
	}

	public void setTravelid(Integer travelid) {
		this.travelid = travelid;
	}
	
}
