package com.hmm.logistics.stock.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.hmm.logistics.stock.util.StockType;
import com.hmm.logistics.stock.util.YesOrNoSend;
/**
 * 
* @Title: Stock.java
* @Package com.hmm.logistics.stock.entity
* @Description: TODO(库存记录实体类)
* @author DJDU
* @date 2018年10月9日
* @version V1.0
 */
@Entity
@Table(name="t_stock")
public class Stock {
	private Long id;
	private String goodsName;//商品名，例：牙刷
	private String unit;//单位，例：只
	private float amount;//数量，例:100只
	private  StockType stockType;//商品类型
	private YesOrNoSend yesOrNoSend;
	private String goodsNo;//物品编号
	
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
	public StockType getStockType() {
		return stockType;
	}
	public YesOrNoSend getYesOrNoSend() {
		return yesOrNoSend;
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
	public void setAmount(float amount) {
		this.amount = amount;
	}
	public void setStockType(StockType stockType) {
		this.stockType = stockType;
	}
	public void setYesOrNoSend(YesOrNoSend yesOrNoSend) {
		this.yesOrNoSend = yesOrNoSend;
	}
	public void setGoodsNo(String goodsNo) {
		this.goodsNo = goodsNo;
	}
}
