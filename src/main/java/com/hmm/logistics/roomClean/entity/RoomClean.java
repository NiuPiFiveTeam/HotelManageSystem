package com.hmm.logistics.roomClean.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.hmm.logistics.roomClean.util.RoomCleanState;
import com.hmm.room.entity.Room;

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
	private Long roomCleanId;//记录ID
	private String roomOther;//备注
	private RoomCleanState roomCleanState;//房间服务状态
	private Room room;//房间表
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getRoomCleanId() {
		return roomCleanId;
	}
	public String getRoomOther() {
		return roomOther;
	}
	@OneToOne
	public Room getRoom() {
		return room;
	}
	public RoomCleanState getRoomCleanState() {
		return roomCleanState;
	}
	
	public void setRoomCleanId(Long roomCleanId) {
		this.roomCleanId = roomCleanId;
	}
	public void setRoomOther(String roomOther) {
		this.roomOther = roomOther;
	}
	public void setRoom(Room room) {
		this.room = room;
	}
	public void setRoomCleanState(RoomCleanState roomCleanState) {
		this.roomCleanState = roomCleanState;
	}
}
