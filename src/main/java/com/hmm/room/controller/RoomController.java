package com.hmm.room.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoomController {
	//到此一游
	//到此一游+1
	//到此一游+2
	private Logger logger = LoggerFactory.getLogger(this.getClass()); 
	
	
	@RequestMapping("/room")
	public String getRoom() {
		logger.info("nihao");
		return "room";
	}
	
	
}
