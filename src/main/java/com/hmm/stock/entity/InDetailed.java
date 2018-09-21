package com.hmm.stock.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;



@Entity
@Table(name="t_inDetailed")
public class InDetailed {
	private int id;
	private String goodsName;//商品名，例：牙刷
	private String unit;//单位，例：只
	private float price;//单价，例：10元/只
	private float amount;//数量，例:100只
	private InAll inAll;//父入库记录
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getId() {
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
	public InAll getInAll() {
		return inAll;
	}
	
	
	public void setId(int id) {
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
	public void setInAll(InAll inAll) {
		this.inAll = inAll;
	}
	
	

	
	
	
}
