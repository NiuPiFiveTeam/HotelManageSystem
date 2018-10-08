package com.hmm.logistics.roomClean.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
/**
 * 
* @Title: RoomClean.java
* @Package com.hmm.logistics.roomClean.entity
* @Description: TODO(客房内务管理实体)
* @author DJDU
* @date 2018年10月8日
* @version V1.0
 */

@Entity
@Table(name="t_roomclean")
public class RoomClean {
	private Long id;//记录ID
	private String floor;//楼层
	private String roomNumber;//房间编号
	private String roomState;//房间状态
	private String roomType;//房间类型
	private String roomOther;//备注
	private Date roomDate;//清洁日期
	private String roomWorker;//清洁人员
	
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
	public String getRoomState() {
		return roomState;
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
	public String getRoomWorker() {
		return roomWorker;
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
	public void setRoomState(String roomState) {
		this.roomState = roomState;
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
	public void setRoomWorker(String roomWorker) {
		this.roomWorker = roomWorker;
	}
	
	
	
	

	
	
	
	

}
