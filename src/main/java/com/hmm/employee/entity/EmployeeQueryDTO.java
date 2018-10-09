package com.hmm.employee.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;

public class EmployeeQueryDTO {
	private String department;
	private String empName;
	private String idcard;
	private String empNo;
	@DateTimeFormat(pattern="yyyy-MM-dd")  
	private Date createTimeStart;
	@DateTimeFormat(pattern="yyyy-MM-dd")  
	private Date createTimeEnd;
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getEmpName() {
		return empName;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
	public String getIdcard() {
		return idcard;
	}
	public void setIdcard(String idcard) {
		this.idcard = idcard;
	}
	public Date getCreateTimeStart() {
		return createTimeStart;
	}
	public void setCreateTimeStart(Date createTimeStart) {
		this.createTimeStart = createTimeStart;
	}
	public Date getCreateTimeEnd() {
		return createTimeEnd;
	}
	public void setCreateTimeEnd(Date createTimeEnd) {
		this.createTimeEnd = createTimeEnd;
	}
	
	public String getEmpNo() {
		return empNo;
	}
	public void setEmpNo(String empNo) {
		this.empNo = empNo;
	}
	public static Specification<Employee> getWhereClause(final EmployeeQueryDTO employQueryDTO) {
		return new Specification<Employee>() {

			@Override
			public Predicate toPredicate(Root<Employee> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				List<Predicate> predicates = new ArrayList<>();
				if(StringUtils.isNoneBlank(employQueryDTO.getDepartment())) {
					predicates.add(criteriaBuilder.equal(root.get("department").as(String.class),
							employQueryDTO.getDepartment()));
				}
				
				if(null != employQueryDTO.getEmpName()) {
					predicates.add(criteriaBuilder.like(root.get("empName").as(String.class), 
							"%" + employQueryDTO.getEmpName() + "%"));
				}
				
				if(null != employQueryDTO.getEmpNo()) {
					predicates.add(criteriaBuilder.like(root.get("empNo").as(String.class), 
							"%" + employQueryDTO.getEmpNo() + "%"));
				}
				if(null != employQueryDTO.getCreateTimeStart()) {
					predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("entryDate").as(Date.class), 
							employQueryDTO.getCreateTimeStart()));
				}
				
				if(null != employQueryDTO.getCreateTimeEnd()) {
					predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("entryDate").as(Date.class), 
							employQueryDTO.getCreateTimeEnd()));
				}
				Predicate[] pre = new Predicate[predicates.size()];
				return query.where(predicates.toArray(pre)).getRestriction();
			}
		};
		
	}

	
	
}
