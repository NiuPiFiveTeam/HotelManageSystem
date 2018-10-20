package com.hmm.activiti.service;

import java.util.List;
import java.util.Map;
import org.activiti.engine.runtime.ProcessInstance;

import com.hmm.activiti.domain.WorkflowDTO;

public interface IWorkflowService
{
	//流程业务
	//1.启动流程
	public ProcessInstance startWorkflow(String authenticatedUserId,String processDefinitionKey, String businessKey, Map variables);
	//2.查询流程任务
	public List<WorkflowDTO> findTodoTasks(String employeeId);
	public List<WorkflowDTO> findTodoTasks2(String employeeId);
	//3.签收流程任务
	public void claim(String taskId,String userId);
	//4.完成流程任务
	public void complete(String taskId, Map variables);
	
	public Map getTaskVariables(String taskId);
	//5.结束(终止)流程实例
	//6.查询运行中的流程
	//public Page<T> findRunningProcessInstaces(Page<Leave> page, int[] pageParams);
	//7.查询已结束的流程
	//public Page<T> findFinishedProcessInstaces(Page<Leave> page, int[] pageParams);
	//8.查询流程定义对象
	//protected ProcessDefinition getProcessDefinition(String processDefinitionId);
	
	public void addGroup(String id,String name ,String type);
	public void deleteGroup(String id);
	public void addUser2(String name , String  password);
	public void addUser(String name , String  password , String groupName);
	
	public void deleteUser(String name ,  String groupName);//删除关系
	public void deleteUser2(String name);//删除用户
	
	public void editGUserMembership(String name , String  password ,  String groupName);
	
	public void findGUser(String name ,  String groupName);
}
