package com.hmm.logistics.stock.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.hmm.finance.logisticst.domain.InStorage;

/**
 * 
* @Title: OutDetailed.java
* @Package com.hmm.logistics.stock.entity
* @Description: TODO(出库详细表实体类)
* @author DJDU
* @date 2018年10月8日
* @version V1.0
 */

@Entity
@Table(name="t_OutDetailed")
public class OutDetailed {
	private Long id;
	private String goodsName;//商品名，例：牙刷
	private String unit;//单位，例：只
	private float amount;//数量，例:100只
	private OutStorage outStorage;//出库记录总表
	
	
	

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}
	public String getGoodsName() {
		return goodsName;
	}
	public String getUnit() {
		return unit;
	}
	public float getAmount() {
		return amount;
	}
	@ManyToOne
	public OutStorage getOutStorage() {
		return outStorage;
	}
	
	
	public void setId(Long id) {
		this.id = id;
	}
	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public void setAmount(float amount) {
		this.amount = amount;
	}
	public void setOutStorage(OutStorage outStorage) {
		this.outStorage = outStorage;
	}
	
	
}
