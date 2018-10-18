package com.hmm.logistics.roomClean.dto;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import com.hmm.logistics.roomClean.entity.FloorVoRoomVoRoomClean;

public class FloorVoRoomVoRoomCleanDTO {
	private String floorName; //楼层
	private String roomNo;	  //房间号码
	private String type;	  //房间类型
	private String roomCleanState;//房间服务状态
	private String roomOther; //房间备注
	
	public String getFloorName() {
		return floorName;
	}
	public void setFloorName(String floorName) {
		this.floorName = floorName;
	}
	public String getRoomNo() {
		return roomNo;
	}
	public void setRoomNo(String roomNo) {
		this.roomNo = roomNo;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getRoomCleanState() {
		return roomCleanState;
	}
	public void setRoomCleanState(String roomCleanState) {
		this.roomCleanState = roomCleanState;
	}
	public String getRoomOther() {
		return roomOther;
	}
	public void setRoomOther(String roomOther) {
		this.roomOther = roomOther;
	}
	@SuppressWarnings({ "serial"})
	public static Specification<FloorVoRoomVoRoomClean> getWhereClause(final FloorVoRoomVoRoomCleanDTO floorVoRoomVoRoomCleanDTO) {
		return new Specification<FloorVoRoomVoRoomClean>() {
			@Override
			public Predicate toPredicate(Root<FloorVoRoomVoRoomClean> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
			
				List<Predicate> predicate = new ArrayList<>();
				
				if (StringUtils.isNotBlank(floorVoRoomVoRoomCleanDTO.getRoomCleanState())) {
					predicate.add(criteriaBuilder.like(root.get("roomCleanState").as(String.class),
							"%" + floorVoRoomVoRoomCleanDTO.getRoomCleanState() + "%"));}
				if (StringUtils.isNotBlank(floorVoRoomVoRoomCleanDTO.getRoomNo())) {
					predicate.add(criteriaBuilder.like(root.get("roomNo").as(String.class),
							"%" + floorVoRoomVoRoomCleanDTO.getRoomNo() + "%"));}
				if (StringUtils.isNotBlank(floorVoRoomVoRoomCleanDTO.getType())) {
					predicate.add(criteriaBuilder.like(root.get("type").as(String.class),
							"%" + floorVoRoomVoRoomCleanDTO.getType() + "%"));}
						
				Predicate[] pre = new Predicate[predicate.size()];
				return query.where(predicate.toArray(pre)).getRestriction();
			}
		};
	}
}

/**
 * 
 * */
