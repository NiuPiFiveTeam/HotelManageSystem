package com.hmm.stock.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hmm.employee.domain.Employee;



@Entity
@Table(name="t_inAll")
public class InAll {
	private String inAllId;//入库单编号,inAllId+16位随机数
	private Date date;//入库日期，例:2018/9/16
	private String vender;//采购商家，例：DJDU有限公司
	private float inAllSum;//采购总金额
	private List<InDetailed> indetaileds = new ArrayList<InDetailed>();//子详细入库记录
	private Employee employee;//父入库员工
	
	
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
		return indetaileds;
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
		this.indetaileds = inDetaileds;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	


}
