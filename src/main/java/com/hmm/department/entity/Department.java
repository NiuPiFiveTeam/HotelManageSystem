package com.hmm.department.entity;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;



import com.hmm.employee.entity.Employee;
import com.hmm.userRole.entity.GroupRole;

@Entity
@Table(name="t_dept")
public class Department {
	
		private Integer dept_id;//id
		private String deptNo;//部门key
		private String deptName;//名称
		private String managerNo;
		private String managerName;
		private Integer  managerId;
		private Integer is_parent;
		private Set<Employee> employ;
		private Department departmentParent;
		private List<Department> childDepartment;
		private List<GroupRole> groupRoles;
		@Id
		@GeneratedValue(strategy=GenerationType.IDENTITY)
		public Integer getDept_id() {
			return dept_id;
		}
		
		@OneToMany(cascade=CascadeType.MERGE,fetch=FetchType.LAZY,mappedBy="departmentes")
		public Set<Employee> getEmployee() {
			return employ;
		}
		@OneToMany(targetEntity=Department.class,cascade=CascadeType.MERGE,mappedBy="departmentParent",fetch=FetchType.LAZY)
		public List<Department> getChildDepartment() {
			return childDepartment;
		}
		
		@ManyToOne(fetch=FetchType.LAZY,cascade=CascadeType.MERGE)
		@JoinColumn(name="parent_id")
		public Department getDepartmentParent() {
			return departmentParent;
		}
	
		@OneToMany(cascade=CascadeType.MERGE,fetch=FetchType.LAZY,mappedBy="department")
		public List<GroupRole> getGroupRoles() {
			return groupRoles;
		}
		
		
//		public String getParent_id() {
//			return parent_id;
//		}
//		public void setParent_id(String parent_id) {
//			this.parent_id = parent_id;
//		}
		public Integer getIs_parent() {
			return is_parent;
		}
		public void setIs_parent(Integer is_parent) {
			this.is_parent = is_parent;
		}

		

		
		public void setEmployee(Set<Employee> employ) {
			this.employ = employ;
		}

	

		public void setDept_id(Integer dept_id) {
			this.dept_id = dept_id;
		}

	

		public void setDepartmentParent(Department departmentParent) {
			this.departmentParent = departmentParent;
		}
		public void setChildDepartment(List<Department> childDepartment) {
			this.childDepartment = childDepartment;
		}

		public String getManagerName() {
			return managerName;
		}

		public void setManagerName(String managerName) {
			this.managerName = managerName;
		}

		public String getManagerNo() {
			return managerNo;
		}

		public void setManagerNo(String managerNo) {
			this.managerNo = managerNo;
		}

		public Integer getManagerId() {
			return managerId;
		}

		public void setManagerId(Integer managerId) {
			this.managerId = managerId;
		}

		public String getDeptNo() {
			return deptNo;
		}

		public void setDeptNo(String deptNo) {
			this.deptNo = deptNo;
		}

		public String getDeptName() {
			return deptName;
		}

		public void setDeptName(String deptName) {
			this.deptName = deptName;
		}

		

		public void setGroupRoles(List<GroupRole> groupRoles) {
			this.groupRoles = groupRoles;
		}

		

		
		
		
		
	}


