package com.hmm.Work.entity;

public class WorkRecord {
	public  Integer totalLate;//
	public  Integer totalleaveEarly;
	public  Integer totalCard;//补卡
	public  Integer totalnormal;//
	public  Float exactlyTime;
	public  Float attenceTotalTime;
	public  Float worktime;
	public  Float overtime;

	public Float getAttenceTotalTime() {
		return attenceTotalTime;
	}
	public void setAttenceTotalTime(Float attenceTotalTime) {
		this.attenceTotalTime = attenceTotalTime;
	}
	public Float getWorktime() {
		return worktime;
	}
	public void setWorktime(Float worktime) {
		this.worktime = worktime;
	}
	public Float getOvertime() {
		return overtime;
	}
	public void setOvertime(Float overtime) {
		this.overtime = overtime;
	}
	public Integer getTotalLate() {
		return totalLate;
	}
	public void setTotalLate(Integer totalLate) {
		this.totalLate = totalLate;
	}
	public Integer getTotalleaveEarly() {
		return totalleaveEarly;
	}
	public void setTotalleaveEarly(Integer totalleaveEarly) {
		this.totalleaveEarly = totalleaveEarly;
	}
	public Integer getTotalCard() {
		return totalCard;
	}
	public void setTotalCard(Integer totalCard) {
		this.totalCard = totalCard;
	}
	public Integer getTotalnormal() {
		return totalnormal;
	}
	public void setTotalnormal(Integer totalnormal) {
		this.totalnormal = totalnormal;
	}
	public Float getExactlyTime() {
		return exactlyTime;
	}
	public void setExactlyTime(Float exactlyTime) {
		this.exactlyTime = exactlyTime;
	}

	
}
