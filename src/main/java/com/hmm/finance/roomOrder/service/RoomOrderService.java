package com.hmm.finance.roomOrder.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.hmm.finance.roomOrder.domain.RoomOrder;
import com.hmm.finance.roomOrder.repository.RoomOrderRepository;

@Service
@Transactional							 
public class RoomOrderService implements IRoomOrderService{
	@Autowired
	private RoomOrderRepository roomOrderRepository;
	
	@Override
	public void save(String[] dataArray) {
		RoomOrder roomOrder = new RoomOrder();
		try {
			roomOrder.setBookRoomNo(Long.parseLong(dataArray[0]));
			roomOrder.setRoomType(dataArray[1]);
			roomOrder.setBooksource(dataArray[2]);
			roomOrder.setRoomPrice(Float.parseFloat(dataArray[3]));
			DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
			roomOrder.setCheckInTime(format.parse(dataArray[4]));
			roomOrder.setCheckOutTime(format.parse(dataArray[5]));
			roomOrder.setBookGuest(dataArray[6]);
			if(!"无".equals(dataArray[7]))
				roomOrder.setBookPhone(Long.parseLong(dataArray[7]));
			roomOrder.setRemark(dataArray[8]);
			roomOrderRepository.save(roomOrder);
		} catch (ParseException e) {
			e.printStackTrace();
		}

	}

	@Override
	public Page<RoomOrder> findAll(Specification<RoomOrder> spec, Pageable pageable) {
		return roomOrderRepository.findAll(spec, pageable);
	}
	
}
