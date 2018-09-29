package com.hmm.finance.financeReport.domain;

public class FinanceReport {
	private Integer month;
	private float roomIncome;
	private float logisticstCost;
	private float salaryCost;
	private float profit;
	
	public FinanceReport() {
		super();
	}
	
	public FinanceReport(Integer month, float roomIncome, float logisticstCost, float salaryCost, float profit) {
		super();
		this.month = month;
		this.roomIncome = roomIncome;
		this.logisticstCost = logisticstCost;
		this.salaryCost = salaryCost;
		this.profit = profit;
	}

	public float getProfit() {
		return profit;
	}

	public void setProfit(float profit) {
		this.profit = profit;
	}

	public Integer getMonth() {
		return month;
	}
	public float getRoomIncome() {
		return roomIncome;
	}
	public float getLogisticstCost() {
		return logisticstCost;
	}
	public float getSalaryCost() {
		return salaryCost;
	}
	public void setMonth(Integer month) {
		this.month = month;
	}
	public void setRoomIncome(float roomIncome) {
		this.roomIncome = roomIncome;
	}
	public void setLogisticstCost(float logisticstCost) {
		this.logisticstCost = logisticstCost;
	}
	public void setSalaryCost(float salaryCost) {
		this.salaryCost = salaryCost;
	}
	
	
}
