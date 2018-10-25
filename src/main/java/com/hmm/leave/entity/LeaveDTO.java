package com.hmm.leave.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hmm.activiti.domain.ProcessStatus;

public class LeaveDTO {
	/**------------业务数据--------------**/
	/*请假*/
    private Long id;
    private String userId;
    private Date applyTime;
    private Date startTime;
    private Date endTime;
    private String leaveType;
    private String reason;
    
    private String empName;
    private String empNo;
    private String deptName;
    /*销假*/
    private Date realityStartTime;
    private Date realityEndTime;
    /**------------流程数据--------------**/
    /*任务*/
    private String taskId;
    private String taskName;
    private Date   taskCreateTime;
    private String assignee;//受理人
    private ProcessStatus processStatus;//流程状态
    private String taskDefinitionKey;
    /*流程实例*/
    private String processInstanceId;
    /*流程图定义*/
    private String processDefinitionId;
    private boolean suspended;
    private int version;
    
    
	public Long getId() {
		return id;
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
	public String getUserId() {
		return userId;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getApplyTime() {
		return applyTime;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getStartTime() {
		return startTime;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getEndTime() {
		return endTime;
	}
	
	public String getLeaveType() {
		return leaveType;
	}
	public String getReason() {
		return reason;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getRealityStartTime() {
		return realityStartTime;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getRealityEndTime() {
		return realityEndTime;
	}
	public String getTaskId() {
		return taskId;
	}
	public String getTaskName() {
		return taskName;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date  getTaskCreateTime() {
		return taskCreateTime;
	}
	public String getAssignee() {
		return assignee;
	}
	public String getTaskDefinitionKey() {
		return taskDefinitionKey;
	}
	public String getProcessInstanceId() {
		return processInstanceId;
	}
	public String getProcessDefinitionId() {
		return processDefinitionId;
	}
	public boolean getSuspended() {
		return suspended;
	}
	public int getVersion() {
		return version;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public void setApplyTime(Date applyTime) {
		this.applyTime = applyTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public void setLeaveType(String leaveType) {
		this.leaveType = leaveType;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public void setRealityStartTime(Date realityStartTime) {
		this.realityStartTime = realityStartTime;
	}
	public void setRealityEndTime(Date realityEndTime) {
		this.realityEndTime = realityEndTime;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public void setTaskCreateTime(Date  taskCreateTime) {
		this.taskCreateTime = taskCreateTime;
	}
	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}
	public void setTaskDefinitionKey(String taskDefinitionKey) {
		this.taskDefinitionKey = taskDefinitionKey;
	}
	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}
	public void setProcessDefinitionId(String processDefinitionId) {
		this.processDefinitionId = processDefinitionId;
	}
	public void setSuspended(boolean suspended) {
		this.suspended = suspended;
	}
	public void setVersion(int version) {
		this.version = version;
	}
	public ProcessStatus getProcessStatus() {
		return processStatus;
	}
	public void setProcessStatus(ProcessStatus processStatus) {
		this.processStatus = processStatus;
	}
    
    
}
