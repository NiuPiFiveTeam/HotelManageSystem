package com.hmm.calendars.service;

import java.util.List;
import java.util.Optional;

import com.hmm.calendars.entity.Calendar;

public interface CalendarService {
	void save(Calendar entity);
	Optional<Calendar> findById(Long id);
	List<Calendar> findAll();
	boolean existsById(Long id);
	void deleteById(Long id);
	public void deleteAll(Long[] ids);
}
