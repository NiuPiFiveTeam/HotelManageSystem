package com.hmm.finance.roomOrder.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.transaction.Transactional;

import org.activiti.engine.identity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.hmm.employee.dao.EmployeeDao;
import com.hmm.employee.entity.Employee;
import com.hmm.finance.roomOrder.domain.RoomOrder;
import com.hmm.finance.roomOrder.repository.RoomOrderRepository;
import com.hmm.finance.roomOrder.util.RoomOrderStatus;

@Service
@Transactional							 
public class RoomOrderService implements IRoomOrderService{
	@Autowired
	private RoomOrderRepository roomOrderRepository;
	@Autowired
	private EmployeeDao employeeDao;
	
	
	@Override
	public void save(String[] dataArray,User user) {
		RoomOrder roomOrder = new RoomOrder();
		try {
			String userId = user.getId();
			Employee employee = employeeDao.findByUserName(userId);
			
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
		
			roomOrder.setRoomOrderStatus(RoomOrderStatus.CHECKIN);
			roomOrder.setTotalIncome(Math.abs(Float.parseFloat(dataArray[9])));
			roomOrder.setShouldIncome(Float.parseFloat(dataArray[10]));
			roomOrder.setRoomNo(Long.parseLong(dataArray[11]));
			roomOrder.setEmployee(employee);
			roomOrderRepository.save(roomOrder);
		} catch (ParseException e) {
			e.printStackTrace();
		}

	}

	@Override
	public Page<RoomOrder> findAll(Specification<RoomOrder> spec, Pageable pageable) {
		return roomOrderRepository.findAll(spec, pageable);
	}

	@Override
	public List<RoomOrder> findByRoomNo(String roomNo) {
		return roomOrderRepository.findByRoomNo(Long.parseLong(roomNo));
	}

	@Override
	public void save2(String bookRoomNo, User user) {
		String userId = user.getId();
		Employee employee = employeeDao.findByUserName(userId);
		RoomOrder roomOrder = roomOrderRepository.findById(Long.parseLong(bookRoomNo)).get();
		roomOrder.setRealIncome(roomOrder.getTotalIncome()-100);
		roomOrder.setEmployee(employee);
		roomOrder.setRoomOrderStatus(RoomOrderStatus.CHECKOUT);
//			roomOrder.setBookRoomNo(Long.parseLong(dataArray[0]));
//
//			roomOrder.setEmployee(employee);
//			roomOrderRepository.save(roomOrder);
	}
	
}
