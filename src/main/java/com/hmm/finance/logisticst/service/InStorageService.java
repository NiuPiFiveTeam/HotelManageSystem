package com.hmm.finance.logisticst.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.activiti.engine.runtime.ProcessInstance;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hmm.activiti.domain.ProcessStatus;
import com.hmm.activiti.domain.WorkflowDTO;
import com.hmm.activiti.service.IWorkflowService;
import com.hmm.finance.logisticst.domain.InStorage;
import com.hmm.finance.logisticst.domain.InStorageDTO;
import com.hmm.finance.logisticst.repository.InStorageRepository;

@Service
@Transactional
public class InStorageService implements IInStorageService {
	@Autowired
	private InStorageRepository inStorageRepository;
	@Autowired 
	private IWorkflowService workflowService;
	
	@Override
	public void save(InStorage inStorage) {
		inStorageRepository.save(inStorage);
	}
	
	/*----------------------------------------------流程业务--------------------------------------------*/
	/**
	* 开始入库申请流程
    * @return
    */
	@Override
	public void startWorkflow(String employeeId,String inStorageId, Map<String, Object> variables) {
		//1.声明流程实例
		ProcessInstance processInstance = null;
		//2.获取入库实例
		InStorage inStorage = inStorageRepository.findById(inStorageId).get();
		if(inStorage!=null) {
			try {
				processInstance = workflowService.startWorkflow(employeeId, "inStorageApply", inStorageId, variables);
				inStorage.setProcessStatus(ProcessStatus.NEW);
				inStorage.setProcessInstanceId(processInstance.getId());
				inStorage.setApplyTime(new Date());
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	@Override
	public List<InStorageDTO> findTodoTasks(String employeeId,Pageable pageable){
		List<InStorageDTO> inStorageDTOs = null;
		List<WorkflowDTO> workflowLists = workflowService.findTodoTasks(employeeId);
		if(workflowLists!=null) {
			inStorageDTOs = new ArrayList<InStorageDTO>();
			for(WorkflowDTO workflow : workflowLists) {
				String businessKey = workflow.getBusinessKey();
				if(businessKey == null) {
					continue;
				}
				InStorage inStorage = inStorageRepository.findById(businessKey).get();
				if(inStorage!=null) {
					InStorageDTO inStorageDTO = new InStorageDTO();
					BeanUtils.copyProperties(inStorage, inStorageDTO);
					inStorageDTO.setEmployeeId(inStorage.getEmployee().getUserName());
					BeanUtils.copyProperties(workflow, inStorageDTO);
					inStorageDTOs.add(inStorageDTO);
				}
			}
		}
		return inStorageDTOs;
	}
	
	 /**
     * 签收流程任务
     *
     * @param taskId 任务ID
     * @param userId 签收人用户ID
     * @return
     */
	public void claim(String taskId, String employeeId) {
		workflowService.claim(taskId, employeeId);
	}
	
	 /**
     * 完成流程任务
     *
     * @param taskId 任务ID
     * @param variables 流程变量
     * @return
     */
	public void complete(String taskId, Map<String, Object> variables) {
		workflowService.complete(taskId, variables);
	}
}




