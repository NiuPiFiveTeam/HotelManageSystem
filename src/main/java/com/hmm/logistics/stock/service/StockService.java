package com.hmm.logistics.stock.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.hmm.logistics.stock.entity.Stock;
import com.hmm.logistics.stock.repository.StockRepository;
/**
 * 
* @Title: StockService.java
* @Package com.hmm.logistics.stock.service
* @Description: TODO(库存记录表的业务流程)
* @author DJDU
* @date 2018年10月9日
* @version V1.0
 */
public class StockService implements IStockService {
	@Autowired
	private StockRepository stockRepository;
	
	@Override
	public Stock save(Stock entity) {
		// TODO Auto-generated method stub
		return stockRepository.save(entity);
	}

	@Override
	public long count() {
		// TODO Auto-generated method stub
		return stockRepository.count();
	}

	@Override
	public Page<Stock> findAll(Specification<Stock> spec, Pageable pageable) {
		// TODO Auto-generated method stub
		return stockRepository.findAll(spec, pageable);
	}

	@Override
	public void deleteById(Long id) {
		// TODO Auto-generated method stub
		stockRepository.deleteById(id);
	}

	@Override
	public Stock findById(Long id) {
		// TODO Auto-generated method stub
		return stockRepository.findById(id).get();
	}

	@Override
	public boolean existsById(Long id) {
		// TODO Auto-generated method stub
		return stockRepository.existsById(id);
	}

	@Override
	public void deleteAll(Long[] ids) {
		// TODO Auto-generated method stub
		List<Long> idLists=new ArrayList<Long>(Arrays.asList(ids));
		List<Stock>stock=(List<Stock>)stockRepository.findAllById(idLists);
		if(stock!=null) {
			stockRepository.deleteAll(stock);
		}
	}

}
