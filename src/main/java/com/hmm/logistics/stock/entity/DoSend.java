package com.hmm.logistics.stock.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hmm.employee.entity.Employee;
import com.hmm.finance.logisticst.domain.InStorage;
import com.hmm.logistics.stock.util.InIn;

@Entity
@Table(name="t_doSend")
public class DoSend {
	private Long id;
	private InIn inin;
	private Date doDate;//申请日期
	private Employee sendWorker;//申请员工
	private InStorage inAll;//入库申请
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getDoDate() {
		return doDate;
	}
	@OneToOne
	public Employee getSendWorker() {
		return sendWorker;
	}
	@OneToOne
	public InStorage getInAll() {
		return inAll;
	}
	public InIn getInin() {
		return inin;
	}
	
	
	public void setId(Long id) {
		this.id = id;
	}
	public void setDoDate(Date doDate) {
		this.doDate = doDate;
	}
	public void setSendWorker(Employee sendWorker) {
		this.sendWorker = sendWorker;
	}
	public void setInAll(InStorage inAll) {
		this.inAll = inAll;
	}
	public void setInin(InIn inin) {
		this.inin = inin;
	}
}
