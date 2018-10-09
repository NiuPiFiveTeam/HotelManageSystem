package com.hmm.travel.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hmm.employee.service.EmployeeService;
import com.hmm.travel.service.TravelService;



@Controller
@RequestMapping("travel")
public class TravelController {
	@Autowired
	private TravelService travelServiceImpl;
	
	@Autowired
	private EmployeeService employServiceImpl;
	
	private static final Logger logger = LoggerFactory.getLogger(TravelController.class);
}
