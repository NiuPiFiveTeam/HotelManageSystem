package com.hmm.finance.logisticst.service;

import java.util.Date;
import java.util.Map;

import org.activiti.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hmm.activiti.domain.ProcessStatus;
import com.hmm.activiti.service.IWorkflowService;
import com.hmm.finance.logisticst.domain.InStorage;
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
    * 开始请假流程
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
}




