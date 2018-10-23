package com.hmm.guest.dto;

import com.hmm.guest.util.Gender;
import com.hmm.guest.util.GuestState;

public class GuestDto {

	private String realName; //客人姓名
	private String phone; //电话
	private Gender gender; //性别
	private String idCard; //身份证
	private GuestState state; //状态,默认:临时用户,会员,重要客户,被加入黑名单
	
	
	
	
	
	public GuestDto(String realName,String idCard, String phone, Gender gender,  GuestState state) {
		super();
		this.realName = realName;
		this.idCard = idCard;
		this.phone = phone;
		this.gender = gender;
		
		this.state = state;
	}

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
	public GuestState getState() {
		return state;
	}
	public void setState(GuestState state) {
		this.state = state;
	}
	
	
}
