package com.hmm.calendars.service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.Nullable;

import com.hmm.calendars.entity.EventCalendarDTO;
import com.hmm.calendars.entity.ExtResultJson;
import com.hmm.calendars.entity.SchedulEvent;
import com.hmm.calendars.entity.SchedulEventDto;
import com.hmm.calendars.entity.SchedulEventEmpDTO;
import com.hmm.calendars.entity.SchedulQueryDTO;
import com.hmm.employee.entity.Employee;


public interface SchedulEventService {
	void save(SchedulEventDto entity);
	void save(SchedulEvent entity);
	Optional<SchedulEvent> findById(Long id);
	SchedulEventDto findDTOByID(Long id);
	boolean existsById(Long id);
	void deleteById(Long id);
	Page<SchedulEventDto> findAll(SchedulQueryDTO employQueryDTO, Pageable pageable);
	List<SchedulEvent> findAllEmp(SchedulQueryDTO employQueryDTO);
	long count(@Nullable Specification<SchedulEvent> spec);
	public void deleteAll(Long[] ids);
	SchedulEvent findStartDate(String date ,String userName);
	public ExtResultJson<SchedulEventDto> findEvents(
	Long calendar,
	@DateTimeFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") Date startDate,
	@DateTimeFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") Date endDate);
	
	SchedulEvent findByEventDateAndEmploy(Date EventDate , Employee employee);
	
	List<SchedulEvent> findByDTO(@Nullable Specification<SchedulEvent> spec);
	
	Page<SchedulEventEmpDTO> findAllByEmpDto(@Nullable Specification<SchedulEvent> spec, Pageable pageable);
	public float  findattenceTotalTime(String userbname);
	
	public int findWorkTotalDay(String username);
	
	public Integer findTotalPerson();
	
	public List<SchedulEvent> findPassDay();//
}
