package com.hmm.finance.logisticst.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.activiti.engine.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.activiti.domain.ProcessStatus;
import com.hmm.activiti.util.WorkflowVariable;
import com.hmm.common.SessionUtil;
import com.hmm.common.web.ExtAjaxResponse;
import com.hmm.common.web.ExtjsPageRequest;
import com.hmm.employee.entity.Employee;
import com.hmm.employee.service.EmployeeService;
import com.hmm.finance.logisticst.domain.InStorage;
import com.hmm.finance.logisticst.domain.InStorageDTO;
import com.hmm.finance.logisticst.service.IInStorageService;

@RestController
@RequestMapping(value="/inStorage")
public class InStorageController {
	@Autowired
	private IInStorageService inStorageService;
	
	@Autowired
	private EmployeeService employServiceImpl;
	
	private TaskService taskService;  
	@PostMapping
    public ExtAjaxResponse save(HttpSession session,@RequestBody InStorage inStorage) {
    	try {
    		String userId = SessionUtil.getUserName(session);
    		if(userId != null) {
    			Employee employee = employServiceImpl.findByEmpName(userId);
    			inStorage.setEmployee(employee);
    			inStorage.setProcessStatus(ProcessStatus.NEW);
    			inStorageService.save(inStorage);
    		}
    		return new ExtAjaxResponse(true,"保存成功!");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"保存失败!");
	    }
    }
	
/*-------------------------------------流程引擎web层------------------------------------------*/
	
	@RequestMapping(value = "/start")
    public ExtAjaxResponse start() {
    	try {
    		String employeeId = "user3";
    		Map<String, Object> variables = new HashMap<String, Object>();
    		variables.put("applyUserId", employeeId);
    		inStorageService.startWorkflow(employeeId,"1", variables);
    		return new ExtAjaxResponse(true,"操作成功!");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"操作失败!");
	    }
    }
	
	@RequestMapping(value = "/tasks")
	public Page<InStorageDTO> findTodoTasks(HttpSession session,ExtjsPageRequest pageable){
		List<InStorageDTO> list = null;
		try {
			String userName = SessionUtil.getUserName(session);
			list = inStorageService.findTodoTasks(userName, pageable.getPageable());
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
     * 签收任务
     */
    @RequestMapping(value = "claim/{id}")
    public ExtAjaxResponse claim(@PathVariable("id") String taskId, HttpSession session) {
    	try{
    		String userId = SessionUtil.getUserName(session);
    		if(userId != null) {
    			Employee employee = employServiceImpl.findByEmpName(userId);
    			inStorageService.claim(taskId, employee.getEmpName());
    		}	
	    	return new ExtAjaxResponse(true,"任务签收成功!");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"任务签收失败!");
	    }
    }
    
    /**
     * 完成任务
     * @param id
     * @return
     */
    @RequestMapping(value = "complete/{id}")
    public @ResponseBody ExtAjaxResponse complete(@PathVariable("id") String taskId, WorkflowVariable var) {
    	try{		
    		Map<String, Object> variables = var.getVariableMap();
    		System.out.println(variables);
    		inStorageService.complete(taskId, variables);
	    	return new ExtAjaxResponse(true,"审批成功!");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"审批失败!");
	    }
    }
}
