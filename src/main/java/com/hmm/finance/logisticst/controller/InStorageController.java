package com.hmm.finance.logisticst.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.activiti.util.WorkflowVariable;
import com.hmm.common.web.ExtAjaxResponse;
import com.hmm.common.web.ExtjsPageRequest;
import com.hmm.finance.logisticst.domain.InStorage;
import com.hmm.finance.logisticst.domain.InStorageDTO;
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
    public ExtAjaxResponse start() {
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
	
	@RequestMapping(value = "/tasks")
	public Page<InStorageDTO> findTodoTasks(ExtjsPageRequest pageable){
		Page<InStorageDTO> page = new PageImpl<InStorageDTO>(new ArrayList<InStorageDTO>(),pageable.getPageable(),0);
		try {
			page = inStorageService.findTodoTasks("user4", pageable.getPageable());
		}catch(Exception e) {
			e.printStackTrace();
		}
		return page;
	}
	
	/**
     * 签收任务
     */
    @RequestMapping(value = "claim/{id}")
    public ExtAjaxResponse claim(@PathVariable("id") String taskId) {
    	try{
    		inStorageService.claim(taskId, "user4");
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
