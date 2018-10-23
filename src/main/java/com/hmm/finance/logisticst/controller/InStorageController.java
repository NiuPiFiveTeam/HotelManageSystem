package com.hmm.finance.logisticst.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
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
import com.hmm.finance.logisticst.domain.InStorageDetailedDTO;
import com.hmm.finance.logisticst.service.IInStorageService;
import com.hmm.finance.salary.domain.SalaryOrderDTO;
import com.hmm.logistics.stock.service.IInDetailedService;

@RestController
@RequestMapping(value="/inStorage")
public class InStorageController {
	@Autowired
	private IInStorageService inStorageService;
	@Autowired
	private EmployeeService employServiceImpl;
	
	@RequestMapping("findCompleteInStorage")
	public Page<InStorageDTO> findCompleteInStorage(ExtjsPageRequest pageable){
		Page<InStorageDTO> page = null;
		try {
			page = inStorageService.findCompleteInStorage(pageable.getPageable());
		}catch(Exception e) {
			e.printStackTrace();
		}
		return page;
	}
	
	
	
	@RequestMapping(value = "/showInStorageDetailed")
    public Page<InStorageDetailedDTO> findAllinStorageDetailed(String inStorageId,ExtjsPageRequest pageable) {
		Page<InStorageDetailedDTO> page = null;
		try {
			page = inStorageService.findInStorageDetailedByInStorageId(inStorageId,pageable.getPageable());
		}catch(Exception e) {
			e.printStackTrace();
		}
		return page;
    }
	
/*-------------------------------------流程引擎web层------------------------------------------*/
	@RequestMapping(value = "/start/{inStorageId}")
    public ExtAjaxResponse start(@PathVariable String inStorageId) {
    	try {
    		inStorageService.startWorkflow(inStorageId);
    		return new ExtAjaxResponse(true,"成功！");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"失败！");
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
		return new PageImpl<InStorageDTO>(list,pageable.getPageable(),list!=null?list.size():0);
	}
	
	/**
     	* 签收任务
     */
    @RequestMapping(value = "claim/{id}")
    public @ResponseBody ExtAjaxResponse claim(@PathVariable("id") String taskId, HttpSession session) {
    	try{
    		String userName = SessionUtil.getUserName(session);
    		if(userName != null) {
    			inStorageService.claim(taskId, userName);
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
