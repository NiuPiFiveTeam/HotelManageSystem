package com.hmm.logistics.roomClean.entity;

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
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hmm.employee.entity.Employee;
import com.hmm.logistics.stock.entity.OutDetailed;
import com.hmm.logistics.stock.entity.OutStorage;
import com.hmm.room.entity.Room;

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
	private String roomHandle;//操作
	private String roomOther;//备注
	private Date roomDate;//清洁日期
	private Employee roomWorker;//清洁人员
	private OutStorage outStorage;//库存出库记录表
	private Room room;//房间
	
	

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}
	
	public String getRoomHandle() {
		return roomHandle;
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
	@OneToOne(cascade=CascadeType.ALL,mappedBy="roomCleanRecord",fetch=FetchType.LAZY)
	public OutStorage getOutStorage() {
		return outStorage;
	}
	@OneToOne
	public Room getRoom() {
		return room;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	public void setRoomHandle(String roomHandle) {
		this.roomHandle = roomHandle;
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
	public void setOutStorage(OutStorage outStorage) {
		this.outStorage = outStorage;
	}
	public void setRoom(Room room) {
		this.room = room;
	}
	
}
