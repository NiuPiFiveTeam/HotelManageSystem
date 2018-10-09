package com.hmm.leave.entity;

import java.io.Serializable;
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


import com.fasterxml.jackson.annotation.JsonFormat;
import com.hmm.activiti.domain.ProcessStatus;
import com.hmm.employee.entity.Employee;

@Entity
@Table(name="OA_LEAVE")
public class Leave {

	//private static final long serialVersionUID = 1L;
	//业务数据字段
    private Long id;
    private Date startTime;//请假开始时间
    private Date endTime;//请假终止时间
    private Date realityStartTime;
    private Date realityEndTime;
    private Date applyTime;
    private String leaveType;//请假类型
    private String reason;//请假理由
    private ProcessStatus processStatus;//流程状态
    private Employee employ;
    
    @ManyToOne(cascade=CascadeType.MERGE,fetch=FetchType.LAZY)
    @JoinColumn(name="ID_")
    public Employee getEmploy() {
		return employ;
	}
    //工作流程数据字段
    //
	private String userId;//启动流程的用户ID
	//流程实例Id：用于关联流程引擎相关数据没有启动流程之前为""
	private String processInstanceId;
	//Getter & Setter
	//Date类型get上添加@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
//	public static long getSerialversionuid() {
//		return serialVersionUID;
//	}
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getStartTime() {
		return startTime;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getEndTime() {
		return endTime;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getRealityStartTime() {
		return realityStartTime;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getRealityEndTime() {
		return realityEndTime;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getApplyTime() {
		return applyTime;
	}
	public String getLeaveType() {
		return leaveType;
	}
	public String getReason() {
		return reason;
	}
	public String getUserId() {
		return userId;
	}
	public String getProcessInstanceId() {
		return processInstanceId;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public void setRealityStartTime(Date realityStartTime) {
		this.realityStartTime = realityStartTime;
	}
	public void setRealityEndTime(Date realityEndTime) {
		this.realityEndTime = realityEndTime;
	}
	public void setApplyTime(Date applyTime) {
		this.applyTime = applyTime;
	}
	public void setLeaveType(String leaveType) {
		this.leaveType = leaveType;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}

	public ProcessStatus getProcessStatus() {
		return processStatus;
	}

	public void setProcessStatus(ProcessStatus processStatus) {
		this.processStatus = processStatus;
	}

	public void setEmploy(Employee employ) {
		this.employ = employ;
	}
	

}
