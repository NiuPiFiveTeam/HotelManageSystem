package com.hmm.calendars.entity;

import java.util.ArrayList;
import java.util.List;

public class CalendarDTO {
	private Long id;
 	private String title;
    private String description;
    private String color;
    private String assignedColor;
    private Boolean hidden=false;
    private Boolean editable=true;
    
    private List<SchedulEventDto> eventStore = new ArrayList<SchedulEventDto>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getAssignedColor() {
		return assignedColor;
	}

	public void setAssignedColor(String assignedColor) {
		this.assignedColor = assignedColor;
	}

	public Boolean getHidden() {
		return hidden;
	}

	public void setHidden(Boolean hidden) {
		this.hidden = hidden;
	}

	public Boolean getEditable() {
		return editable;
	}

	public void setEditable(Boolean editable) {
		this.editable = editable;
	}

	public List<SchedulEventDto> getEventStore() {
		return eventStore;
	}

	public void setEventStore(List<SchedulEventDto> eventStore) {
		this.eventStore = eventStore;
	}
    
    
}
