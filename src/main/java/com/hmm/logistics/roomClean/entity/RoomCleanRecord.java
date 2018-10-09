package com.hmm.logistics.roomClean.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hmm.employee.entity.Employee;
import com.hmm.logistics.stock.entity.OutDetailed;

/**
 * 
* @Title: RoomCleanRecord.java
* @Package com.hmm.logistics.roomClean.entity
* @Description: TODO(客房内务操作记录实体)
* @author DJDU
* @date 2018年10月9日
* @version V1.0
 */

@Entity
@Table(name="t_roomcleanRecord")
public class RoomCleanRecord {
	private Long id;//记录ID
	private String floor;//楼层
	private String roomNumber;//房间编号
	private String roomHandle;//操作
	private String roomType;//房间类型
	private String roomOther;//备注
	private Date roomDate;//清洁日期
	private Employee roomWorker;//清洁人员
	private OutDetailed outDetailed;//库存出库记录表
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}
	public String getFloor() {
		return floor;
	}
	public String getRoomNumber() {
		return roomNumber;
	}
	public String getRoomHandle() {
		return roomHandle;
	}
	public String getRoomType() {
		return roomType;
	}
	public String getRoomOther() {
		return roomOther;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")  
	public Date getRoomDate() {
		return roomDate;
	}
	@ManyToOne
	public Employee getRoomWorker() {
		return roomWorker;
	}
	@OneToOne
	public OutDetailed getOutDetailed() {
		return outDetailed;
	}
	
	
	
	
	public void setId(Long id) {
		this.id = id;
	}
	public void setFloor(String floor) {
		this.floor = floor;
	}
	public void setRoomNumber(String roomNumber) {
		this.roomNumber = roomNumber;
	}
	public void setRoomHandle(String roomHandle) {
		this.roomHandle = roomHandle;
	}
	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}
	public void setRoomOther(String roomOther) {
		this.roomOther = roomOther;
	}
	public void setRoomDate(Date roomDate) {
		this.roomDate = roomDate;
	}
	public void setRoomWorker(Employee roomWorker) {
		this.roomWorker = roomWorker;
	}
	public void setOutDetailed(OutDetailed outDetailed) {
		this.outDetailed = outDetailed;
	}
	
	
}
