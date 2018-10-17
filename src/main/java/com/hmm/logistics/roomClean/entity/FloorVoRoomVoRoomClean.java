package com.hmm.logistics.roomClean.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 
* @Title: FloorVoRoomVoRoomClean.java
* @Package com.hmm.logistics.roomClean.entity
* @Description: TODO(查询Floor,Room,RoomClean过渡表)
* @author DJDU
* @date 2018年10月17日
* @version V1.0
 */

@Entity
@Table(name="t_FloorVoRoomVoRoomClean")
public class FloorVoRoomVoRoomClean {
	public Long id;
	private String floorName; //楼层
	private String roomNo;	  //房间号码
	private String type;	  //房间类型
	private String roomCleanState;//房间服务状态
	private String roomOther; //房间备注
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}
	public String getFloorName() {
		return floorName;
	}
	public String getRoomNo() {
		return roomNo;
	}
	public String getType() {
		return type;
	}
	public String getRoomCleanState() {
		return roomCleanState;
	}
	public String getRoomOther() {
		return roomOther;
	}
	
	
	public void setId(Long id) {
		this.id = id;
	}
	public void setFloorName(String floorName) {
		this.floorName = floorName;
	}
	public void setRoomNo(String roomNo) {
		this.roomNo = roomNo;
	}
	public void setType(String type) {
		this.type = type;
	}
	public void setRoomCleanState(String roomCleanState) {
		this.roomCleanState = roomCleanState;
	}
	public void setRoomOther(String roomOther) {
		this.roomOther = roomOther;
	}
}
