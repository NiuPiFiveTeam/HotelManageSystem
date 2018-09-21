package com.hmm.stock.entity;

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

/**
 * 
* @Title: InAll.java
* @Package com.hmm.stock.entity
* @Description: 入库总表实体类
* @author DJDU
* @date 2018年9月21日
* @version V1.4
 */

@Entity
@Table(name="t_inAll")
public class InAll {
	private String inAllId;//入库单编号,inAllId+16位随机数
	private Date date;//入库日期，例:2018/9/16
	private String vender;//采购商家，例：DJDU有限公司
	private float inAllSum;//采购总金额
	private List<InDetailed> inDetaileds = new ArrayList<InDetailed>();//子详细入库记录
	private Employee employee;//父入库员工
	
	 private ProcessStatus processStatus;//流程状态 
	 private String processInstanceId;
	
	@Id
	public String getInAllId() {
		return inAllId;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getDate() {
		return date;
	}
	public String getVender() {
		return vender;
	}
	public float getInAllSum() {
		return inAllSum;
	}
	@OneToMany(cascade=CascadeType.ALL,mappedBy="inAll",fetch=FetchType.LAZY)
	public List<InDetailed> getInDetaileds() {
		return inDetaileds;
	}
	
	@ManyToOne
	public Employee getEmployee() {
		return employee;
	}
	
	
	public void setInAllId(String inAllId) {
		this.inAllId = inAllId;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public void setVender(String vender) {
		this.vender = vender;
	}
	public void setInAllSum(float inAllSum) {
		this.inAllSum = inAllSum;
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
