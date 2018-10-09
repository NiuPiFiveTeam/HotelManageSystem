package com.hmm.Work.web;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.Work.entity.workQueryDTO;
import com.hmm.Work.service.workService;
import com.hmm.employee.service.EmployeeService;

@Controller
@RequestMapping("work")
public class workController {
	@Autowired
	private workService workServiceImpl;
	@Autowired
	private EmployeeService employServiceImpl;
	
	private static final Logger logger = LoggerFactory.getLogger(workController.class);
	
	@PostMapping()
	public String saveWork(@RequestBody workQueryDTO work) {
		try {
//			employServiceImpl.f
//			workServiceImpl.save(work);
//			return 
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}

	
	
	
	

}
