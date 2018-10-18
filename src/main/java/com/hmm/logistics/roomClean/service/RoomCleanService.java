package com.hmm.logistics.roomClean.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hmm.common.web.ExtjsPageRequest;
import com.hmm.logistics.roomClean.entity.FloorVoRoomVoRoomClean;
import com.hmm.logistics.roomClean.entity.RoomClean;
import com.hmm.logistics.roomClean.repository.FloorVoRoomVoRoomCleanRepository;
import com.hmm.logistics.roomClean.repository.RoomCleanRepository;
import com.hmm.logistics.roomClean.util.RoomCleanState;
import com.hmm.room.entity.Floor;
import com.hmm.room.entity.Room;
import com.hmm.room.repository.RoomRepository;
import com.hmm.room.util.RoomType;

/**
 * 
* @Title: RoomCleanService.java
* @Package com.hmm.logistics.roomClean.service
* @Description: TODO(业务流程，调用repository进行业务)
* @author DJDU
* @date 2018年10月8日
* @version V1.0
 */



@Service
@Transactional
public class RoomCleanService implements IRoomCleanService{
	@Autowired
	private RoomCleanRepository roomCleanRepository;
	@Autowired
	private RoomRepository roomRepository;
	@Autowired
	private FloorVoRoomVoRoomCleanRepository floorVoRoomVoRoomCleanDTORepository;
	
	@Override
	public RoomClean save(RoomClean entity) {
		return roomCleanRepository.save(entity);
	}

	@Override
	@Transactional(readOnly=true)
	public long count() {
		// TODO Auto-generated method stub
		return roomCleanRepository.count();
	}

	@Override
	@Transactional(readOnly=true)
	public Page<RoomClean> findAll(Specification<RoomClean> spec, Pageable pageable) {
		// TODO Auto-generated method stub
		return roomCleanRepository.findAll(spec, pageable);
	}

	@Override
	public void deleteById(Long id) {
		// TODO Auto-generated method stub
		roomCleanRepository.deleteById(id);
		
	}

	@Override
	@Transactional(readOnly=true)
	public RoomClean findById(Long id) {
		// TODO Auto-generated method stub
		return roomCleanRepository.findById(id).get();
	}

	//设置FloorVoRoomVoRoomClean表
	@Override
	public void saveAllFloorVoRoomVoRoomCleanDTO() {
		// 先存数据后查询
		List<FloorVoRoomVoRoomClean> floorVoRoomVoRoomCleanDTO = new ArrayList<FloorVoRoomVoRoomClean>();
		List<Room> rooms = (List<Room>)roomRepository.findAll();
		for(Room room:rooms) {
			//System.out.println(room.getFloorNode().getFloorName());
			FloorVoRoomVoRoomClean floorVoRoomVoRoomClean=new FloorVoRoomVoRoomClean();

			Floor floor=room.getFloorNode();//获取楼层记录
			RoomClean roomClean=roomCleanRepository.findByRoomId(room.getRoomId());//获取房间清洁服务记录
		
			floorVoRoomVoRoomClean.setFloorName(floor.getFloorName());
			floorVoRoomVoRoomClean.setRoomNo(room.getRoomNo());
			floorVoRoomVoRoomClean.setRoomOther(roomClean.getRoomOther());
			
			if(room.getType()==RoomType.DOUBLEROOM) {
				floorVoRoomVoRoomClean.setType("双人房");
			}
			else if(room.getType()==RoomType.HOURROOM) {
				floorVoRoomVoRoomClean.setType("钟点房");
			}
			else if(room.getType()==RoomType.SINGLEROOM) {
				floorVoRoomVoRoomClean.setType("单人房");
			}
			else if(room.getType()==RoomType.TRIPLEROOM) {
				floorVoRoomVoRoomClean.setType("三人房");
			}
			
			if(roomClean.getRoomCleanState()==RoomCleanState.CLEAN) {
				floorVoRoomVoRoomClean.setRoomCleanState("退房清洁");
			}
			else if(roomClean.getRoomCleanState()==RoomCleanState.CLEANING) {
				floorVoRoomVoRoomClean.setRoomCleanState("清洁中");
			}
			else if(roomClean.getRoomCleanState()==RoomCleanState.SERVICE) {
				floorVoRoomVoRoomClean.setRoomCleanState("客房服务");
			}
			else if(roomClean.getRoomCleanState()==RoomCleanState.SERVICING) {
				floorVoRoomVoRoomClean.setRoomCleanState("服务中");
			}
			else if(roomClean.getRoomCleanState()==RoomCleanState.WAITING) {
				floorVoRoomVoRoomClean.setRoomCleanState("等待中");
				//continue;
			}
			floorVoRoomVoRoomCleanDTO.add(floorVoRoomVoRoomClean);
		}
		for(FloorVoRoomVoRoomClean floorVoRoomVoRoomClean:floorVoRoomVoRoomCleanDTO) {
			floorVoRoomVoRoomCleanDTORepository.save(floorVoRoomVoRoomClean);
		}
	}

	
	
	@Override
	public RoomClean findByRoomId(Long roomId) {
		// TODO Auto-generated method stub
		return roomCleanRepository.findByRoomId(roomId);
	}
	
	//设置RoomClean表
	@Override
	public void set() {
		List<Room> rooms = (List<Room>) roomRepository.findAll();
		for(Room room:rooms) {
			RoomClean rc=new RoomClean();
			rc.setRoom(room);
			rc.setRoomOther("无");
			rc.setRoomCleanState(RoomCleanState.WAITING);
			save(rc);
		}
	}

	@Override
	public Page<FloorVoRoomVoRoomClean> findAllFloorVoRoomVoRoomCleanDTO(Specification<FloorVoRoomVoRoomClean> spec,
			ExtjsPageRequest pageRequest) {
		// TODO Auto-generated method stub
		return floorVoRoomVoRoomCleanDTORepository.findAll(spec, pageRequest.getPageable());
	}
}
