package com.hmm.Work.entity;

public class Workchart {
	private Integer quarter;
	private Long late;
	private Long leaveEarly;
	private Long lackcard;
	private Long leave;
	private Long travel;
	public Workchart() {}
	
	public Workchart(Integer quarter, Long late, Long leaveEarly, Long lackcard, Long leave, Long travel) {
		super();
		this.quarter = quarter;
		this.late = late;
		this.leaveEarly = leaveEarly;
		this.lackcard = lackcard;
		this.leave = leave;
		this.travel = travel;
	}

	public Integer getQuarter() {
		return quarter;
	}

	public void setQuarter(Integer quarter) {
		this.quarter = quarter;
	}

	public Long getLate() {
		return late;
	}

	public void setLate(Long late) {
		this.late = late;
	}

	public Long getLeaveEarly() {
		return leaveEarly;
	}

	public void setLeaveEarly(Long leaveEarly) {
		this.leaveEarly = leaveEarly;
	}

	public Long getLackcard() {
		return lackcard;
	}

	public void setLackcard(Long lackcard) {
		this.lackcard = lackcard;
	}

	public Long getLeave() {
		return leave;
	}

	public void setLeave(Long leave) {
		this.leave = leave;
	}

	public Long getTravel() {
		return travel;
	}

	public void setTravel(Long travel) {
		this.travel = travel;
	}
	

}
