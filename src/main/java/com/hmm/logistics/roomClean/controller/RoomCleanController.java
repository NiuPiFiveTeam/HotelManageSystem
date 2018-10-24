package com.hmm.logistics.roomClean.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.activiti.engine.impl.util.json.JSONArray;
import org.activiti.engine.impl.util.json.JSONObject;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.common.SessionUtil;
import com.hmm.common.beans.BeanUtils;
import com.hmm.common.web.ExtAjaxResponse;
import com.hmm.common.web.ExtjsPageRequest;
import com.hmm.employee.service.EmployeeService;
import com.hmm.logistics.roomClean.dto.FloorVoRoomVoRoomCleanDTO;
import com.hmm.logistics.roomClean.entity.FloorVoRoomVoRoomClean;
import com.hmm.logistics.roomClean.entity.RoomClean;
import com.hmm.logistics.roomClean.entity.RoomCleanRecord;
import com.hmm.logistics.roomClean.repository.RoomCleanRecordRepository;
import com.hmm.logistics.roomClean.service.IRoomCleanService;
import com.hmm.logistics.roomClean.util.RoomCleanState;
import com.hmm.logistics.stock.entity.InDetailed;
import com.hmm.logistics.stock.entity.OutDetailed;
import com.hmm.logistics.stock.entity.OutStorage;
import com.hmm.logistics.stock.repository.OutDetailedRepository;
import com.hmm.logistics.stock.repository.OutStorageRepository;
import com.hmm.room.repository.RoomRepository;
import com.hmm.room.util.RoomState;

/**
 * 
* @Title: RoomCleanController.java
* @Package com.hmm.logistics.roomClean.controller
* @Description: TODO(客房内务控制类，用于与前端交互)
* @author DJDU
* @date 2018年10月8日
* @version V1.0
 */

@RestController
@RequestMapping("roomClean")
public class RoomCleanController { 
	@Autowired
	private IRoomCleanService roomCleanService;
	@Autowired
	private RoomRepository roomRepository;
	@Autowired
	private RoomCleanRecordRepository roomCleanRecordService;
	@Autowired
	private EmployeeService employeeService;
	@Autowired
	private OutStorageRepository OutStorageService;
	@Autowired
	private OutDetailedRepository OutDetailedService;
	//先更新，后查询
	@GetMapping
		public Page<FloorVoRoomVoRoomClean> getPages(FloorVoRoomVoRoomCleanDTO floorVoRoomVoRoomCleanDTO,ExtjsPageRequest pageRequest){
			roomCleanService.saveAllFloorVoRoomVoRoomCleanDTO();//更新数据
			return roomCleanService.findAllFloorVoRoomVoRoomCleanDTO(FloorVoRoomVoRoomCleanDTO.getWhereClause(floorVoRoomVoRoomCleanDTO), pageRequest);
		}
//	@RequestMapping("/data")
//	public void save() {
//		roomCleanService.saveAllFloorVoRoomVoRoomCleanDTO();
//	}
	
//	@RequestMapping("/data")
//	public void set() {
//		roomCleanService.set();
//	}
	
	@PutMapping(value="{id}",consumes=MediaType.APPLICATION_JSON_VALUE)
	public ExtAjaxResponse update(@PathVariable("id") Long myId,@RequestBody RoomClean dto,HttpSession session) {
		try {
			System.out.println(myId);
			RoomClean entity=roomCleanService.findById(myId);
			if(entity!=null) {
				BeanUtils.copyProperties(dto, entity);
				roomCleanService.save(entity);
			};
			if(dto.getRoomCleanState()==RoomCleanState.WAITING){
				List<RoomCleanRecord> roomCleanRecords=roomCleanRecordService.findByRoomId(entity.getRoom().getRoomId());
				for(RoomCleanRecord roomCleanRecord:roomCleanRecords) {
					if(roomCleanRecord.getRoomWorker()==null) {
						roomCleanRecord.setRoomDate(new Date());
						roomCleanRecord.setRoomWorker(employeeService.findByUserName(SessionUtil.getUserName(session)));
						roomCleanRecordService.save(roomCleanRecord);
					}
				}
			}
			return new ExtAjaxResponse(true,"更新成功！");
		}catch(Exception e) {
			e.printStackTrace();
			return new ExtAjaxResponse(true,"更新失败！");
		}
	}
	/**
	 * 
	 * @param roomNo  房间号
	 * @param selectValue  清洁服务的类型：退房清洁、客房清洁
	 * @param remark 备注
	 * @return  返回房间状态
	 */
	@RequestMapping("/changeRoomState")
	public @ResponseBody String changeRoomState(@RequestParam("roomNo") String roomNo,@RequestParam("selectValue") String selectValue,@RequestParam("remark") String remark) {
		roomCleanService.changeRoomState(roomNo, selectValue, remark);
		System.out.println(roomNo+" "+selectValue);
		if (remark != null) {
			System.out.println(remark);
		}
		return RoomState.NEEDCLEAN.toString();
	
	}
	/**
	 * 
	 * @param roomNo  房间号
	 * @param dailyTagData  请求的日用品
	 * @return  返回房间状态
	 */
	@RequestMapping("/dailyNecessarySupplement")
	public @ResponseBody String dailyNecessarySupplement(@RequestParam("roomNo") String roomNo,@RequestParam("dailyTagData") String dailyTagData) {
		System.out.println(roomNo+" "+dailyTagData);
		roomCleanService.dailyNecessary(roomNo, dailyTagData);
		return RoomState.NEED_DAILY_NECESSITIES.toString();
	
	}
	
}
