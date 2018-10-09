package com.hmm.calendars.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.hmm.calendars.dao.SchedulEventDao;
import com.hmm.calendars.entity.Calendar;
import com.hmm.calendars.entity.ExtResultJson;
import com.hmm.calendars.entity.SchedulEvent;
import com.hmm.calendars.entity.SchedulEventDto;
import com.hmm.calendars.entity.SchedulQueryDTO;



@Service
@Transactional
public class SchedulEventServiceImpl implements SchedulEventService{
	
	@Autowired
	private SchedulEventDao schedulEventdao;
	
	@Autowired
	private CalendarService calendarServiceImpl;

	@Override
	public void save(SchedulEventDto entity) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void save(SchedulEvent entity) {
		// TODO Auto-generated method stub
		schedulEventdao.save(entity);
	}

	@Override
	public Optional<SchedulEvent> findById(Long id) {
		// TODO Auto-generated method stub
		return schedulEventdao.findById(id);
	}

	@Override
	public SchedulEventDto findDTOByID(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean existsById(Long id) {
		// TODO Auto-generated method stub
		return schedulEventdao.existsById(id);
	}

	@Override
	public void deleteById(Long id) {
		// TODO Auto-generated method stub
		schedulEventdao.deleteById(id);
	}

	@Override
	public Page<SchedulEventDto> findAll(SchedulQueryDTO schedulQueryDTO, Pageable pageable) {
		// TODO Auto-generated method stub
		List<SchedulEvent> events = (List<SchedulEvent>) schedulEventdao.findAll();
		List<SchedulEventDto> dtos = null;
		if(null != events) {
			dtos = new ArrayList<>();
			for (SchedulEvent schedulEvent : events) {
				SchedulEventDto eventDto = new SchedulEventDto();
				eventDto.setCalendarId(schedulEvent.getCalendar().getId());
				eventDto.setEmpName(schedulEvent.getEmploy().getEmpName());
				eventDto.setDeptName(schedulEvent.getEmploy().getDepartmentes().getDeptName());
				dtos.add(eventDto);
			}
		}
		
		return new PageImpl<SchedulEventDto>(dtos, pageable,null!=events?events.size():0);
	}

	@Override
	public long count(Specification<SchedulEvent> spec) {
		// TODO Auto-generated method stub
		return schedulEventdao.count(spec);
	}

	@Override
	public void deleteAll(Long[] ids) {
		// TODO Auto-generated method stub
		List<Long> longs = new ArrayList<>(Arrays.asList(ids));
		List<SchedulEvent> events = (List<SchedulEvent>) schedulEventdao.findAllById(longs);
		schedulEventdao.deleteAll(events);
	}

	@Override
	public ExtResultJson<SchedulEventDto> findEvents(Long calendar, Date startDate, Date endDate) {
		// TODO Auto-generated method stub
		ExtResultJson<SchedulEventDto> json = new ExtResultJson<SchedulEventDto>(new ArrayList<SchedulEventDto>());
		try {
			Calendar calendars = calendarServiceImpl.findById(calendar).get();
			List<SchedulEvent> events = calendars.getEventStore();
			List<SchedulEventDto> dtos = new ArrayList<>();
			for (SchedulEvent schedulEvent : events) {
				SchedulEventDto dto = new SchedulEventDto();
				SchedulEventDto.entityToDto(schedulEvent, dto);
				dto.setCalendarId(calendar);
				dto.setEmpName(schedulEvent.getEmploy().getEmpName());
				dto.setDeptName(schedulEvent.getEmploy().getDepartmentes().getDeptName());
				dtos.add(dto);
			}
			json.setLists(dtos);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		
		
		return json;
	}

}
