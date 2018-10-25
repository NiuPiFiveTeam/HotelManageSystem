package com.hmm.logistics.loseGoods.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.hmm.logistics.loseGoods.entity.LoseGoods;
import com.hmm.logistics.stock.entity.DoSend;

public interface ILoseGoodsService {
	public LoseGoods save(LoseGoods entity);//保存和更新
	public Page<LoseGoods> findAll(Specification<LoseGoods> specification, Pageable pageable);//分页查找数据
}
