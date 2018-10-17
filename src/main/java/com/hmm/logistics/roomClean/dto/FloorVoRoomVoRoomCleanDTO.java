package com.hmm.logistics.roomClean.dto;
import com.hmm.logistics.roomClean.util.RoomCleanState;
import com.hmm.room.util.RoomType;

public class FloorVoRoomVoRoomCleanDTO {
	private String floorName; //楼层
	private String roomNo;	  //房间号码
	private RoomType type;	  //房间类型
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
	public RoomType getType() {
		return type;
	}
	public void setType(RoomType type) {
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
}

/**
 * @SuppressWarnings({ "serial"})
	public static Specification<RoomClean> getWhereClause(final RoomCleanQueryDTO roomCleanQueryDTO) {
		return new Specification<RoomClean>() {
			@Override
			public Predicate toPredicate(Root<RoomClean> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
			
				List<Predicate> predicate = new ArrayList<>();
	
				//房间编号
				if (StringUtils.isNotBlank(roomCleanQueryDTO.getRoomNumber())) {
					predicate.add(criteriaBuilder.like(root.get("roomNumber").as(String.class),
							"%" +roomCleanQueryDTO.getRoomNumber() + "%"));
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
							
				Predicate[] pre = new Predicate[predicate.size()];
				return query.where(predicate.toArray(pre)).getRestriction();
			}
		};
	}
 * */
