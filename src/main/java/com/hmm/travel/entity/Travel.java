package com.hmm.travel.entity;

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

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hmm.activiti.domain.ProcessStatus;
import com.hmm.employee.entity.Employee;

@Entity
@Table(name="t_travel")
public class Travel {
	private Long travelId;
	private Date traStartTime;
	private Date traEndTime;
	private String empNo;
    private Date realityStartTime;//批准开始时间
    private Date realityEndTime;//批准结束时间
    private ProcessStatus processStatus;//流程状态
    private String approval;//派发人
	private String process;//出差内容
	private Float allowance;//出差补发工资
	private Date applyTime;//发布时间
	private String processInstanceId;
	private Employee employ;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getTravelId() {
		return travelId;
	}
	
	@ManyToOne(cascade=CascadeType.MERGE,fetch=FetchType.LAZY)
	@JoinColumn(name="emp_id")
	public Employee getEmploy() {
		return employ;
	}
	
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getRealityStartTime() {
		return realityStartTime;
	}

	public void setRealityStartTime(Date realityStartTime) {
		this.realityStartTime = realityStartTime;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getRealityEndTime() {
		return realityEndTime;
	}

	public void setRealityEndTime(Date realityEndTime) {
		this.realityEndTime = realityEndTime;
	}

	public ProcessStatus getProcessStatus() {
		return processStatus;
	}

	public void setProcessStatus(ProcessStatus processStatus) {
		this.processStatus = processStatus;
	}

	public String getApproval() {
		return approval;
	}

	public void setApproval(String approval) {
		this.approval = approval;
	}

	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	@DateTimeFormat(pattern="yyyy/MM/dd HH:mm:ss")
	public Date getTraStartTime() {
		return traStartTime;
	}
	
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	@DateTimeFormat(pattern="yyyy/MM/dd HH:mm:ss")
	public Date getTraEndTime() {
		return traEndTime;
	}
	public String getProcess() {
		return process;
	}
	public Float getAllowance() {
		return allowance;
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

	

	public String getProcessInstanceId() {
		return processInstanceId;
	}

	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getApplyTime() {
		return applyTime;
	}

	public void setApplyTime(Date applyTime) {
		this.applyTime = applyTime;
	}

	

	public void setTravelId(Long travelId) {
		this.travelId = travelId;
	}

	public String getEmpNo() {
		return empNo;
	}

	public void setEmpNo(String empNo) {
		this.empNo = empNo;
	}
	
}
