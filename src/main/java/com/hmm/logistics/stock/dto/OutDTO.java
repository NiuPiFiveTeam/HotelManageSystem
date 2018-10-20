package com.hmm.logistics.stock.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;

import com.hmm.logistics.stock.entity.OutStorage;

public class OutDTO {
	private int id;
	private String roomNo;
	private String reason;
	@DateTimeFormat(pattern="yyyy/MM/dd HH:mm:ss") 
	private Date outDate;
	private String worker;
	@DateTimeFormat(pattern="yyyy/MM/dd HH:mm:ss")
	private Date createOutTimeStart;
	@DateTimeFormat(pattern="yyyy/MM/dd HH:mm:ss")
	private Date createOutTimeEnd;
	

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getRoomNo() {
		return roomNo;
	}
	public void setRoomNo(String roomNo) {
		this.roomNo = roomNo;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public Date getOutDate() {
		return outDate;
	}
	public void setOutDate(Date outDate) {
		this.outDate = outDate;
	}
	public String getWorker() {
		return worker;
	}
	public void setWorker(String worker) {
		this.worker = worker;
	}
	public Date getCreateOutTimeStart() {
		return createOutTimeStart;
	}
	public void setCreateOutTimeStart(Date createOutTimeStart) {
		this.createOutTimeStart = createOutTimeStart;
	}
	public Date getCreateOutTimeEnd() {
		return createOutTimeEnd;
	}
	public void setCreateOutTimeEnd(Date createOutTimeEnd) {
		this.createOutTimeEnd = createOutTimeEnd;
	}
	@SuppressWarnings({ "serial"})
	public static Specification<OutStorage> getWhereClause(final OutDTO outDTO) {
		return new Specification<OutStorage>() {
			@Override
			public Predicate toPredicate(Root<OutStorage> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
			
				List<Predicate> predicate = new ArrayList<>();
				
				
				Predicate[] pre = new Predicate[predicate.size()];
				return query.where(predicate.toArray(pre)).getRestriction();
			}
		};
	}
}
