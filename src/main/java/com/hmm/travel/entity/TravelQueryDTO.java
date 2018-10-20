package com.hmm.travel.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.hmm.department.entity.Department;
import com.hmm.employee.entity.Employee;

public class TravelQueryDTO {
	private Date traStartTime;
	private Date traEndTime;
	private String empNo;
	private String approval;//派发人
	private String userName;
	private String empName;
	private String deptName;
	private Department department;
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getEmpName() {
		return empName;
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
	public Department getDepartment() {
		return department;
	}
	public void setDepartment(Department department) {
		this.department = department;
	}
	
	public Date getTraStartTime() {
		return traStartTime;
	}
	public void setTraStartTime(Date traStartTime) {
		this.traStartTime = traStartTime;
	}
	public Date getTraEndTime() {
		return traEndTime;
	}
	public void setTraEndTime(Date traEndTime) {
		this.traEndTime = traEndTime;
	}
	public String getApproval() {
		return approval;
	}
	public void setApproval(String approval) {
		this.approval = approval;
	}
	
	@SuppressWarnings("serial")
	public static Specification<Travel> getWhereClause(final TravelQueryDTO travalQueryDTO) {
		return new Specification<Travel>() {
			@Override
			public Predicate toPredicate(Root<Travel> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
			
				List<Predicate> predicate = new ArrayList<>();
		
				if (null!=travalQueryDTO.getApproval()) {
					predicate.add(criteriaBuilder.equal(root.get("approval").as(String.class),
							travalQueryDTO.getApproval()));
				}
				
				if (null!=travalQueryDTO.getEmpNo()) {
					predicate.add(criteriaBuilder.equal(root.get("empNo").as(String.class),
							travalQueryDTO.getEmpNo()));
				}
				
				if (null!=travalQueryDTO.getTraStartTime()) {
					predicate.add(criteriaBuilder.greaterThanOrEqualTo(root.get("traStartTime").as(Date.class),
							travalQueryDTO.getTraStartTime()));
				}
				if (null!=travalQueryDTO.getTraEndTime()) {
					predicate.add(criteriaBuilder.lessThanOrEqualTo(root.get("traEndTime").as(Date.class),
							travalQueryDTO.getTraEndTime()));
				}
				
				if(travalQueryDTO.getEmpName()!= null) {
					Join<Travel, Employee> join = root.join("employ",JoinType.LEFT);
					criteriaBuilder.like(join.get("empNo").as(String.class), "%" + travalQueryDTO.getEmpName() + "%");
				}
				
				if(travalQueryDTO.getEmpNo()!= null) {
					Join<Travel, Employee> join = root.join("employ",JoinType.LEFT);
					criteriaBuilder.equal(join.get("empNo").as(String.class), travalQueryDTO.getEmpNo());
				}
				
				if(travalQueryDTO.getUserName()!= null) {
					Join<Travel, Employee> join = root.join("employ",JoinType.LEFT);
					criteriaBuilder.equal(join.get("userName").as(String.class), travalQueryDTO.getUserName());
				}
				
				if(travalQueryDTO.getDepartment()!= null) {
					Join<Travel, Employee> join = root.join("employ",JoinType.LEFT);
					
					criteriaBuilder.equal(join.get("departmentes").as(Department.class), travalQueryDTO.getDepartment());
				}
				
				
				Predicate[] pre = new Predicate[predicate.size()];
				return query.where(predicate.toArray(pre)).getRestriction();
			}
		};
	}
	public String getEmpNo() {
		return empNo;
	}
	public void setEmpNo(String empNo) {
		this.empNo = empNo;
	}
}