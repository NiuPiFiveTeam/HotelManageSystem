package com.hmm.finance.logisticst.domain;

public class InStorageDetailedDTO {
	private Long inStorageDetailedId;
	private String goodsName;//商品名，例：牙刷
	private String unit;//单位，例：只
	private float price;//单价，例：10元/只
	private float amount;//数量，例:100只

	
	
	public InStorageDetailedDTO() {
		super();
	}
	public InStorageDetailedDTO(Long inStorageDetailedId, String goodsName, String unit, float price, float amount) {
		super();
		this.inStorageDetailedId = inStorageDetailedId;
		this.goodsName = goodsName;
		this.unit = unit;
		this.price = price;
		this.amount = amount;
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

	public Long getInStorageDetailedId() {
		return inStorageDetailedId;
	}
	public void setInStorageDetailedId(Long inStorageDetailedId) {
		this.inStorageDetailedId = inStorageDetailedId;
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
	
	
}
