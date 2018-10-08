package com.hmm.logistics.roomClean.entity;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;

/**
 * 
* @Title: RoomCleanQueryDTO.java
* @Package com.hmm.logistics.roomClean.entity
* @Description: TODO(客房内务DTO，用于与前端数据交互)
* @author DJDU
* @date 2018年10月8日
* @version V1.0
 */
public class RoomCleanQueryDTO {
	private int roomNumber;//房间编号
	private String floor;//楼层
	private String roomState;//房间状态
	private String roomType;//房间类型
	private String roomOther;//备注
	@DateTimeFormat(pattern="yyyy/MM/dd HH:mm:ss")  
	private Date roomDate;//清洁日期
	private String roomWorker;//清洁人员
	
	public String getFloor() {
		return floor;
	}
	public int getRoomNumber() {
		return roomNumber;
	}
	public String getRoomState() {
		return roomState;
	}
	public String getRoomType() {
		return roomType;
	}
	
	public Date getRoomDate() {
		return roomDate;
	}
	public String getRoomWorker() {
		return roomWorker;
	}
	public String getRoomOther() {
		return roomOther;
	}
	
	
	
	public void setFloor(String floor) {
		this.floor = floor;
	}
	public void setRoomNumber(int roomNumber) {
		this.roomNumber = roomNumber;
	}
	public void setRoomState(String roomState) {
		this.roomState = roomState;
	}
	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}
	public void setRoomDate(Date roomDate) {
		this.roomDate = roomDate;
	}
	public void setRoomWorker(String roomWorker) {
		this.roomWorker = roomWorker;
	}
	public void setRoomOther(String roomOther) {
		this.roomOther = roomOther;
	}
	
	@SuppressWarnings({ "serial"})
	public static Specification<RoomClean> getWhereClause(final RoomCleanQueryDTO roomCleanQueryDTO) {
		return new Specification<RoomClean>() {
			@Override
			public Predicate toPredicate(Root<RoomClean> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
			
				List<Predicate> predicate = new ArrayList<>();
	
				//房间编号
	   			if (0!=roomCleanQueryDTO.getRoomNumber()) {
				predicate.add(criteriaBuilder.greaterThanOrEqualTo(root.get("roomNumber").as(int.class),
				roomCleanQueryDTO.getRoomNumber()));
				}
	   			
	   			//楼层
				if (StringUtils.isNotBlank(roomCleanQueryDTO.getFloor())) {
					predicate.add(criteriaBuilder.like(root.get("floor").as(String.class),
							"%" +roomCleanQueryDTO.getFloor() + "%"));
				}
	   			
	   			//房间状态
				//StringUtils.isNotBlank(）等价于 str != null && str.length > 0 && str.trim().length > 0
				if (StringUtils.isNotBlank(roomCleanQueryDTO.getRoomState())) {
					predicate.add(criteriaBuilder.like(root.get("roomState").as(String.class),
							"%" + roomCleanQueryDTO.getRoomState() + "%"));
				}
				//房间类型
				if (StringUtils.isNotBlank(roomCleanQueryDTO.getRoomType())) {
					predicate.add(criteriaBuilder.like(root.get("roomType").as(String.class),
							"%" + roomCleanQueryDTO.getRoomType() + "%"));
				}
				//备注
				if (StringUtils.isNotBlank(roomCleanQueryDTO.getRoomOther())) {
					predicate.add(criteriaBuilder.like(root.get("roomOther").as(String.class),
							"%" + roomCleanQueryDTO.getRoomOther() + "%"));
				}
	
				//清洁日期
				if (null!=roomCleanQueryDTO.getRoomDate()) {
					predicate.add(criteriaBuilder.greaterThanOrEqualTo(root.get("roomDate").as(Date.class),
							roomCleanQueryDTO.getRoomDate()));
				}
				
				//清洁人员
				if (StringUtils.isNotBlank(roomCleanQueryDTO.getRoomWorker())) {
					predicate.add(criteriaBuilder.like(root.get("roomWorker").as(String.class),
							"%" + roomCleanQueryDTO.getRoomWorker() + "%"));
				}
							
				Predicate[] pre = new Predicate[predicate.size()];
				return query.where(predicate.toArray(pre)).getRestriction();
			}
		};
	}
	
}
