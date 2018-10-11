package com.hmm.room.dto;

import com.hmm.room.util.RoomState;
import com.hmm.room.util.RoomType;

public class RoomDto {

	private Long roomId;  
 	private String roomNo;		//房间号码
	
	private RoomType type; //房间类型， 单人房 双人房 三人房 钟点房
	private int state; //房间状态， 空闲、入住、需要清洁、需要补充日用品
	private String roomPass;  //房卡密码，跟房卡进行绑定
	private Long floorId;
	public Long getRoomId() {
		return roomId;
	}
	public void setRoomId(Long roomId) {
		this.roomId = roomId;
	}
	public String getRoomNo() {
		return roomNo;
	}
	public void setRoomNo(String roomNo) {
		this.roomNo = roomNo;
	}
	public RoomType getType() {
		return type;
	}
	public void setType(RoomType type) {
		this.type = type;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public String getRoomPass() {
		return roomPass;
	}
	public void setRoomPass(String roomPass) {
		this.roomPass = roomPass;
	}
	public Long getFloorId() {
		return floorId;
	}
	public void setFloorId(Long floorId) {
		this.floorId = floorId;
	}
	
	

}
