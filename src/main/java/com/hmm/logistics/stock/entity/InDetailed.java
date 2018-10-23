package com.hmm.logistics.stock.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.hmm.finance.logisticst.domain.InStorage;
/**
 * 
* @Title: InDetailed.java
* @Package com.hmm.stock.entity
* @Description: 入库详细表实体类
* @author DJDU
* @date 2018年9月21日
* @version V1.4
 */

@Entity
@Table(name="t_inDetailed")
public class InDetailed {
	private Long id;
	private String goodsName;//商品名，例：牙刷
	private String unit;//单位，例：只
	private float price;//单价，例：10元/只
	private float amount;//数量，例:100只
	private String goodsNo;//物品编号
	
	
	private InStorage inAll;//父入库记录
	
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
	public float getPrice() {
		return price;
	}
	public float getAmount() {
		return amount;
	}
	@ManyToOne//多对一级联删除，使用ALL建议先移除关系（update）再delete
	public InStorage getInAll() {
		return inAll;
	}
	public String getGoodsNo() {
		return goodsNo;
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
	public void setPrice(float price) {
		this.price = price;
	}
	public void setAmount(float amount) {
		this.amount = amount;
	}
	public void setInAll(InStorage inAll) {
		this.inAll = inAll;
	}
	public void setGoodsNo(String goodsNo) {
		this.goodsNo = goodsNo;
	}
	

	
	
	
}
