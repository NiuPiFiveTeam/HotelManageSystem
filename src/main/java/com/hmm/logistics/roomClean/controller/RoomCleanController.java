package com.hmm.logistics.roomClean.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.common.beans.BeanUtils;
import com.hmm.common.web.ExtAjaxResponse;
import com.hmm.common.web.ExtjsPageRequest;
import com.hmm.logistics.roomClean.dto.FloorVoRoomVoRoomCleanDTO;
import com.hmm.logistics.roomClean.entity.RoomClean;
import com.hmm.logistics.roomClean.service.IRoomCleanService;
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
	

	@GetMapping
	public List<FloorVoRoomVoRoomCleanDTO> getPage(ExtjsPageRequest pageRequest){
		
		return roomCleanService.findAllFloorVoRoomVoRoomCleanDTO();
		
	}
	
//	@RequestMapping("/data")
//	public void set() {
//		roomCleanService.set();
//	}
	
	@PutMapping(value="{id}",consumes=MediaType.APPLICATION_JSON_VALUE)
	public ExtAjaxResponse update(@PathVariable("id") Long myId,@RequestBody RoomClean dto) {
		try {
			System.out.println(myId);
			RoomClean entity=roomCleanService.findById(myId);
			if(entity!=null) {
				BeanUtils.copyProperties(dto, entity);
				roomCleanService.save(entity);
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
		return RoomState.NEEDCLEAN.toString();
	
	}
	
}
