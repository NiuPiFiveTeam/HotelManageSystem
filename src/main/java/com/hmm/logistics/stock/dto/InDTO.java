package com.hmm.logistics.stock.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;

import com.hmm.finance.logisticst.domain.InStorage;

public class InDTO {
	private String inStorageId;//入库编号
	@DateTimeFormat(pattern="yyyy/MM/dd HH:mm:ss")  
	private Date doDate;//申请日期
	@DateTimeFormat(pattern="yyyy/MM/dd HH:mm:ss")  
	private Date inStorageDate;//入库日期
	private String vender;//采购商家
	private float amount;//总价
	private String sendWorker;//申请员工
	private String Worker;//处理员工
	
	@DateTimeFormat(pattern="yyyy/MM/dd HH:mm:ss")  
	private Date createTimeStart;//入库日期前范围
	@DateTimeFormat(pattern="yyyy/MM/dd HH:mm:ss")  
	private Date createTimeEnd;//入库日期后范围
	private float amountStart;//总价前范围
	private float amountEnd;//总价后范围
	

	
	public String getInStorageId() {
		return inStorageId;
	}



	public void setInStorageId(String inStorageId) {
		this.inStorageId = inStorageId;
	}



	public Date getDoDate() {
		return doDate;
	}



	public void setDoDate(Date doDate) {
		this.doDate = doDate;
	}



	public Date getInStorageDate() {
		return inStorageDate;
	}



	public void setInStorageDate(Date inStorageDate) {
		this.inStorageDate = inStorageDate;
	}



	public String getVender() {
		return vender;
	}



	public void setVender(String vender) {
		this.vender = vender;
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



	public String getWorker() {
		return Worker;
	}



	public void setWorker(String worker) {
		Worker = worker;
	}



	public Date getCreateTimeStart() {
		return createTimeStart;
	}



	public void setCreateTimeStart(Date createTimeStart) {
		this.createTimeStart = createTimeStart;
	}



	public Date getCreateTimeEnd() {
		return createTimeEnd;
	}



	public void setCreateTimeEnd(Date createTimeEnd) {
		this.createTimeEnd = createTimeEnd;
	}



	public float getAmountStart() {
		return amountStart;
	}



	public void setAmountStart(float amountStart) {
		this.amountStart = amountStart;
	}



	public float getAmountEnd() {
		return amountEnd;
	}



	public void setAmountEnd(float amountEnd) {
		this.amountEnd = amountEnd;
	}


	@SuppressWarnings({ "serial"})
	public static Specification<InStorage> getWhereClause(final InDTO inDTO) {
		return new Specification<InStorage>() {
			@Override
			public Predicate toPredicate(Root<InStorage> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
			
				List<Predicate> predicate = new ArrayList<>();
				if (StringUtils.isNotBlank(inDTO.getInStorageId())) {
					predicate.add(criteriaBuilder.like(root.get("inStorageId").as(String.class),
							"%" + inDTO.getInStorageId() + "%"));}
				if (null!=inDTO.getCreateTimeStart()) {
					predicate.add(criteriaBuilder.greaterThanOrEqualTo(root.get("StartDate").as(Date.class),
							inDTO.getCreateTimeStart()));
				}
				if (null!=inDTO.getCreateTimeEnd()) {
					predicate.add(criteriaBuilder.lessThanOrEqualTo(root.get("StartDate").as(Date.class),
							inDTO.getCreateTimeEnd()));
				}
				if (StringUtils.isNotBlank(inDTO.getVender())) {
					predicate.add(criteriaBuilder.like(root.get("vender").as(String.class),
							"%" + inDTO.getVender() + "%"));}
				if (0!=inDTO.getAmountStart()) {
					predicate.add(criteriaBuilder.greaterThanOrEqualTo(root.get("amountStart").as(float.class),
							inDTO.getAmountStart()));
				}
				if (0!=inDTO.getAmountEnd()) {
					predicate.add(criteriaBuilder.lessThanOrEqualTo(root.get("amountEnd").as(float.class),
							inDTO.getAmountEnd()));
				}
				
				Predicate[] pre = new Predicate[predicate.size()];
				return query.where(predicate.toArray(pre)).getRestriction();
			}
		};
	}
	
}
