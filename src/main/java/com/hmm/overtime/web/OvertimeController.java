package com.hmm.overtime.web;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hmm.employee.service.EmployeeService;
import com.hmm.overtime.service.OvertimeService;





@Controller
@RequestMapping("overtime")
public class OvertimeController {
	@Autowired
	private OvertimeService overtimeServiceImpl;
	
	@Autowired
	private EmployeeService employServiceImpl;
	
	private static final Logger logger = LoggerFactory.getLogger(OvertimeController.class);

}
