package com.hmm.calendars.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.data.annotation.Transient;

@Entity
@Table(name="t_Calendar")
public class Calendar 
{
 	private Long id;
 	private String title;
    private String description;
    private String color;
    private String assignedColor;
    private Boolean hidden=false;
    private Boolean editable=true;
    
    private List<SchedulEvent> eventStore = new ArrayList<SchedulEvent>();

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}
    
    @OneToMany(cascade=CascadeType.MERGE,mappedBy="calendar")
    public List<SchedulEvent> getEventStore() {
		return eventStore;
	}
    
	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}

	public String getColor() {
		return color;
	}

	public String getAssignedColor() {
		return assignedColor;
	}

	public Boolean getHidden() {
		return hidden;
	}

	public Boolean getEditable() {
		return editable;
	}

	

	public void setId(Long id) {
		this.id = id;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public void setAssignedColor(String assignedColor) {
		this.assignedColor = assignedColor;
	}

	public void setHidden(Boolean hidden) {
		this.hidden = hidden;
	}

	public void setEditable(Boolean editable) {
		this.editable = editable;
	}

	public void setEventStore(List<SchedulEvent> eventStore) {
		this.eventStore = eventStore;
	}

    
    
}
