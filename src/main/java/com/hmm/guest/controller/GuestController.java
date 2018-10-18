package com.hmm.guest.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.guest.dto.GuestInfoDto;
import com.hmm.guest.entity.Guest;
import com.hmm.guest.service.GuestService;
import com.hmm.guest.service.IGuestService;
import com.hmm.guest.util.Gender;
import com.hmm.guest.util.GuestState;
import com.hmm.room.entity.Room;

@RestController
@RequestMapping("/guest")
public class GuestController {

	@Autowired
	private IGuestService guestService;
	
	@RequestMapping("/findGuestByIdCard")
	public @ResponseBody GuestInfoDto findGuestByIdCard(@RequestParam("cardNumber") String cardNumber) {
		
		Guest guest = guestService.findGuestByIdCard(cardNumber);
		if (guest == null) {
			return null;
		}else {
			GuestInfoDto guestInfoDto = new GuestInfoDto();
			Room room = guest.getRoom();
			System.out.println(room);
			BeanUtils.copyProperties(guest, guestInfoDto);
			guestInfoDto.setGuestState(guest.getState());
			BeanUtils.copyProperties(room, guestInfoDto);
			guestInfoDto.setRoomState(room.getState());
			System.out.println(guestInfoDto);
			return guestInfoDto;
		}
	}
	
	/**
	 *  保存客人信息
	 * @return
	 */
	@RequestMapping("/saveGuest")
	public String saveGuest(@RequestParam("guestList") String[] guestList) {
		GuestInfoDto guestInfoDto = new GuestInfoDto();
		
		for (String string : guestList) {
			System.out.println(string);
		}
		
//		String idcard = guestList[0].substring(12).replace("\"", "");
//		Guest guest = guestService.findGuestByIdCard(idcard);
//		
//		if (guest == null) {
//			guestInfoDto.setIdCard(idcard);
//			guestInfoDto.setRealName(guestList[1].substring(12).replace("\"", ""));
//			guestInfoDto.setAddress(guestList[2].substring(11).replace("\"", ""));
//			guestInfoDto.setPhone(guestList[3].substring(9).replace("\"", ""));
//			if (guestList[4].substring(9).replace("\"", "").equals("男性")) {
//				guestInfoDto.setGender(Gender.MALE);
//			}else {
//				guestInfoDto.setGender(Gender.FEMALE);
//			}
//			guestInfoDto.setGuestState(GuestState.CASUAL); //临时客人
//			SimpleDateFormat simple = new SimpleDateFormat("yyyy-MM-dd");
//			try {
//				Date da = simple.parse(guestList[6].substring(15).replace("\"", ""));
//				guestInfoDto.setRegisterTime(da);
//			} catch (ParseException e) {
//				e.printStackTrace();
//			}
//		}
//		
//		
//		System.out.println(guestInfoDto);
		
		return null;
	}
}
