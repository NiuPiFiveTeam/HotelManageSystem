package com.hmm.logistics.stock.dto;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import com.hmm.finance.logisticst.domain.InStorage;
import com.hmm.logistics.stock.entity.InDetailed;

public class ShowInDetailedWinGrilDTO {
	private String goodsName;
	private String unit;
	private float amount;
	private String stockType;
	private String goodsNo;//物品编号
	private String inStorageId;//总订单编号
	
	
	public String getInStorageId() {
		return inStorageId;
	}
	public void setInStorageId(String inStorageId) {
		this.inStorageId = inStorageId;
	}
	public String getGoodsNo() {
		return goodsNo;
	}
	public void setGoodsNo(String goodsNo) {
		this.goodsNo = goodsNo;
	}
	public String getGoodsName() {
		return goodsName;
	}
	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public float getAmount() {
		return amount;
	}
	@Override
	public String toString() {
		return "ShowInDetailedWinGrilDTO [goodsName=" + goodsName + ", unit=" + unit + ", amount=" + amount
				+ ", stockType=" + stockType + ", goodsNo=" + goodsNo + ", inStorageId=" + inStorageId + "]";
	}
	public void setAmount(float amount) {
		this.amount = amount;
	}
	public String getStockType() {
		return stockType;
	}
	public void setStockType(String stockType) {
		this.stockType = stockType;
	}
	
	@SuppressWarnings({ "serial"})
	public static Specification<InDetailed> getWhereClause(final ShowInDetailedWinGrilDTO showInDetailedWinGrilDTO) {
		return new Specification<InDetailed>() {
			@Override
			public Predicate toPredicate(Root<InDetailed> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
			
				List<Predicate> predicate = new ArrayList<>();
				
				if (StringUtils.isNotBlank(showInDetailedWinGrilDTO.getInStorageId())) {
					Join<InStorage,InDetailed> join=root.join("inAll",JoinType.LEFT);
					predicate.add(criteriaBuilder.like(join.get("inStorageId").as(String.class),
							"%" + showInDetailedWinGrilDTO.getInStorageId() + "%"));
					}
				
				Predicate[] pre = new Predicate[predicate.size()];
				return query.where(predicate.toArray(pre)).getRestriction();
			}
		};
	}
	
}
