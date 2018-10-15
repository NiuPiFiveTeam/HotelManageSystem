package com.hmm.finance.salary.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hmm.department.entity.Department;
import com.hmm.employee.entity.Employee;

@Entity
@Table(name="t_salary_order")
public class SalaryOrder {
	private Long salaryOrderId;//工资单id
	private float basicwage;//基本工资
	private float overtimefee;//加班工资
	private float allowance;//出差工资
	private float reducemoney;//请假所扣工资
	private Date date;//工资年月
	
	private Employee employee;//员工
	
	 
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getSalaryOrderId() {
		return salaryOrderId;
	}
	public float getBasicwage() {
		return basicwage;
	}
	public float getOvertimefee() {
		return overtimefee;
	}
	public float getAllowance() {
		return allowance;
	}
	public float getReducemoney() {
		return reducemoney;
	}
	@JsonFormat(pattern="yyyy/MM/dd",timezone="GMT+8")
	public Date getDate() {
		return date;
	}
	@ManyToOne
	@JoinColumn(name="employeeId")
	public Employee getEmployee() {
		return employee;
	}
	public void setSalaryOrderId(Long salaryOrderId) {
		this.salaryOrderId = salaryOrderId;
	}
	public void setBasicwage(float basicwage) {
		this.basicwage = basicwage;
	}
	public void setOvertimefee(float overtimefee) {
		this.overtimefee = overtimefee;
	}
	public void setAllowance(float allowance) {
		this.allowance = allowance;
	}
	public void setReducemoney(float reducemoney) {
		this.reducemoney = reducemoney;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	
}
