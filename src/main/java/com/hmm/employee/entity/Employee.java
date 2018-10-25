package com.hmm.employee.entity;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.hmm.Work.entity.Bcard;
import com.hmm.Work.entity.Work;
import com.hmm.calendars.entity.SchedulEvent;
import com.hmm.department.entity.Department;
import com.hmm.leave.entity.Leave;
import com.hmm.overtime.entity.Overtime;
import com.hmm.travel.entity.Travel;
import com.hmm.userRole.entity.GroupRole;


@Entity
@Table(name="t_employee")
public class Employee {
	private Integer emp_id;
	private String empNo; //员工编号
	private String userName; //登入用户账号（对应activiti）
	private String empName;
	private String password; //密码（对应activiti)
	private String empSex; //性别
	private String idcard;//身份证
	private String tel;//电话
	private String jobtype;//工作种类(角色)
	private String address;//籍贯
	private String introduce;//简介
	private Date entryDate;//入职时间
	private Date endDate;//离职时间
	private String empImage;//证件照
//	private Integer REV_;
//	private String RST_;
//	private String LAST_;
//	private String EMAIL_;
//	private String PICTURE_ID_;
	private List<GroupRole> groupRoles;
	private Set<Work> works;
	
	private Set<Leave> leaves;
	
	private Set<Overtime> overtimes;
	
	private Set<Travel> travels;
	
	private Department departmentes;
	
	private List<SchedulEvent> SchedulEventlist;
	
	private Set<Bcard> bcards;

	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Integer getEmp_id() {
		return emp_id;
	}
	
	//@Column(unique=true)
	public String getEmpNo() {
		return empNo;
	}
	@OneToMany(cascade=CascadeType.MERGE,mappedBy="employ",fetch=FetchType.LAZY)
	public Set<Work> getWorks() {
		return works;
	}
	
	@OneToMany(cascade=CascadeType.MERGE,mappedBy="employ",fetch=FetchType.LAZY)
	public Set<Leave> getLeaves() {
		return leaves;
	}
	
	@OneToMany(cascade=CascadeType.MERGE,mappedBy="employ",fetch=FetchType.LAZY)
	public Set<Overtime> getOvertimes() {
		return overtimes;
	}
	@OneToMany(cascade=CascadeType.MERGE,mappedBy="employ",fetch=FetchType.LAZY)
	public Set<Bcard> getBcards() {
		return bcards;
	}

	
	@OneToMany(cascade=CascadeType.MERGE,mappedBy="employ",fetch=FetchType.LAZY)
	public Set<Travel> getTravels() {
		return travels;
	}
	
	@ManyToOne(cascade=CascadeType.MERGE,fetch=FetchType.LAZY)
	@JoinColumn(name="dept_id")
	public Department getDepartmentes() {
		return departmentes;
	}
	
	@ManyToMany(cascade=CascadeType.MERGE,fetch=FetchType.LAZY)
	//@JoinColumn(name="groupTable_id")
	public List<GroupRole> getGroupRoles() {
		return groupRoles;
	}
	@OneToMany(cascade=CascadeType.MERGE,mappedBy="employ",fetch=FetchType.LAZY)
	public List<SchedulEvent> getSchedulEventlist() {
		return SchedulEventlist;
	}

	public String getEmpSex() {
		return empSex;
	}

	//@Column(unique=true)
	public String getIdcard() {
		return idcard;
	}
	//@Column(unique=true)
	public String getTel() {
		return tel;
	}

	public String getAddress() {
		return address;
	}
	public String getIntroduce() {
		return introduce;
	}
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
	@DateTimeFormat(pattern="yyyy-MM-dd")
	public Date getEntryDate() {
		return entryDate;
	}
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
	@DateTimeFormat(pattern="yyyy-MM-dd")
	public Date getEndDate() {
		return endDate;
	}
	public String getEmpImage() {
		return empImage;
	}
	
	public void setEmpSex(String empSex) {
		this.empSex = empSex;
	}


	public void setIdcard(String idcard) {
		this.idcard = null!=idcard?idcard:null;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
//	public void setJobtype(String jobtype) {
//		this.jobtype = jobtype;
//	}
	public void setAddress(String address) {
		this.address = address;
	}
	public void setIntroduce(String introduce) {
		this.introduce = introduce;
	}
	public void setEntryDate(Date entryDate) {
		this.entryDate = entryDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public void setEmpImage(String empImage) {
		this.empImage = empImage;
	}
	
	public void setEmpNo(String empNo) {
		this.empNo = empNo;
	}

	public void setLeaves(Set<Leave> leaves) {
		this.leaves = leaves;
	}
	
	public void setWorks(Set<Work> works) {
		this.works = works;
	}

	public void setOvertimes(Set<Overtime> overtimes) {
		this.overtimes = overtimes;
	}

	public void setTravels(Set<Travel> travels) {
		this.travels = travels;
	}


	
//	public Integer getREV_() {
//		return REV_;
//	}
//
//
//	public void setREV_(Integer rEV_) {
//		REV_ = rEV_;
//	}
//
//
//	public String getRST_() {
//		return RST_;
//	}
//
//
//	public void setRST_(String rST_) {
//		RST_ = rST_;
//	}
//
//
//	public String getLAST_() {
//		return LAST_;
//	}
//
//
//	public void setLAST_(String lAST_) {
//		LAST_ = lAST_;
//	}
//
//
//	public String getEMAIL_() {
//		return EMAIL_;
//	}
//
//
//	public void setEMAIL_(String eMAIL_) {
//		EMAIL_ = eMAIL_;
//	}
//
//
//	public String getPICTURE_ID_() {
//		return PICTURE_ID_;
//	}
//
//
//	public void setPICTURE_ID_(String pICTURE_ID_) {
//		PICTURE_ID_ = pICTURE_ID_;
//	}
	
	public void setEmp_id(Integer emp_id) {
		this.emp_id = null!=emp_id?emp_id:null;
	}

	public String getEmpName() {
		return empName;
	}

	public void setEmpName(String empName) {
		this.empName = empName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}



	public void setDepartmentes(Department departmentes) {
		this.departmentes = departmentes;
	}


	public void setGroupRoles(List<GroupRole> groupRoles) {
		this.groupRoles = groupRoles;
	}

	public String getJobtype() {
		return jobtype;
	}

	public void setJobtype(String jobtype) {
		this.jobtype = jobtype;
	}


	public void setSchedulEventlist(List<SchedulEvent> schedulEventlist) {
		SchedulEventlist = schedulEventlist;
	}


	public void setBcards(Set<Bcard> bcards) {
		this.bcards = bcards;
	}
	
}
