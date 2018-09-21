package com.hmm.finance.logisticst.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.common.web.ExtAjaxResponse;
import com.hmm.finance.logisticst.domain.InStorage;
import com.hmm.finance.logisticst.service.IInStorageService;

@RestController
@RequestMapping(value="/inStorage")
public class InStorageController {
	@Autowired
	private IInStorageService inStorageService;
	
	private TaskService taskService;  
	@PostMapping
    public ExtAjaxResponse save() {
    	try {
    		InStorage inStorage = new InStorage();
    		inStorage.setInStorageId("a1"); 
    		inStorageService.save(inStorage);
    		return new ExtAjaxResponse(true,"保存成功!");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"保存失败!");
	    }
    }
	
/*-------------------------------------流程引擎web层------------------------------------------*/
	
	/**
	 * 启动流程
	 * @param leaveId	请假信息Id
	 * @param session	通过会话获取登录用户(请假人)
	 * @return
	 */
	@RequestMapping(value = "/start")
    public @ResponseBody ExtAjaxResponse start() {
    	try {
    		String employeeId = "admin";
    		Map<String, Object> variables = new HashMap<String, Object>();
    		variables.put("deptLeader", "financeManager");
    		variables.put("applyEmployeeId", employeeId);
    		inStorageService.startWorkflow(employeeId,"a1", variables);
    		return new ExtAjaxResponse(true,"操作成功!");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"操作失败!");
	    }
    }
}
