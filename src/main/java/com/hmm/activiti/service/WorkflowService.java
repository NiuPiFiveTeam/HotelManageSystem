package com.hmm.activiti.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.activiti.engine.HistoryService;
import org.activiti.engine.IdentityService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricActivityInstance;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.identity.Group;
import org.activiti.engine.identity.User;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.runtime.ProcessInstanceQuery;
import org.activiti.engine.task.Task;
import org.activiti.engine.task.TaskQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hmm.activiti.domain.WorkflowDTO;

@Service
@Transactional
public class WorkflowService implements IWorkflowService {
	/**
	 * 流程服务
	 */
	@Autowired
	private IdentityService identityService;
	@Autowired
	private RuntimeService runtimeService;
	@Autowired
	private TaskService taskService;
	@Autowired
	private RepositoryService repositoryService;
	@Autowired
	private HistoryService historyService;
	/*----------------------------------------------流程业务--------------------------------------------*/

	
	
	@SuppressWarnings("unchecked")
	@Override
	public ProcessInstance startWorkflow(String authenticatedUserId,String processDefinitionKey, String businessKey, Map variables)
	{
		ProcessInstance processInstance = null;	//1.声明流程实例
		try {
			identityService.setAuthenticatedUserId(authenticatedUserId);//2.授权
			//3.启动流程实例:processDefinitionKey, businessKey, variables
			processInstance = runtimeService.startProcessInstanceByKey(processDefinitionKey, businessKey, variables);
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			identityService.setAuthenticatedUserId(null);	//4.取消授权
		}
		return processInstance;
	}

	//查询任务所有人全部任务
	public List<WorkflowDTO> findOwnerTasks(String employeeId){
		List<WorkflowDTO> results = null;
		//根据用户id查询其所有用户实例
		ProcessInstanceQuery  instanceQuery = runtimeService.createProcessInstanceQuery().startedBy(employeeId);
		List<ProcessInstance> processInstances = instanceQuery.list();
		if(processInstances!=null) {
			results = new ArrayList<WorkflowDTO>();
			for(ProcessInstance processInstance : processInstances) {
				String processInstanceId = processInstance.getProcessInstanceId();
				String businessKey = processInstance.getBusinessKey();//获得入库申请的id
				if(businessKey == null) {
					continue;
				}
				WorkflowDTO dto = new WorkflowDTO();
				dto.setProcessInstanceId(processInstanceId);//为了生成[流程跟踪图]
				dto.setBusinessKey(processInstance.getBusinessKey());//根据id在service获取入库类

				//如果查找结果为null，则该流程实例已经走完，如果不为空，则查出来的activity 就是流程实例的下一环节。
//					List<HistoricActivityInstance> task = historyService.createHistoricActivityInstanceQuery()
//							.processInstanceId(processInstanceId)
//							.unfinished().list(); 
				HistoricTaskInstance task = historyService.createHistoricTaskInstanceQuery()
						.processInstanceId(processInstanceId)
						.unfinished().singleResult();
//					for(HistoricTaskInstance a : task){
//						System.out.println(a.getName());
//					}
//					dto.setTaskId(task.getId());
				dto.setTaskName(task.getName());//显示[审批状态]
//					dto.setTaskCreateTime(task.getCreateTime());
				dto.setAssignee(task.getAssignee());//判断操作的按钮
//					dto.setTaskDefinitionKey(task.getTaskDefinitionKey());
//					dto.setSuspended(processInstance.isSuspended());
//					ProcessDefinition processDefinition = getProcessDefinition(processInstance.getProcessDefinitionId());
//					dto.setProcessDefinitionId(processDefinition.getId());
//					dto.setVersion(processDefinition.getVersion());
				results.add(dto);
			}
		}
		return results;
	}
		
	public List<WorkflowDTO> findTodoTasks(String employeeId){
		List<WorkflowDTO> results = null;
		//根据act_ru_identitylink中对应的用户 查找act_ru_task表中对应的任务
		TaskQuery  taskQuery = taskService.createTaskQuery().taskCandidateOrAssigned(employeeId);
		List<Task> tasks = taskQuery.list();
		if(tasks!=null) {
			results = new ArrayList<WorkflowDTO>();
			for(Task task : tasks) {
				String processInstanceId = task.getProcessInstanceId();
				ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().
						processInstanceId(processInstanceId).active().singleResult();
				
				String businessKey = processInstance.getBusinessKey();//获得入库申请的id
				if(businessKey == null) {
					continue;
				}
				WorkflowDTO dto = new WorkflowDTO();
				dto.setProcessInstanceId(processInstanceId);
				dto.setBusinessKey(processInstance.getBusinessKey());
				
				dto.setTaskId(task.getId());
				dto.setTaskName(task.getName());
				dto.setTaskCreateTime(task.getCreateTime());
				dto.setAssignee(task.getAssignee());
				
				dto.setTaskDefinitionKey(task.getTaskDefinitionKey());
				dto.setSuspended(processInstance.isSuspended());
				ProcessDefinition processDefinition = getProcessDefinition(processInstance.getProcessDefinitionId());
				dto.setProcessDefinitionId(processDefinition.getId());
				dto.setVersion(processDefinition.getVersion());
				results.add(dto);	
			}
		}
		return results;
	}
	
