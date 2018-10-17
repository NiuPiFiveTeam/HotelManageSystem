package com.hmm.finance.logisticst.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
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
import com.hmm.employee.dao.EmployeeDao;
import com.hmm.employee.entity.Employee;
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
	@Autowired
	private EmployeeDao employdao;
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
	public void startWorkflow(String inStorageId) {
		//1.声明流程实例
		ProcessInstance processInstance = null;
		//2.获取入库实例
		InStorage inStorage = inStorageRepository.findById(inStorageId).get();
		String employeeId = inStorage.getEmployee().getUserName();
		Map<String, Object> variables = new HashMap<String, Object>();
		variables.put("applyUserId", employeeId);
		if(inStorage!=null) {
			try {
				processInstance = workflowService.startWorkflow(employeeId, "inStorageApply", inStorageId, variables);
				inStorage.setProcessStatus(ProcessStatus.APPROVAL);//进入(审批中...)状态
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
		//不可调换顺序，否则前端显示不正常.根据extjs id相同只显示list后面的数据
		//1.查询待申请的入库单(根据employeeId查找员工自己的入库单[别的员工看不到])
		Employee emp = employdao.findByUserName(employeeId);
		List<InStorage> inStorageLists = inStorageRepository.findByEmployee(emp);
		if(inStorageLists != null) {
			inStorageDTOs = new ArrayList<InStorageDTO>();
			for(InStorage instorage2 : inStorageLists) {
				InStorageDTO inStorageDTO = new InStorageDTO();
				BeanUtils.copyProperties(instorage2, inStorageDTO);
				inStorageDTO.setEmployeeId(instorage2.getEmployee().getUserName());
				inStorageDTOs.add(inStorageDTO);
			}	
		}
		//2.查询已进入申请状态的入库单
		List<WorkflowDTO> workflowLists = workflowService.findTodoTasks(employeeId);
		if(workflowLists!=null) {
			if(inStorageDTOs == null) {
				inStorageDTOs = new ArrayList<InStorageDTO>();
			}
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




