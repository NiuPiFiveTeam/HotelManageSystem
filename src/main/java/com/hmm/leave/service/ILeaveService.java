package com.hmm.leave.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.hmm.leave.entity.Leave;
import com.hmm.leave.entity.LeaveDTO;
import com.hmm.leave.entity.LeaveEmpDTO;



public interface ILeaveService {
	//请假业务
		public void save(Leave leave);
		public void delete(Long id);
		public Leave findOne(Long id);
		public Page<Leave> findLeave(String userId,Pageable pageable);
		//可扩展:高级查询
		
		//流程业务
		//1.启动流程
		public void startWorkflow(String userId,Long leaveId, Map<String, Object> variables);//findOne(Long id);
		//2.查询流程任务
		public Page<LeaveDTO> findTodoTasks(String userId, Pageable pageable);
		//3.签收流程任务
		public void claim(String taskId,String userId);
		//4.完成流程任务
		public void complete(String taskId, Map<String, Object> variables);
		
		public void deleteAll(Long[] ids);
		public Page<LeaveEmpDTO> findAll(Specification<Leave> whereClause, Pageable pageable);
		
		float findTotalLeaveTimes(String userName);
		
		//Integer findTatalPersonLeave();
		public int findTatalPersonLeave();
		
		public List<Map<Object,Object>> findleave(Integer year);
		
		List<Map<Object,Object>> findByyearAndOntudytimeleave(Integer year ,String userName);//早退次数（当月）

}
