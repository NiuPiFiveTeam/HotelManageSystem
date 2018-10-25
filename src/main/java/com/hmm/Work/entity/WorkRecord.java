package com.hmm.Work.entity;

public class WorkRecord {
	public  int totalLate;//
	public  int totalleaveEarly;
	public  int totalCard;//补卡
	public  float exactlyTime;
	public  float attenceTotalTime;
	public  float worktime;
	public  float overtime;
	
	public  float leaveTimes;
	public  float travelAttence;
	public int getTotalLate() {
		return totalLate;
	}
	public void setTotalLate(int totalLate) {
		this.totalLate = totalLate;
	}
	public int getTotalleaveEarly() {
		return totalleaveEarly;
	}
	public void setTotalleaveEarly(int totalleaveEarly) {
		this.totalleaveEarly = totalleaveEarly;
	}
	public int getTotalCard() {
		return totalCard;
	}
	public void setTotalCard(int totalCard) {
		this.totalCard = totalCard;
	}
	public float getExactlyTime() {
		return exactlyTime;
	}
	public void setExactlyTime(float exactlyTime) {
		this.exactlyTime = exactlyTime;
	}
	public float getAttenceTotalTime() {
		return attenceTotalTime;
	}
	public void setAttenceTotalTime(float attenceTotalTime) {
		this.attenceTotalTime = attenceTotalTime;
	}
	public float getWorktime() {
		return worktime;
	}
	public void setWorktime(float worktime) {
		this.worktime = worktime;
	}
	public float getOvertime() {
		return overtime;
	}
	public void setOvertime(float overtime) {
		this.overtime = overtime;
	}
	public float getLeaveTimes() {
		return leaveTimes;
	}
	public void setLeaveTimes(float leaveTimes) {
		this.leaveTimes = leaveTimes;
	}
	public float getTravelAttence() {
		return travelAttence;
	}
	public void setTravelAttence(float travelAttence) {
		this.travelAttence = travelAttence;
	}
	

	
}
