package com.hmm.logistics.stock.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.hmm.logistics.stock.entity.OutStorage;


/**
 * 
* @Title: IOutStorageService.java
* @Package com.hmm.logistics.stock.service
* @Description: TODO(出库总表接口业务流程)
* @author DJDU
* @date 2018年10月9日
* @version V1.0
 */
public interface IOutStorageService {
	public OutStorage save(OutStorage entity);//保存和更新
	public long count();//得出记录总数
	public Page<OutStorage> findAll(Specification<OutStorage> spec, Pageable pageable);//分页查找数据
	public void deleteById(Long id);//删除记录
	public OutStorage findById(Long id);
	public boolean existsById(Long id);
	public void deleteAll(Long[] ids);
}