	public List<WorkflowDTO> findTodoTasks2(String employeeId){
		List<WorkflowDTO> results = null;
		//根据act_ru_identitylink中对应的用户 查找act_ru_task表中对应的任务
		TaskQuery  taskQuery = taskService.createTaskQuery().taskCandidateOrAssigned(employeeId);
		List<Task> tasks = taskQuery.list();
		if(tasks!=null) {
			results = new ArrayList<WorkflowDTO>();
			for(Task task : tasks) {
				String processInstanceId = task.getProcessDefinitionId();
				List<ProcessInstance> processInstances = runtimeService.createProcessInstanceQuery().
						processDefinitionId(processInstanceId).active().list();
				for (ProcessInstance processInstance : processInstances) {
					String businessKey = processInstance.getBusinessKey();//获得入库申请的id
					if(businessKey == null) {
						continue;
					}
					WorkflowDTO dto = new WorkflowDTO();
					dto.setProcessInstanceId(processInstanceId);
					dto.setBusinessKey(processInstance.getBusinessKey());
					
					dto.setTaskId(task.getId());
					dto.setTaskName(task.getName());
					dto.setTaskCreateTime(task.getCreateTime());
					dto.setAssignee(task.getAssignee());
					
					dto.setTaskDefinitionKey(task.getTaskDefinitionKey());
					dto.setSuspended(processInstance.isSuspended());
					ProcessDefinition processDefinition = getProcessDefinition(processInstance.getProcessDefinitionId());
					dto.setProcessDefinitionId(processDefinition.getId());
					dto.setVersion(processDefinition.getVersion());
					results.add(dto);
				}
				
			}
		}
		return results;
	}

    /**
     * 签收流程任务
     *
     * @param taskId 任务ID
     * @param userId 签收人用户ID
     * @return
     */
	public void claim(String taskId, String userId) {
		taskService.claim(taskId, userId);
		
	}

	 /**
     * 完成流程任务
     *
     * @param taskId 任务ID
     * @param variables 流程变量
     * @return
     */
	@Override
	public void complete(String taskId, Map variables) {
		taskService.complete(taskId, variables);
	}

	 /**
    * 查询流程定义对象
    *
    * @param processDefinitionId 流程定义ID
    * @return
    */
   protected ProcessDefinition getProcessDefinition(String processDefinitionId) {
       ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery().processDefinitionId(processDefinitionId).singleResult();
       return processDefinition;
   }
	 /**
    * 查询流程任务中的流程变量
    *
    * @param processDefinitionId 流程定义ID
    * @return
    */
	public Map getTaskVariables(String taskId) {
		Map<String, Object> variables = taskService.getVariables(taskId);
		return variables;
	}
	
	@Override
	public void addGroup(String id, String name,String type) {
		// TODO Auto-generated method stub
		Group group = identityService.newGroup(id);
		group.setName(name);
		group.setType(type);
		identityService.saveGroup(group);	
	}

	@Override
	public void addUser(String userId, String password , String groupId) {
		// TODO Auto-generated method stub
		User user = identityService.newUser(userId);
		user.setPassword(password);
		identityService.saveUser(user);
		identityService.createMembership(userId, groupId);
	}

	@Override
	public void deleteUser(String name, String groupName) {
		// TODO Auto-generated method stub
		identityService.deleteUser(name);
		identityService.deleteMembership(name, groupName);	
	}

	@Override
	public void editGUserMembership(String name, String password, String groupName) {
		// TODO Auto-generated method stub	
		
	}

	@Override
	public void findGUser(String name, String groupName) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteGroup(String id) {
		// TODO Auto-generated method stub
		identityService.deleteGroup(id);
		
	}


	@Override
	public void addUser2(String name, String password) {
		// TODO Auto-generated method stub
		User user = identityService.newUser(name);
		user.setPassword(password);
		identityService.saveUser(user);
	}


	@Override
	public void deleteUser2(String name) {
		// TODO Auto-generated method stub
		identityService.deleteUser(name);
		
	}
	
	
	public ProcessInstance getProcessInstanceByTaskId(String taskId) {
   		Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
		ProcessInstance processInstance = runtimeService.createProcessInstanceQuery()
				.processInstanceId(task.getProcessInstanceId()).singleResult();
		return processInstance;
   	}
   	
   	public ProcessInstance getProcessInstanceById(String processInstanceId) {
   		ProcessInstance processInstance = runtimeService.createProcessInstanceQuery()
   				.processInstanceId(processInstanceId).singleResult();
        return processInstance;
    }
}
