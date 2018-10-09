package com.hmm.department.entity;

import org.springframework.beans.BeanUtils;

public class DeptDTO {
	//部门信息
	private Integer dept_id;
	private String deptNo;
	private String deptName;
	//部门经理信息
	private String managerNo;
	private String managerName;
	private Integer managerId;
	//上级
	private Integer parentId;
	private String deptParent;
	
	private Integer is_parent;
	
	//后到前：1.针对“前端”设计的数据封装对象(查询)
	public static void entityToDto(Department entity,DeptDTO dto ) {
		BeanUtils.copyProperties(entity, dto);			
	}
	//前到后：2.维护多个对象 的数据 以及 对象之间的关联关系 (创建关联、更新关联)
	public static void dtoToEntity(DeptDTO dto ,Department entity) {
		BeanUtils.copyProperties(dto, entity);
				
	}
	
	public Integer getDept_id() {
		return dept_id;
	}
	public void setDept_id(Integer dept_id) {
		this.dept_id = dept_id;
	}
	
	public String getManagerNo() {
		return managerNo;
	}
	public void setManagerNo(String managerNo) {
		this.managerNo = managerNo;
	}
	public String getManagerName() {
		return managerName;
	}
	public void setManagerName(String managerName) {
		this.managerName = managerName;
	}
	public Integer getManagerId() {
		return managerId;
	}
	public void setManagerId(Integer managerId) {
		this.managerId = managerId;
	}
	public Integer getParentId() {
		return parentId;
	}
	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}
	public String getDeptParent() {
		return deptParent;
	}
	public void setDeptParent(String deptParent) {
		this.deptParent = deptParent;
	}
	public Integer getIs_parent() {
		return is_parent;
	}
	public void setIs_parent(Integer is_parent) {
		this.is_parent = is_parent;
	}
	public String getDeptName() {
		return deptName;
	}
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	public String getDeptNo() {
		return deptNo;
	}
	public void setDeptNo(String deptNo) {
		this.deptNo = deptNo;
	}
	
}
