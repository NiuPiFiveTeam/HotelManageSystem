package com.hmm.finance.roomOrder.domain;

import java.util.Date;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hmm.finance.roomOrder.util.RoomOrderStatus;

public class RoomOrderDTO {
	private Long bookRoomNo;//房间订单号   20181022161752
	private Long RoomNo;//客房号
	private String roomType;//房间类型  单人房
	private String booksource;//订单来源,  到店订房
	private Float roomPrice;//房价, 100
	private Date checkInTime;//入住时间,
	private Date checkOutTime;//退房时间
	private String bookGuest;//预定人,  非预定
	private Long bookPhone;//预定号码, 无
	private String remark;//备注
	private Float totalIncome;//总收入(含押金)
	private Float realIncome;//实际收入
	private RoomOrderStatus roomOrderStatus;
	public Long getBookRoomNo() {
		return bookRoomNo;
	}
	public Long getRoomNo() {
		return RoomNo;
	}
	public String getRoomType() {
		return roomType;
	}
	public String getBooksource() {
		return booksource;
	}
	public Float getRoomPrice() {
		return roomPrice;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getCheckInTime() {
		return checkInTime;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getCheckOutTime() {
		return checkOutTime;
	}
	public String getBookGuest() {
		return bookGuest;
	}
	public Long getBookPhone() {
		return bookPhone;
	}
	public String getRemark() {
		return remark;
	}
	public Float getTotalIncome() {
		return totalIncome;
	}
	public Float getRealIncome() {
		return realIncome;
	}
	public RoomOrderStatus getRoomOrderStatus() {
		return roomOrderStatus;
	}
	public void setBookRoomNo(Long bookRoomNo) {
		this.bookRoomNo = bookRoomNo;
	}
	public void setRoomNo(Long roomNo) {
		RoomNo = roomNo;
	}
	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}
	public void setBooksource(String booksource) {
		this.booksource = booksource;
	}
	public void setRoomPrice(Float roomPrice) {
		this.roomPrice = roomPrice;
	}
	public void setCheckInTime(Date checkInTime) {
		this.checkInTime = checkInTime;
	}
	public void setCheckOutTime(Date checkOutTime) {
		this.checkOutTime = checkOutTime;
	}
	public void setBookGuest(String bookGuest) {
		this.bookGuest = bookGuest;
	}
	public void setBookPhone(Long bookPhone) {
		this.bookPhone = bookPhone;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public void setTotalIncome(Float totalIncome) {
		this.totalIncome = totalIncome;
	}
	public void setRealIncome(Float realIncome) {
		this.realIncome = realIncome;
	}
	public void setRoomOrderStatus(RoomOrderStatus roomOrderStatus) {
		this.roomOrderStatus = roomOrderStatus;
	}
}
