package com.hmm.Work.service;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.hmm.Work.entity.Bcard;
import com.hmm.Work.entity.BcardDTO;
import com.hmm.Work.entity.BcardEmpDTO;
import com.hmm.leave.entity.Leave;
import com.hmm.leave.entity.LeaveDTO;
import com.hmm.leave.entity.LeaveEmpDTO;

public interface BcardService {
	public void save(Bcard leave);
	public void delete(Long id);
	public Bcard findOne(Long id);

	//可扩展:高级查询
	
	//流程业务
	//1.启动流程
	public void startWorkflow(String userId,Long leaveId, Map<String, Object> variables);//findOne(Long id);
	//2.查询流程任务
	public Page<BcardDTO> findTodoTasks(String userId, Pageable pageable);
	//3.签收流程任务
	public void claim(String taskId,String userId);
	//4.完成流程任务
	public void complete(String taskId, Map<String, Object> variables);
	
	public void deleteAll(Long[] ids);
	public Page<BcardEmpDTO> findAll(Specification<Bcard> whereClause, Pageable pageable);

}
