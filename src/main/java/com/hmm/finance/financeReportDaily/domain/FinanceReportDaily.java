package com.hmm.finance.financeReportDaily.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name="t_financeReportDaily")
public class FinanceReportDaily {
	private Long financeReportDailyId;	
	private Date date;
	private float roomIncome;
	private float logisticstCost;
	private float salaryCost;
	private float totalIncome;
	private float totalCost;
	private float profit;
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getFinanceReportDailyId() {
		return financeReportDailyId;
	}
	@JsonFormat(pattern="yyyy/MM/dd",timezone="GMT+8")
	public Date getDate() {
		return date;
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
	public void setFinanceReportDailyId(Long financeReportDailyId) {
		this.financeReportDailyId = financeReportDailyId;
	}
	public void setDate(Date date) {
		this.date = date;
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
	public float getTotalIncome() {
		return totalIncome;
	}
	public float getTotalCost() {
		return totalCost;
	}
	public float getProfit() {
		return profit;
	}
	public void setTotalIncome(float totalIncome) {
		this.totalIncome = totalIncome;
	}
	public void setTotalCost(float totalCost) {
		this.totalCost = totalCost;
	}
	public void setProfit(float profit) {
		this.profit = profit;
	}
}
