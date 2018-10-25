package com.hmm.travel.service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.Nullable;

import com.hmm.travel.entity.Travel;
import com.hmm.travel.entity.TravelDTO;
import com.hmm.travel.entity.TravelEmpDTO;



public interface TravelService {
	Travel save(Travel entity);
	Optional<Travel> findById(Long id);
	boolean existsById(Long id);
	void deleteById(Long id);
	Page<Travel> findTravel(@Nullable Specification<Travel> spec, Pageable pageable);
	long count(@Nullable Specification<Travel> spec);
	
	public void startWorkflow(String userId,Long travelId, Map<String, Object> variables);//findOne(Long id);
	//2.查询流程任务
	public Page<TravelDTO> findTodoTasks(String userId, Pageable pageable);
	//3.签收流程任务
	public void claim(String taskId,String userId);
	//4.完成流程任务
	public void complete(String taskId, Map<String, Object> variables);
	
	public void deleteAll(Long[] ids);
	
	public Page<TravelEmpDTO> findAllQueryDTO(@Nullable Specification<Travel> whereClause, Pageable pageable);
	
	public Page<TravelEmpDTO> findAll(String userId,String groupName, Pageable pageable);
	
	public Page<TravelEmpDTO> findByUserId(@Nullable Specification<Travel> whereClause,String userId, Pageable pageable);
	
	float findTotalTravelAllowance(String userName); 
	
	Integer findTatalPersonTravel();
	
	public List<Map<Object,Object>> findtravel(Integer year);
	
	List<Map<Object,Object>> findByyearAndOntudytimetravel(Integer year ,String userName);
	
	
	
	
	
}
