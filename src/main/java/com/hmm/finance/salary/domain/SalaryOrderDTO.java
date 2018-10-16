package com.hmm.finance.salary.domain;

import java.util.Date;

import org.springframework.beans.BeanUtils;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hmm.department.entity.Department;
import com.hmm.employee.entity.Employee;
import com.hmm.employee.entity.EmployeeDTO;

public class SalaryOrderDTO {
	private Long salaryOrderId;//工资单id
	private float basicwage;//基本工资
	private float overtimefee;//加班工资
	private float allowance;//出差工资
	private float reducemoney;//请假所扣工资
	private Date date;//工资年月
	
	private String empNo;//员工
	private String empName;//员工
	private String deptName;//所属部门
	
	public static void entityToDto(SalaryOrder entity,SalaryOrderDTO dto ) {
		BeanUtils.copyProperties(entity, dto);			
	}
	
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
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getDate() {
		return date;
	}
	public String getEmpNo() {
		return empNo;
	}
	public String getEmpName() {
		return empName;
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
	public void setEmpNo(String empNo) {
		this.empNo = empNo;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
 
	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

}
