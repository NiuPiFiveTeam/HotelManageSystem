package com.hmm.logistics.loseGoods.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

public class LoseGoodsDTO {
	private Long id;
	private String goodsName;
	private String goodsRepresent;
	private String goodsPut;
	private String goodsGet;
	private String goodsGetNo;
	private String goodsGetPhone;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getGoodsName() {
		return goodsName;
	}
	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
	}
	public String getGoodsRepresent() {
		return goodsRepresent;
	}
	public void setGoodsRepresent(String goodsRepresent) {
		this.goodsRepresent = goodsRepresent;
	}
	public String getGoodsPut() {
		return goodsPut;
	}
	public void setGoodsPut(String goodsPut) {
		this.goodsPut = goodsPut;
	}
	public String getGoodsGet() {
		return goodsGet;
	}
	public void setGoodsGet(String goodsGet) {
		this.goodsGet = goodsGet;
	}
	public String getGoodsGetNo() {
		return goodsGetNo;
	}
	public void setGoodsGetNo(String goodsGetNo) {
		this.goodsGetNo = goodsGetNo;
	}
	public String getGoodsGetPhone() {
		return goodsGetPhone;
	}
	public void setGoodsGetPhone(String goodsGetPhone) {
		this.goodsGetPhone = goodsGetPhone;
	}
	
	@SuppressWarnings({ "serial"})
	public static Specification<LoseGoods> getWhereClause(final LoseGoodsDTO loseGoodsDTO) {
		return new Specification<LoseGoods>() {
			@Override
			public Predicate toPredicate(Root<LoseGoods> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				List<Predicate> predicate = new ArrayList<>();
				Predicate[] pre = new Predicate[predicate.size()];
				return query.where(predicate.toArray(pre)).getRestriction();
			}
		};
	}
	
	
}
