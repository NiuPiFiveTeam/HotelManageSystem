package com.hmm.logistics.stock.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.logistics.roomClean.entity.RoomClean;
import com.hmm.logistics.stock.entity.Stock;

/**
 * 
* @Title: StockRepository.java
* @Package com.hmm.logistics.stock.repository
* @Description: TODO(库存记录表与数据库的各种操作)
* @author DJDU
* @date 2018年10月9日
* @version V1.0
 */
@Repository
public interface StockRepository extends PagingAndSortingRepository<Stock, Long>,JpaSpecificationExecutor<Stock>{

	@Query("FROM Stock sc WHERE sc.goodsNo=?1") 
	public Stock findByGoodsNo(String goodsNo);
}
