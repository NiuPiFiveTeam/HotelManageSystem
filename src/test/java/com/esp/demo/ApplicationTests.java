package com.esp.demo;

import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringRunner.class)
@SpringBootTest
@WebAppConfiguration
public class ApplicationTests 
{
	@Autowired  
	private RepositoryService repositoryService; 
	@Autowired  
	private RuntimeService runtimeService;  
	@Autowired  
	private TaskService taskService;  

	@Test
	public void helloProcessInstance() {
		//根据bpmn文件部署流程,可以思考是否需要多次部署？查看数据库表：act_re_procdef
		Deployment deployment = repositoryService.createDeployment().addClasspathResource("processes/inStorage.bpmn").deploy();
		System.out.println("创建流程部署，部署Id："+deployment.getId());
		//获取流程定义 
		ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery().deploymentId(deployment.getId()).singleResult();
		System.out.println("根据 流程部署Id 创建 流程定义，定义Id："+processDefinition.getId());
		//启动流程定义，返回流程实例
		ProcessInstance pi = runtimeService.startProcessInstanceById(processDefinition.getId());
		String processId = pi.getId();
		System.out.println("根据 流程定义Id 创建 流程实例，实例Id："+processId);
		
		System.out.println("根据实例Id推进流程任务：");
		
		Task task=taskService.createTaskQuery().processInstanceId(processId).singleResult();
		System.out.println("》》》》》》》》》》第一次执行前，任务名称："+task.getName());
		taskService.complete(task.getId());
 
		task = taskService.createTaskQuery().processInstanceId(processId).singleResult();
		System.out.println("》》》》》》》》》》》》》》》》》》》》第二次执行前，任务名称："+task.getName());
		taskService.complete(task.getId());
 
		task = taskService.createTaskQuery().processInstanceId(processId).singleResult();
		System.out.println("》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》任务执行完毕,task为："+task);
	}
}
