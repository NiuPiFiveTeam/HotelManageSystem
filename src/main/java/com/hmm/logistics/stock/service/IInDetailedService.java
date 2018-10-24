package com.hmm.logistics.stock.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.hmm.logistics.stock.entity.InDetailed;
import com.hmm.logistics.stock.entity.Stock;



/**
 * 
* @Title: IInDetailedService.java
* @Package com.hmm.logistics.stock.service
* @Description: TODO(入库详情表接口业务流程)
* @author DJDU
* @date 2018年10月9日
* @version V1.0
 */

public interface IInDetailedService {
	public InDetailed save(InDetailed entity);//保存和更新
	public long count();//得出记录总数
	public Page<InDetailed> findAll(Specification<InDetailed> spec, Pageable pageable);//分页查找数据
	public void deleteById(Long id);//删除记录
	public InDetailed findById(Long id);
	public boolean existsById(Long id);
	public void deleteAll(Long[] ids);
	public List<InDetailed> findAll(Specification<InDetailed> spec);
}
