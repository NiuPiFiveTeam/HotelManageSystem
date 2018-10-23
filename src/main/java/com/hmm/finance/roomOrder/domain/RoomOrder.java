package com.hmm.finance.roomOrder.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hmm.guest.entity.Guest;

@Entity
@Table(name="t_room_order")
public class RoomOrder {
	private Long bookRoomNo;
	private String roomType;
	private String booksource;
	private Float roomPrice;
	private Date checkInTime;
	private Date checkOutTime;
	private String bookGuest;
	private Long bookPhone;
	private String remark;
	private Float totalAmout;//总收入
//	1. bookRoomNo : 房间订单号   20181022161752
//	 *  2. roomType ：房间类型  单人房
//	 *  'booksource':订单来源,  到店订房
//    *   'roomPrice':房价, 100
//    *   'checkInTime':入住时间,  2018-10-22 16:17:47
//    *  'checkOutTime':退房时间, 2018-10-23 12:00:00
//    *   'bookGuest':预定人,  非预定
//    *  'bookPhone':预定号码, 无
//    *   'remark':备注,
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getBookRoomNo() {
		return bookRoomNo;
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
	@JsonFormat(pattern="yyyy/MM/dd",timezone="GMT+8")
	public Date getCheckInTime() {
		return checkInTime;
	}
	@JsonFormat(pattern="yyyy/MM/dd",timezone="GMT+8")
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
	public Float getTotalAmout() {
		return totalAmout;
	}
	public void setBookRoomNo(Long bookRoomNo) {
		this.bookRoomNo = bookRoomNo;
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
	public void setTotalAmout(Float totalAmout) {
		this.totalAmout = totalAmout;
	}
	@Override
	public String toString() {
		return "RoomOrder [bookRoomNo=" + bookRoomNo + ", roomType=" + roomType + ", booksource=" + booksource
				+ ", roomPrice=" + roomPrice + ", checkInTime=" + checkInTime + ", checkOutTime=" + checkOutTime
				+ ", bookGuest=" + bookGuest + ", bookPhone=" + bookPhone + ", remark=" + remark + ", totalAmout="
				+ totalAmout + "]";
	}
	
}
