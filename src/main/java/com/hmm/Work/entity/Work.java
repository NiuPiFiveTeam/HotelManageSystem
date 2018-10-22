package com.hmm.Work.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.hmm.employee.entity.Employee;

@Entity
@Table(name="t_work")
public class Work {
	private Long workid; //上班id
	private Integer normal;//打卡状态(1.正常  2.迟到  3.缺卡 4.早退)
	private Integer late;//迟到
	private Integer lackCard;//
	private Integer leaveEarly;
	private Float worktime;//正常工作时长
	private Date ontudytime;//上班开始时间
	private Date offdutytime;//下班时间
	private Float overtime;//加班时长
	private String calendar;
	
	private String workDate;//打卡日期
	private Employee employ;

	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getWorkid() {
		return workid;
	}
	
	@ManyToOne(cascade=CascadeType.MERGE,fetch=FetchType.LAZY)
	@JoinColumn(name="emp_id")
	public Employee getEmploy() {
		return employ;
	}
	
	
//	@Column(nullable=false)
//	public String getWorkNo() {
//		return workNo;
//	}
//	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
//	@DateTimeFormat(pattern="yyyy-MM-dd")
//	public Date getWorktime() {
//		return worktime;
//	}
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	public Date getOntudytime() {
		return ontudytime;
	}
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	public Date getOffdutytime() {
		return offdutytime;
	}
	public void setWorkid(Long workid) {
		this.workid = workid==null?null:workid;
		
	}
//	public void setWorkNo(String workNo) {
//		this.workNo = workNo;
//	}
//	public void setWorktime(Date worktime) {
//		this.worktime = worktime;
//	}
	public void setOntudytime(Date ontudytime) {
		this.ontudytime = ontudytime;
	}
	public void setOffdutytime(Date offdutytime) {
		this.offdutytime = offdutytime;
	}
	
	public void setEmploy(Employee employ) {
		this.employ = employ;
	}

	public Float getWorktime() {
		return worktime;
	}

	public void setWorktime(Float worktime) {
		this.worktime = worktime;
	}


	public Integer getNormal() {
		return normal;
	}

	public void setNormal(Integer normal) {
		this.normal = normal;
	}

	public Integer getLackCard() {
		return lackCard;
	}

	public void setLackCard(Integer lackCard) {
		this.lackCard = lackCard;
	}

	public Integer getLeaveEarly() {
		return leaveEarly;
	}

	public void setLeaveEarly(Integer leaveEarly) {
		this.leaveEarly = leaveEarly;
	}

	public Integer getLate() {
		return late;
	}

	public void setLate(Integer late) {
		this.late = late;
	}

	public String getCalendar() {
		return calendar;
	}

	public void setCalendar(String calendar) {
		this.calendar = calendar;
	}

	public Float getOvertime() {
		return overtime;
	}

	public void setOvertime(Float overtime) {
		this.overtime = overtime;
	}

	public String getWorkDate() {
		return workDate;
	}

	public void setWorkDate(String workDate) {
		this.workDate = workDate;
	}
	

}
