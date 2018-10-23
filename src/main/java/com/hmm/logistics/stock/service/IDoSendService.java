package com.hmm.logistics.stock.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.hmm.finance.logisticst.domain.InStorage;
import com.hmm.logistics.stock.entity.DoSend;
import com.hmm.logistics.stock.entity.InDetailed;

public interface IDoSendService {
	public DoSend save(DoSend entity);//保存和更新
	public long count();//得出记录总数
	public Page<DoSend> findAll(Specification<DoSend> specification, Pageable pageable);//分页查找数据
	public void deleteById(Long id);//删除记录
	public DoSend findById(Long id);
	public boolean existsById(Long id);
	public void deleteAll(Long[] ids);
	public List<DoSend> findAll();
}
