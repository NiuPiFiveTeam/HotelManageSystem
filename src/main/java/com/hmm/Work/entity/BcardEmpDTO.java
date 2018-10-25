package com.hmm.Work.entity;

import java.util.Date;

import org.springframework.beans.BeanUtils;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hmm.activiti.domain.ProcessStatus;


public class BcardEmpDTO {
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
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date realityStartTime;//批准开始时间
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date realityEndTime;//批准结束时间
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date applyTime;//申请时间
    
    private String empName;
	private String empNo;
	private String deptName;

 
	private String reason;//请假理由
    private ProcessStatus processStatus;//流程状态
    private String approval;
    private String userId;//启动流程的用户ID
	//流程实例Id：用于关联流程引擎相关数据没有启动流程之前为""
	private String processInstanceId;
	
	 public static void entityToDto(Bcard entity,BcardEmpDTO dto ) {
	 		BeanUtils.copyProperties(entity, dto);			
	 	}
	 	//前到后：2.维护多个对象 的数据 以及 对象之间的关联关系 (创建关联、更新关联)
	 	public static void dtoToEntity(BcardEmpDTO dto ,Bcard entity) {
	 		BeanUtils.copyProperties(dto, entity);
	 				
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
	 	
	public Long getbCardid() {
		return bCardid;
	}
	public void setbCardid(Long bCardid) {
		this.bCardid = bCardid;
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
	public String getBcardType() {
		return bcardType;
	}
	public void setBcardType(String bcardType) {
		this.bcardType = bcardType;
	}
	public Date getWorkDate() {
		return workDate;
	}
	public void setWorkDate(Date workDate) {
		this.workDate = workDate;
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
	public String getProcessInstanceId() {
		return processInstanceId;
	}
	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}
	
	

}
