package com.hmm.finance.roomOrder.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hmm.employee.entity.Employee;
import com.hmm.finance.roomOrder.util.RoomOrderStatus;

@Entity
@Table(name="t_room_order")
public class RoomOrder {
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
	public Float getShouldIncome() {
		return shouldIncome;
	}
	public void setShouldIncome(Float shouldIncome) {
		this.shouldIncome = shouldIncome;
	}
	private Float shouldIncome;//应收
	
	private Employee employee;
	private RoomOrderStatus roomOrderStatus;
	@OneToOne
	@JoinColumn(name="employeeId")
	public Employee getEmployee() {
		return employee;
	}
	@Enumerated(EnumType.STRING)
	public RoomOrderStatus getRoomOrderStatus() {
		return roomOrderStatus;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	public void setRoomOrderStatus(RoomOrderStatus roomOrderStatus) {
		this.roomOrderStatus = roomOrderStatus;
	}


	public Long getRoomNo() {
		return RoomNo;
	}
	public void setRoomNo(Long roomNo) {
		RoomNo = roomNo;
	}
	@Id
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
	public Float getTotalIncome() {
		return totalIncome;
	}
	public Float getRealIncome() {
		return realIncome;
	}
	public void setTotalIncome(Float totalIncome) {
		this.totalIncome = totalIncome;
	}
	public void setRealIncome(Float realIncome) {
		this.realIncome = realIncome;
	}

	
}
