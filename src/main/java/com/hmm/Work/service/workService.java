package com.hmm.Work.service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.Nullable;

import com.hmm.Work.entity.Work;
import com.hmm.Work.entity.BcardDTO;
import com.hmm.Work.entity.WorkEmpDTO;
import com.hmm.common.web.ExtAjaxResponse;
import com.hmm.employee.entity.Employee;
import com.hmm.leave.entity.LeaveDTO;




public interface workService {
	ExtAjaxResponse save(String userId);
	ExtAjaxResponse UpdateWork(String userId);
	void save(Work entity);
	Optional<Work> findById(Long id);
	boolean existsById(Long id);
	void deleteById(Long id);
	void deleteByIds(Long[] ids);
	Page<Work> findAll(@Nullable Specification<Work> spec, Pageable pageable);
	Page<WorkEmpDTO> findAllByDTO(@Nullable Specification<Work> spec, Pageable pageable);
	Page<WorkEmpDTO> findAllBydeptName(String deptName , Pageable pageable);
	long count(@Nullable Specification<Work> spec);
	Work findByWorkDateAndEmploy(Date workDate,Employee employee);
	
	List<Work> findByDto(@Nullable Specification<Work> spec);
	
	int findByEmployAndOntudytimelate(String userName);
	int findByEmployAndOntudytimelackCard(String userName);//缺卡次数（当月
	int findByEmployAndOntudytimeleaveEarly(String userName);//早退次数（当月）
	int findByEmployAndOntudytimenormal(String userName);//不正常次数（当月）
	public float findattenceTotalworktime(String userbname);//当月上班时间
	public float findattenceTotalovertime(String userbname);//当月加班时间
	
	public Integer findExactlyPerson ();
	public Integer findTatalPersonNomal();//异常总人数
	
	public Integer findTatalPersonLate();//迟到总人数
	public Integer findTatalPersonleaveEarly();//迟到总人数
	
	public Integer findTatalPersonOvertime();//加班总人数
	
	public List<Map<Object,Object>> findlate(Integer year); 
	public List<Map<Object,Object>> findleaveEarly(Integer year);
	public List<Map<Object,Object>> findlackcard(Integer year);
	
	List<Map<Object,Object>> findByyearAndOntudytimelate(Integer year ,String userName);//迟到次数（）
	List<Map<Object,Object>> findByyearAndOntudytimeleaveEary(Integer year ,String userName);//迟到次数（）//缺卡次数（当月）
	List<Map<Object,Object>> findByyearAndOntudytimelackcard(Integer year ,String userName);//早退次数（当月）
		
	
}
