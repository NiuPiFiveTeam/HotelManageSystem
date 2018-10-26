package com.hmm.leave.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Id;
import javax.servlet.http.HttpSession;

import org.activiti.engine.IdentityService;
import org.activiti.engine.identity.Group;
import org.activiti.engine.task.Task;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.activiti.domain.ProcessStatus;
import com.hmm.activiti.util.WorkflowVariable;
import com.hmm.common.SessionUtil;
import com.hmm.common.beans.BeanUtils;
import com.hmm.common.web.ExtAjaxResponse;
import com.hmm.common.web.ExtjsPageRequest;
import com.hmm.employee.entity.Employee;
import com.hmm.employee.service.EmployeeService;
import com.hmm.leave.entity.Leave;
import com.hmm.leave.entity.LeaveDTO;
import com.hmm.leave.entity.LeaveEmpDTO;
import com.hmm.leave.entity.LeaveQueryDTO;
import com.hmm.leave.service.ILeaveService;





@RestController
@RequestMapping(value="/leave")
public class LeaveController 
{
	@Autowired
	private ILeaveService leaveService;
	
	@Autowired
	private EmployeeService employServiceimpl;
	
	@Autowired
    private IdentityService identityService;
	
	@PostMapping
    public @ResponseBody ExtAjaxResponse save(HttpSession session,@RequestBody LeaveEmpDTO dto) {
    	try {
    		String userId = SessionUtil.getUserName(session);
    		if(userId != null) {
    			Leave leave = new Leave();
    			LeaveEmpDTO.dtoToEntity(dto, leave);
    			Employee employ = employServiceimpl.findByUserName(userId);
    			leave.setEmploy(employ);
    			leave.setUserId(userId);
    			leave.setProcessStatus(ProcessStatus.NEW);
    			leaveService.save(leave);
    		}
    		
    		return new ExtAjaxResponse(true,"操作成功!");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"操作失败!");
	    }
    }
	
	@PutMapping(value="id")
    public @ResponseBody ExtAjaxResponse update(@PathVariable("id") Long id ,@RequestBody LeaveEmpDTO dto) {
    	try {
    		Leave leave2 = leaveService.findOne(id);
    		if(leave2 != null) {
    			BeanUtils.copyProperties(dto, leave2);//使用自定义的BeanUtils
				leaveService.save(leave2);
    		}
    		
    		return new ExtAjaxResponse(true,"操作成功!");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"操作失败!");
	    }
    }
	
	@DeleteMapping(value="{id}")
    public @ResponseBody ExtAjaxResponse delete(@PathVariable("id") Long id) {
    	try {
    		Leave leave = leaveService.findOne(id);
    		if(leave != null) {
    			leaveService.delete(id);
    		}
    		
    		return new ExtAjaxResponse(true,"操作成功!");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"操作失败!");
	    }
    }
	
	
	@PostMapping("/deletes")
	public ExtAjaxResponse deleteRows(@RequestParam(name="ids") Long[] ids) 
	{
		try {
			if(ids!=null) {
				leaveService.deleteAll(ids);
			}
			return new ExtAjaxResponse(true,"批量删除成功！");
		} catch (Exception e) {
			return new ExtAjaxResponse(true,"批量删除失败！");
		}
	}
	
	@GetMapping
    public Page<LeaveEmpDTO> findLeaveByUserId(LeaveQueryDTO leaveQueryDTO,HttpSession session,ExtjsPageRequest pageable) 
	{
		Page<LeaveEmpDTO> page;
		String userId = SessionUtil.getUserName(session);
		if(null != userId) {
			List<Group> groupList = identityService.createGroupQuery().groupMember(userId).list();
	        String[] groupNames = new String[groupList.size()];
	        for (int i = 0; i < groupNames.length; i++) {
	            groupNames[i] = groupList.get(i).getId();
	        }
	        
	        String groupName = ArrayUtils.toString(groupNames);
	        System.out.println(groupName);
	        
			if(groupName.indexOf("Manager")!= -1 ) {
				page = leaveService.findAll(LeaveQueryDTO.getWhereClause(leaveQueryDTO), pageable.getPageable());
				
			}else if(groupName.indexOf("Admin")!= -1){
				page = leaveService.findAll(LeaveQueryDTO.getWhereClause(leaveQueryDTO), pageable.getPageable());
			}else {
				leaveQueryDTO.setUserId(SessionUtil.getUserName(session));
				page = leaveService.findAll(LeaveQueryDTO.getWhereClause(leaveQueryDTO), pageable.getPageable());
			}
			return page;
		}else {
			return null;
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
    public @ResponseBody ExtAjaxResponse start(@RequestParam(name="id") Long leaveId,HttpSession session) {
    	try {
    		String userId = SessionUtil.getUserName(session);
    		List<Group> groupListuser = identityService.createGroupQuery().groupMember(userId).list();
    		String[] groupNames = new String[groupListuser.size()];
    		for (int i = 0; i < groupNames.length; i++) {
                groupNames[i] = groupListuser.get(i).getId();
            }
    		String groupUserList = ArrayUtils.toString(groupNames);
    		//System.out.println(groupUserList);
    		if(groupUserList.indexOf("Manager") != -1) {
    			Map<String, Object> variables1 = new HashMap<String, Object>();
    			variables1.put("deptLeader", "Admin");
    			variables1.put("applyUserId", userId);
    			leaveService.startWorkflow(userId,leaveId, variables1);
    			return new ExtAjaxResponse(true,"操作成功!");
    		}else {
    			Employee employ =  employServiceimpl.findByUserName(userId);
    			String managerNo = employ.getDepartmentes().getManagerNo();
    			if(null != managerNo) {
    				String ManagerUserId = employServiceimpl.findByEmpNo(managerNo).getUserName();
    	    		List<Group> groupList = identityService.createGroupQuery().groupMember(ManagerUserId).list();
    	    		Map<String, Object> variables = new HashMap<String, Object>();
    	    		for (Group group : groupList) {
    	    			String  groupName = group.getId();
    					if(groupName.indexOf("Manager") != -1) {
    						variables.put("deptLeader", groupName);
    						variables.put("applyUserId", userId);
    						leaveService.startWorkflow(userId,leaveId, variables);
    					}
    				}
    	    		return new ExtAjaxResponse(true,"操作成功!");
    			}else {
    				return new ExtAjaxResponse(true,"错误!");
    			}
    		}
    		
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"操作失败!");
	    }
    }
	
	
	/**
	 * 查询待处理流程任务
	 * @param pageable	分页对象
	 * @param session	通过会话获取登录用户(请假人)
	 * @return
	 */
	@RequestMapping(value = "/tasks")
    public @ResponseBody Page<LeaveDTO> findTodoTasks(HttpSession session, ExtjsPageRequest pageable) {
		Page<LeaveDTO> page = new PageImpl<LeaveDTO>(new ArrayList<LeaveDTO>(), pageable.getPageable(), 0);
    	try {
    		page = leaveService.findTodoTasks(SessionUtil.getUserName(session), pageable.getPageable());
	    } catch (Exception e) {
	    	e.printStackTrace();
	    }
    	
    	return page;
    }
	
	/**
     * 签收任务
     */
    @RequestMapping(value = "claim/{id}")
    public @ResponseBody ExtAjaxResponse claim(@PathVariable("id") String taskId, HttpSession session) {
    	try{
	    	leaveService.claim(taskId, SessionUtil.getUserName(session));
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
    public @ResponseBody ExtAjaxResponse complete(@PathVariable("id") String taskId,  WorkflowVariable var) {
    	try{
    		Map<String, Object> variables = var.getVariableMap();
	    	leaveService.complete(taskId, variables);
	    	return new ExtAjaxResponse(true,"任务签收成功!");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"任务签收失败!");
	    }
    }
}

