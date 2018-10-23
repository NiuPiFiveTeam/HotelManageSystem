package com.hmm.guest.dto;

import java.util.Date;

import com.hmm.guest.util.Gender;
import com.hmm.guest.util.GuestState;
import com.hmm.room.entity.Room;
import com.hmm.room.util.RoomState;
import com.hmm.room.util.RoomType;

public class GuestInfoDto {

	private String realName; //客人姓名
	private String phone; //电话
	private Gender gender; //性别
	private String idCard; //身份证
	private String address; //身份证上的地址
	private GuestState guestState; //状态,默认:临时用户,会员,重要客户,被加入黑名单
	private Date registerTime; //第一次来本酒店的时间
	
	private String roomNo;		//房间号码
	
	private RoomType type; //房间类型， 单人房 双人房 三人房 钟点房
	private RoomState roomState; //房间状态， 空闲、入住、需要清洁、需要补充日用品
	private String roomPass;  //房卡密码，跟房卡进行绑定
	
	
	public String getRealName() {
		return realName;
	}
	public void setRealName(String realName) {
		this.realName = realName;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public Gender getGender() {
		return gender;
	}
	public void setGender(Gender gender) {
		this.gender = gender;
	}
	public String getIdCard() {
		return idCard;
	}
	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public GuestState getGuestState() {
		return guestState;
	}
	public void setGuestState(GuestState guestState) {
		this.guestState = guestState;
	}
	public Date getRegisterTime() {
		return registerTime;
	}
	public void setRegisterTime(Date registerTime) {
		this.registerTime = registerTime;
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
	public RoomState getRoomState() {
		return roomState;
	}
	public void setRoomState(RoomState roomState) {
		this.roomState = roomState;
	}
	public String getRoomPass() {
		return roomPass;
	}
	public void setRoomPass(String roomPass) {
		this.roomPass = roomPass;
	}
	
	
	@Override
	public String toString() {
		return "GuestInfoDto [realName=" + realName + ", phone=" + phone + ", gender=" + gender + ", idCard=" + idCard
				+ ", address=" + address + ", guestState=" + guestState + ", registerTime=" + registerTime + ", roomNo="
				+ roomNo + ", type=" + type + ", roomState=" + roomState + ", roomPass=" + roomPass + "]";
	}
	
	
	
	
}
