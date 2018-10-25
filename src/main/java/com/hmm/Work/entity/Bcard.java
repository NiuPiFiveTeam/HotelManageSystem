package com.hmm.Work.entity;

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
@Table(name="t_bCard")
public class Bcard {
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
	
	private Employee employ;
	
	
    private Date realityStartTime;//批准开始时间
    private Date realityEndTime;//批准结束时间
    private Date applyTime;//申请时间

    private String reason;//请假理由
    private ProcessStatus processStatus;//流程状态
    private String approval;
    private String userId;//启动流程的用户ID
	//流程实例Id：用于关联流程引擎相关数据没有启动流程之前为""
	private String processInstanceId;
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getbCardid() {
		return bCardid;
	}
	
    @ManyToOne(cascade=CascadeType.MERGE,fetch=FetchType.LAZY)
    @JoinColumn(name="emp_id")
	public Employee getEmploy() {
		return employ;
	}
	public Float getWorktime() {
		return worktime;
	}
	public Date getOntudytime() {
		return ontudytime;
	}
	public Date getOffdutytime() {
		return offdutytime;
	}
	public Float getOvertime() {
		return overtime;
	}
	public String getCalendar() {
		return calendar;
	}

	public Date getWorkDate() {
		return workDate;
	}
	
	public Date getRealityStartTime() {
		return realityStartTime;
	}
	public Date getRealityEndTime() {
		return realityEndTime;
	}
	public Date getApplyTime() {
		return applyTime;
	}

	public String getReason() {
		return reason;
	}
	public ProcessStatus getProcessStatus() {
		return processStatus;
	}
	public String getApproval() {
		return approval;
	}
	public String getUserId() {
		return userId;
	}
	public String getProcessInstanceId() {
		return processInstanceId;
	}
	
	public void setWorktime(Float worktime) {
		this.worktime = worktime;
	}
	public void setOntudytime(Date ontudytime) {
		this.ontudytime = ontudytime;
	}
	public void setOffdutytime(Date offdutytime) {
		this.offdutytime = offdutytime;
	}
	public void setOvertime(Float overtime) {
		this.overtime = overtime;
	}
	public void setCalendar(String calendar) {
		this.calendar = calendar;
	}

	public void setWorkDate(Date workDate) {
		this.workDate = workDate;
	}
	public void setEmploy(Employee employ) {
		this.employ = employ;
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

	public void setReason(String reason) {
		this.reason = reason;
	}
	public void setProcessStatus(ProcessStatus processStatus) {
		this.processStatus = processStatus;
	}
	public void setApproval(String approval) {
		this.approval = approval;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}

	public void setbCardid(Long bCardid) {
		this.bCardid = bCardid;
	}

	public String getBcardType() {
		return bcardType;
	}

	public void setBcardType(String bcardType) {
		this.bcardType = bcardType;
	}

	

}
