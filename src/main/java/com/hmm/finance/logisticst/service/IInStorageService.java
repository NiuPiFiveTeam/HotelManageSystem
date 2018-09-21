package com.hmm.finance.logisticst.service;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import com.hmm.finance.logisticst.domain.InStorage;


public interface IInStorageService {
	//入库单业务
	public void save(InStorage inStorage);
//	public InAll findOne(String id);
//	public Page<InAll> findAll(Specification<InAll> spec, Pageable pageable);
		
	//流程业务
	//1.启动流程
	public void startWorkflow(String employeeId,String inStorageId, Map<String, Object> variables);
//	//2.查询流程任务
//	public Page<LeaveDTO> findTodoTasks(String userId, Pageable pageable);
//	//3.签收流程任务
//	public void claim(String taskId,String userId);
//	//4.完成流程任务
//	public void complete(String taskId, Map<String, Object> variables);  
	//5.结束(终止)流程实例
	//6.查询运行中的流程
	//public Page<LeaveDTO> findRunningProcessInstaces(Page<Leave> page, int[] pageParams);
	//7.查询已结束的流程
	//public Page<LeaveDTO> findFinishedProcessInstaces(Page<Leave> page, int[] pageParams);
	//8.查询流程定义对象
	//protected ProcessDefinition getProcessDefinition(String processDefinitionId);
}
