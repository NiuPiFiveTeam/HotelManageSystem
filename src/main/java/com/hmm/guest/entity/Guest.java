package com.hmm.guest.entity;

import java.util.Date;

import javax.annotation.Generated;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hmm.guest.util.Gender;
import com.hmm.guest.util.GuestState;
import com.hmm.room.entity.Room;

@Entity
@Table(name="t_guest")
public class Guest {
	
	private String guestId; //主键
	private String realName; //客人姓名
	private String phone; //电话
	private Gender gender; //性别
	private String idCard; //身份证
	private String address; //身份证上的地址
	private GuestState state; //状态,默认:临时用户,会员,重要客户,被加入黑名单
	private Date registerTime; //第一次来本酒店的时间
	
	//单向关联，多个用户对应一个房间
	private Room room;
	
	
	@Id
	public String getGuestId() {
		return guestId;
	}
	public String getRealName() {
		return realName;
	}
	public String getPhone() {
		return phone;
	}
	public Gender getGender() {
		return gender;
	}
	public String getIdCard() {
		return idCard;
	}
	public String getAddress() {
		return address;
	}
	public GuestState getState() {
		return state;
	}
	
	@Temporal(TemporalType.TIMESTAMP)
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getRegisterTime() {
		return registerTime;
	}
	
	@ManyToOne(cascade=CascadeType.ALL)
	public Room getRoom() {
		return room;
	}
	
	
	public void setGuestId(String guestId) {
		this.guestId = guestId;
	}
	public void setRealName(String realName) {
		this.realName = realName;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public void setGender(Gender gender) {
		this.gender = gender;
	}
	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public void setState(GuestState state) {
		this.state = state;
	}
	public void setRegisterTime(Date registerTime) {
		this.registerTime = registerTime;
	}
	public void setRoom(Room room) {
		this.room = room;
	} 
	
	
	
	
}
