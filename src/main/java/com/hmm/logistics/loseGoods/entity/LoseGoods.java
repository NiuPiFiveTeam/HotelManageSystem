package com.hmm.logistics.loseGoods.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import com.hmm.logistics.stock.dto.OutDTO;
import com.hmm.logistics.stock.entity.OutStorage;

@Entity
@Table(name="loseGoods")
public class LoseGoods {
	private Long id;
	private String goodsName;
	private String goodsRepresent;
	private String goodsPut;
	private String goodsGet;
	private String goodsGetNo;
	private String goodsGetPhone;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}
	public String getGoodsName() {
		return goodsName;
	}
	public String getGoodsRepresent() {
		return goodsRepresent;
	}
	public String getGoodsPut() {
		return goodsPut;
	}
	public String getGoodsGet() {
		return goodsGet;
	}
	public String getGoodsGetNo() {
		return goodsGetNo;
	}
	public String getGoodsGetPhone() {
		return goodsGetPhone;
	}
	
	
	public void setId(Long id) {
		this.id = id;
	}
	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
	}
	public void setGoodsRepresent(String goodsRepresent) {
		this.goodsRepresent = goodsRepresent;
	}
	public void setGoodsPut(String goodsPut) {
		this.goodsPut = goodsPut;
	}
	public void setGoodsGet(String goodsGet) {
		this.goodsGet = goodsGet;
	}
	public void setGoodsGetNo(String goodsGetNo) {
		this.goodsGetNo = goodsGetNo;
	}
	public void setGoodsGetPhone(String goodsGetPhone) {
		this.goodsGetPhone = goodsGetPhone;
	}
	

	
}
