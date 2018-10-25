package com.hmm.logistics.stock.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hmm.employee.entity.Employee;
import com.hmm.logistics.roomClean.entity.RoomCleanRecord;
import com.hmm.room.entity.Room;

/**
 * 
* @Title: OutStorage.java
* @Package com.hmm.logistics.stock.entity
* @Description: TODO(出库总表实体类)
* @author DJDU
* @date 2018年10月8日
* @version V1.0
 */

@Entity
@Table(name="t_OutStorage")
public class OutStorage {
	private Long id;
	private Date outDate;//出库总表的入库时间
	private String reason;//出库原因
	private RoomCleanRecord roomCleanRecord;//操作记录
	private Employee worker;//出库的工作人员
	private List<OutDetailed> outDetailed=new ArrayList<OutDetailed>();//出库详情表
	private String roomNo;
	
	
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getOutDate() {
		return outDate;
	}
	public String getReason() {
		return reason;
	}
	@OneToOne
	public RoomCleanRecord getRoomCleanRecord() {
		return roomCleanRecord;
	}
	@ManyToOne
	public Employee getWorker() {
		return worker;
	}
	@OneToMany(cascade=CascadeType.ALL,mappedBy="outStorage",fetch=FetchType.LAZY)
	public List<OutDetailed> getOutDetailed() {
		return outDetailed;
	}
	public String getRoomNo() {
		return roomNo;
	}
	
	
	public void setId(Long id) {
		this.id = id;
	}
	public void setOutDate(Date outDate) {
		this.outDate = outDate;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public void setRoomCleanRecord(RoomCleanRecord roomCleanRecord) {
		this.roomCleanRecord = roomCleanRecord;
	}
	public void setWorker(Employee worker) {
		this.worker = worker;
	}
	public void setOutDetailed(List<OutDetailed> outDetailed) {
		this.outDetailed = outDetailed;
	}

	public void setRoomNo(String roomNo) {
		this.roomNo = roomNo;
	}

}
