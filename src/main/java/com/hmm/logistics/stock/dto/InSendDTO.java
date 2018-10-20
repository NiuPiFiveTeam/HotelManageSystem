package com.hmm.logistics.stock.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;

import com.hmm.finance.logisticst.domain.InStorage;

public class InSendDTO {
	private String inStorageId;//入库编号
	@DateTimeFormat(pattern="yyyy/MM/dd HH:mm:ss")  
	private Date applyTime;//处理日期
	@DateTimeFormat(pattern="yyyy/MM/dd HH:mm:ss") 
	private Date doDate;//处理日期
	private float amount;//总价
	private String sendWorker;
	
	public String getInStorageId() {
		return inStorageId;
	}
	public void setInStorageId(String inStorageId) {
		this.inStorageId = inStorageId;
	}
	public Date getApplyTime() {
		return applyTime;
	}
	public void setApplyTime(Date applyTime) {
		this.applyTime = applyTime;
	}
	public Date getDoDate() {
		return doDate;
	}
	public void setDoDate(Date doDate) {
		this.doDate = doDate;
	}
	public float getAmount() {
		return amount;
	}
	public void setAmount(float amount) {
		this.amount = amount;
	}
	public String getSendWorker() {
		return sendWorker;
	}
	public void setSendWorker(String sendWorker) {
		this.sendWorker = sendWorker;
	}
	
//	@SuppressWarnings({ "serial"})
//	public static Specification<InStorage> getWhereClause(final InSendDTO inSendDTO) {
//		return new Specification<InStorage>() {
//			@Override
//			public Predicate toPredicate(Root<InStorage> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
//			
//				List<Predicate> predicate = new ArrayList<>();
//				
//				
//				Predicate[] pre = new Predicate[predicate.size()];
//				return query.where(predicate.toArray(pre)).getRestriction();
//			}
//		};
//	}
	
	
}
