package com.hmm.finance.logisticst.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hmm.activiti.domain.ProcessStatus;
import com.hmm.employee.domain.Employee;
import com.hmm.logistics.stock.entity.InDetailed;


/**
 * 
* @Title: InAll.java
* @Package com.hmm.stock.entity
* @Description: 入库总表实体类
* @author DJDU
* @date 2018年9月21日
* @version V1.5
 */

@Entity
@Table(name="t_inStorage")
public class InStorage {
	private String inStorageId;
	private Date inStorageDate;//入库日期
	private String vender;//采购商家
	private float amount;
	private Date applyTime;
	
	private List<InDetailed> inDetaileds = new ArrayList<InDetailed>();
	private Employee employee;
	
	private ProcessStatus processStatus;//流程状态 
	private String processInstanceId;
	
	@Id
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
	
	@OneToMany(cascade=CascadeType.ALL,mappedBy="inAll",fetch=FetchType.LAZY)
	public List<InDetailed> getInDetaileds() {
		return inDetaileds;
	}
	
	@ManyToOne
	public Employee getEmployee() {
		return employee;
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
	
	public void setInDetaileds(List<InDetailed> inDetaileds) {
		this.inDetaileds = inDetaileds;
	}
	@Enumerated(EnumType.STRING)
	public ProcessStatus getProcessStatus() {
		return processStatus;
	}
	public String getProcessInstanceId() {
		return processInstanceId;
	}
	public void setProcessStatus(ProcessStatus processStatus) {
		this.processStatus = processStatus;
	}
	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

}
