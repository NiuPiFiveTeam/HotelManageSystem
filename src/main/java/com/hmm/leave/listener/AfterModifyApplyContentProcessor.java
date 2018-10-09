package com.hmm.leave.listener;


import org.activiti.engine.RuntimeService;
import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.TaskListener;
import org.activiti.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.hmm.activiti.domain.ProcessStatus;
import com.hmm.leave.entity.Leave;
import com.hmm.leave.service.ILeaveService;

import java.util.Date;

/**
 * 调整请假内容处理器
 */
@Component
@Transactional
public class AfterModifyApplyContentProcessor implements TaskListener {

    private static final long serialVersionUID = 1L;

    @Autowired
    private ILeaveService leaveService;

    @Autowired
    private RuntimeService runtimeService;
    
    public void notify(DelegateTask delegateTask) {
        String processInstanceId = delegateTask.getProcessInstanceId();
        ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).singleResult();
        Leave leave = leaveService.findOne(new Long(processInstance.getBusinessKey()));
        if(delegateTask.getVariable("reApply").toString() =="true") {
            leave.setLeaveType((String) delegateTask.getVariable("leaveType"));
            leave.setStartTime((Date) delegateTask.getVariable("startTime"));
            leave.setEndTime((Date) delegateTask.getVariable("endTime"));
            leave.setReason((String) delegateTask.getVariable("reason"));
        }else {
        	leave.setProcessStatus(ProcessStatus.CANCEL);
        }
 

        //leaveService.save(leave);
    }

}
