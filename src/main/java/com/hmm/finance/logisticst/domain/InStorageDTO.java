package com.hmm.finance.logisticst.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hmm.activiti.domain.ProcessStatus;
import com.hmm.employee.domain.Employee;
import com.hmm.stock.entity.InDetailed;

public class InStorageDTO {
	private String inStorageId;
	private Date inStorageDate;
	private String vender;//采购商家
	private float amount;
	private Date applyTime;
	private String employeeId;
	
	private ProcessStatus processStatus;//流程状态 
	private String processInstanceId;
	
	/**------------流程数据--------------**/
    /*任务*/
    private String taskId;
    private String taskName;
    private Date   taskCreateTime;
    private String assignee; //创建完入库申请， 提交后还为空
    private String taskDefinitionKey;
    /*流程图定义*/
    private String processDefinitionId;
    private boolean suspended;
    private int version;
    
    
	public String getInStorageId() {
		return inStorageId;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getInStorageDate() {
		return inStorageDate;
	}
	public String getVender() {
		return vender;
	}
	public float getAmount() {
		return amount;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getApplyTime() {
		return applyTime;
	}
	public String getEmployeeId() {
		return employeeId;
	}
	public ProcessStatus getProcessStatus() {
		return processStatus;
	}
	public String getProcessInstanceId() {
		return processInstanceId;
	}
	public String getTaskId() {
		return taskId;
	}
	public String getTaskName() {
		return taskName;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getTaskCreateTime() {
		return taskCreateTime;
	}
	public String getAssignee() {
		return assignee;
	}
	public String getTaskDefinitionKey() {
		return taskDefinitionKey;
	}
	public String getProcessDefinitionId() {
		return processDefinitionId;
	}
	public boolean isSuspended() {
		return suspended;
	}
	public int getVersion() {
		return version;
	}
	public void setInStorageId(String inStorageId) {
		this.inStorageId = inStorageId;
	}
	public void setInStorageDate(Date inStorageDate) {
		this.inStorageDate = inStorageDate;
	}
	public void setVender(String vender) {
		this.vender = vender;
	}
	public void setAmount(float amount) {
		this.amount = amount;
	}
	public void setApplyTime(Date applyTime) {
		this.applyTime = applyTime;
	}
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	public void setProcessStatus(ProcessStatus processStatus) {
		this.processStatus = processStatus;
	}
	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public void setTaskCreateTime(Date taskCreateTime) {
		this.taskCreateTime = taskCreateTime;
	}
	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}
	public void setTaskDefinitionKey(String taskDefinitionKey) {
		this.taskDefinitionKey = taskDefinitionKey;
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
   
    
	
	

    
    
}
