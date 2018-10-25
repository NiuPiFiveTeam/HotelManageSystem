package com.hmm.Work.entity;

import java.util.Date;

import org.springframework.beans.BeanUtils;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hmm.activiti.domain.ProcessStatus;
import com.hmm.leave.entity.Leave;
import com.hmm.leave.entity.LeaveEmpDTO;

public class BcardDTO {
	private Long bCardid; //上班id
	private Float worktime;//正常工作时长
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date ontudytime;//上班开始时间
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date offdutytime;//下班时间
	private Float overtime;//加班时长
	private String calendar;
	private String bcardType;//请假类型
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date workDate;//打卡日期
	   
	private String empName;
	private String empNo;
	private String deptName;
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date applyTime;//申请时间
    private String reason;//请假理由
    private ProcessStatus processStatus;//流程状态
    private String approval;
    private String userId;//启动流程的用户ID
    
    /*销假*/
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date realityStartTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date realityEndTime;
    /**------------流程数据--------------**/
    /*任务*/
    private String taskId;
    private String taskName;
    private Date   taskCreateTime;
    private String assignee;//受理人
    private String taskDefinitionKey;
    /*流程实例*/
    private String processInstanceId;
    /*流程图定义*/
    private String processDefinitionId;
    private boolean suspended;
    private int version;
    public static void entityToDto(Bcard entity,BcardDTO dto ) {
 		BeanUtils.copyProperties(entity, dto);			
 	}
 	//前到后：2.维护多个对象 的数据 以及 对象之间的关联关系 (创建关联、更新关联)
 	public static void dtoToEntity(BcardDTO dto ,Bcard entity) {
 		BeanUtils.copyProperties(dto, entity);
 				
 	}



	public Float getWorktime() {
		return worktime;
	}
	public void setWorktime(Float worktime) {
		this.worktime = worktime;
	}
	public Date getOntudytime() {
		return ontudytime;
	}
	public void setOntudytime(Date ontudytime) {
		this.ontudytime = ontudytime;
	}
	public Date getOffdutytime() {
		return offdutytime;
	}
	public void setOffdutytime(Date offdutytime) {
		this.offdutytime = offdutytime;
	}
	public Float getOvertime() {
		return overtime;
	}
	public void setOvertime(Float overtime) {
		this.overtime = overtime;
	}
	public String getCalendar() {
		return calendar;
	}
	public void setCalendar(String calendar) {
		this.calendar = calendar;
	}
	public Date getWorkDate() {
		return workDate;
	}
	public void setWorkDate(Date workDate) {
		this.workDate = workDate;
	}
	public Date getApplyTime() {
		return applyTime;
	}
	public void setApplyTime(Date applyTime) {
		this.applyTime = applyTime;
	}

	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
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
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public Date getRealityStartTime() {
		return realityStartTime;
	}
	public void setRealityStartTime(Date realityStartTime) {
		this.realityStartTime = realityStartTime;
	}
	public Date getRealityEndTime() {
		return realityEndTime;
	}
	public void setRealityEndTime(Date realityEndTime) {
		this.realityEndTime = realityEndTime;
	}
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public Date getTaskCreateTime() {
		return taskCreateTime;
	}
	public void setTaskCreateTime(Date taskCreateTime) {
		this.taskCreateTime = taskCreateTime;
	}
	public String getAssignee() {
		return assignee;
	}
	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}
	public String getTaskDefinitionKey() {
		return taskDefinitionKey;
	}
	public void setTaskDefinitionKey(String taskDefinitionKey) {
		this.taskDefinitionKey = taskDefinitionKey;
	}
	public String getProcessInstanceId() {
		return processInstanceId;
	}
	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}
	public String getProcessDefinitionId() {
		return processDefinitionId;
	}
	public void setProcessDefinitionId(String processDefinitionId) {
		this.processDefinitionId = processDefinitionId;
	}
	public boolean isSuspended() {
		return suspended;
	}
	public void setSuspended(boolean suspended) {
		this.suspended = suspended;
	}
	public int getVersion() {
		return version;
	}
	public void setVersion(int version) {
		this.version = version;
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
	public String getBcardType() {
		return bcardType;
	}
	public void setBcardType(String bcardType) {
		this.bcardType = bcardType;
	}
	public Long getbCardid() {
		return bCardid;
	}
	public void setbCardid(Long bCardid) {
		this.bCardid = bCardid;
	}

	
}
