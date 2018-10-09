package com.hmm.leave.listener;

import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.ExecutionListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * 请假流程结束监听器
 */
//@Component
//@Transactional
public class LeaveProcessEndListener implements ExecutionListener {
	private static final long serialVersionUID = -2170319176143272096L;
	protected Logger logger = LoggerFactory.getLogger(getClass());

	@Override
	public void notify(DelegateExecution execution) {
		// TODO Auto-generated method stub
		
	}

//    @Autowired
//    ActivitiDao activitiDao;
//
//    @Override
//    public void notify(DelegateExecution execution) throws Exception {
//        String processInstanceId = execution.getProcessInstanceId();
//
//        int i = activitiDao.deleteFormPropertyByProcessInstanceId(processInstanceId);
//        logger.debug("清理了 {} 条历史表单数据", i);
//    }
}
