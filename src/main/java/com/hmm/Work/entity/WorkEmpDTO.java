package com.hmm.Work.entity;

import java.util.Date;

import org.springframework.beans.BeanUtils;

import com.hmm.employee.entity.Employee;
import com.hmm.employee.entity.EmployeeDTO;

public class WorkEmpDTO {
	private Long workid; //上班id
	private Float worktime;//正常工作时长
	private Date ontudytime;//上班开始时间
	private Date offdutytime;//下班时间
	private Float Overtime;//加班时长
	private Integer normal;//打卡状态(1.正常  2.迟到  3.缺卡 4.早退)
	private Integer late;
	private Integer lackCard;
	private Integer leaveEarly;
	private String empNo;
	private String empName;
	private String deptName;
	private String calendar;//班次
	public static void entityToDto(Work entity,WorkEmpDTO dto ) {
		BeanUtils.copyProperties(entity, dto);			
	}
	//前到后：2.维护多个对象 的数据 以及 对象之间的关联关系 (创建关联、更新关联)
	public static void dtoToEntity(WorkEmpDTO dto ,Work entity) {
		BeanUtils.copyProperties(dto, entity);
				
	}
	public Long getWorkid() {
		return workid;
	}
	public void setWorkid(Long workid) {
		this.workid = workid;
	}
	public Float getWorktime() {
		return worktime;
	}
	public void setWorktime(Float worktime) {
		this.worktime = worktime;
	}
	public Date getOntudytime() {
		return ontudytime;
	}
	public void setOntudytime(Date ontudytime) {
		this.ontudytime = ontudytime;
	}
	public Date getOffdutytime() {
		return offdutytime;
	}
	public void setOffdutytime(Date offdutytime) {
		this.offdutytime = offdutytime;
	}
	public Float getOvertime() {
		return Overtime;
	}
	public void setOvertime(Float overtime) {
		Overtime = overtime;
	}

	public Integer getNormal() {
		return normal;
	}
	public void setNormal(Integer normal) {
		this.normal = normal;
	}
	public Integer getLate() {
		return late;
	}
	public void setLate(Integer late) {
		this.late = late;
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
	public String getEmpNo() {
		return empNo;
	}
	public void setEmpNo(String empNo) {
		this.empNo = empNo;
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
	public String getCalendar() {
		return calendar;
	}
	public void setCalendar(String calendar) {
		this.calendar = calendar;
	}
	
}
