package com.hmm.room.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hmm.room.util.RoomState;
import com.hmm.room.util.RoomType;

/**
 * 酒店客房实体
 * @author huangxinjian
 *
 */
@Entity
@Table(name="t_room")
//@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class Room {

	private Long roomId;  
 	private String roomNo;		//房间号码
	
	private RoomType type; //房间类型， 单人房 双人房 三人房 钟点房
	private RoomState state; //房间状态， 空闲、入住、需要清洁、需要补充日用品
	private String roomPass;  //房卡密码，跟房卡进行绑定
	private String price; 	//房间单价
	
	//其他属性
//	@JsonIgnore
	private Floor floorNode;//多个子节点  对  一个父节点,多个房间对应一个楼层

	@Id
	public Long getRoomId() {
		return roomId;
	}

	public String getRoomNo() {
		return roomNo;
	}

	public RoomType getType() {
		return type;
	}

	public RoomState getState() {
		return state;
	}

	public String getRoomPass() {
		return roomPass;
	}

	
	@ManyToOne(cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	public Floor getFloorNode() {
		return floorNode;
	}

	public void setRoomId(Long roomId) {
		this.roomId = roomId;
	}

	public void setRoomNo(String roomNo) {
		this.roomNo = roomNo;
	}

	public void setType(RoomType type) {
		this.type = type;
	}

	public void setState(RoomState state) {
		this.state = state;
	}

	public void setRoomPass(String roomPass) {
		this.roomPass = roomPass;
	}
	
	public void setFloorNode(Floor floorNode) {
		this.floorNode = floorNode;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	

	
}
