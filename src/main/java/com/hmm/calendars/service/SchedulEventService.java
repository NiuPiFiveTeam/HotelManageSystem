package com.hmm.calendars.service;

import java.util.Date;
import java.util.List;
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
import com.hmm.calendars.entity.SchedulQueryDTO;


public interface SchedulEventService {
	void save(SchedulEventDto entity);
	void save(SchedulEvent entity);
	Optional<SchedulEvent> findById(Long id);
	SchedulEventDto findDTOByID(Long id);
	boolean existsById(Long id);
	void deleteById(Long id);
	Page<SchedulEventDto> findAll(SchedulQueryDTO employQueryDTO, Pageable pageable);
	long count(@Nullable Specification<SchedulEvent> spec);
	public void deleteAll(Long[] ids);
	List<SchedulEvent> findStartDate(Date date ,String userName);
	public ExtResultJson<SchedulEventDto> findEvents(
	Long calendar,
	@DateTimeFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") Date startDate,
	@DateTimeFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") Date endDate);
}
