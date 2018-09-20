package com.hmm.employee.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
@Table(name="t_employee")
public class Employee {
	private Integer id; //id主键
	private String empNo; //员工编号
	private String ID_; //用户（对应activiti）
	private String PWD_; //密码（对应activiti）
	private String empSex; //性别
	private String emptype;//员工类别
	private String department;//部门
	private String idcard;//身份证
	private String tel;//电话
	private String jobtype;//工作种类
	private String address;//籍贯
	private String introduce;//简介
	private Date entryDate;//入职时间
	private Date endDate;//离职时间
	private String empImage;//证件照
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Integer getId() {
		return id;
	}
	
	@Column(nullable=false , unique=true)
	public String getEmpNo() {
		return empNo;
	}
	@Column(nullable=false , unique=true)
	public String getID_() {
		return ID_;
	}
	@Column(nullable=false)
	public String getPWD_() {
		return PWD_;
	}
	public String getEmpSex() {
		return empSex;
	}
	public String getEmptype() {
		return emptype;
	}
	@Column(nullable=false)
	public String getDepartment() {
		return department;
	}
	@Column(nullable=false,unique=true)
	public String getIdcard() {
		return idcard;
	}
	public String getTel() {
		return tel;
	}
	public String getJobtype() {
		return jobtype;
	}
	public String getAddress() {
		return address;
	}
	public String getIntroduce() {
		return introduce;
	}
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	public Date getEntryDate() {
		return entryDate;
	}
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	public Date getEndDate() {
		return endDate;
	}
	public String getEmpImage() {
		return empImage;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public void setEmpNo(String empNo) {
		this.empNo = empNo;
	}
	public void setID_(String iD_) {
		ID_ = iD_;
	}
	public void setPWD_(String pWD_) {
		PWD_ = pWD_;
	}
	public void setEmpSex(String empSex) {
		this.empSex = empSex;
	}
	public void setEmptype(String emptype) {
		this.emptype = emptype;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public void setIdcard(String idcard) {
		this.idcard = idcard;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public void setJobtype(String jobtype) {
		this.jobtype = jobtype;
	}
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
	
	
}
