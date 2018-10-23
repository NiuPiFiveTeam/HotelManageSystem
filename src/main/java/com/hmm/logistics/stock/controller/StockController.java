package com.hmm.logistics.stock.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.common.web.ExtAjaxResponse;
import com.hmm.common.web.ExtjsPageRequest;
import com.hmm.logistics.stock.dto.StockDTO;
import com.hmm.logistics.stock.entity.Stock;
import com.hmm.logistics.stock.service.IInDetailedService;
import com.hmm.logistics.stock.service.IOutDetailedService;
import com.hmm.logistics.stock.service.IOutStorageService;
import com.hmm.logistics.stock.service.IStockService;
import com.hmm.logistics.stock.util.StockType;
import com.hmm.logistics.stock.util.YesOrNoSend;

@RestController
@RequestMapping("Stock")
public class StockController {
	@Autowired
	private  IInDetailedService inDetailedService;
	@Autowired
	private  IOutDetailedService outDetailedService;
	@Autowired
	private  IOutStorageService outStorageService;
	@Autowired
	private  IStockService stockService;
	
	@GetMapping
	public Page<StockDTO> getOutPage(StockDTO stockDTO,ExtjsPageRequest pageRequest){
		Page<Stock> pageStock = stockService.findAll(StockDTO.getWhereClause(stockDTO), pageRequest.getPageable());
		List<Stock> listStock =pageStock.getContent();
		List<StockDTO> listStockDTO =new ArrayList<StockDTO>();
		for(Stock stock:listStock) {
			StockDTO stockDTOs=new StockDTO();
			stockDTOs.setId(stock.getId());
			stockDTOs.setAmount(stock.getAmount());
			stockDTOs.setGoodsName(stock.getGoodsName());
			stockDTOs.setUnit(stock.getUnit());
			stockDTOs.setGoodsNo(stock.getGoodsNo());
			if(stock.getStockType()==StockType.COMMODITY) {
				stockDTOs.setStockType("日用品");
			}
			else if(stock.getStockType()==StockType.DURABLE) {
				stockDTOs.setStockType("耐久品");
			}
			if(stock.getYesOrNoSend()==YesOrNoSend.YES) {
				stockDTOs.setYesOrNoSend("已申请");
			}
			else if(stock.getYesOrNoSend()==YesOrNoSend.NO) {
				stockDTOs.setYesOrNoSend("未申请");
			}
			else if(stock.getYesOrNoSend()==YesOrNoSend.ENOUGH) {
				stockDTOs.setYesOrNoSend("库存足够");
			}
			listStockDTO.add(stockDTOs);
		}
		
		return new PageImpl<StockDTO> (listStockDTO,  pageRequest.getPageable(), null!=listStockDTO?listStockDTO.size():0);
	}
	
	@PostMapping
	public ExtAjaxResponse saveEmploy(@RequestBody StockDTO stockDTO) {
		try {
			Stock stock=new Stock();
			stock.setAmount(stockDTO.getAmount());
			stock.setGoodsName(stockDTO.getGoodsName());
			stock.setYesOrNoSend(YesOrNoSend.NO);
			if(stockDTO.getStockType().equals("COMMODITY")) {
				stock.setStockType(StockType.COMMODITY);
			}
			else if(stockDTO.getStockType().equals("DURABLE")) {
				System.out.println(stockDTO.getStockType());
				stock.setStockType(StockType.DURABLE);
			}
			if(stockDTO.getStockType().equals("COMMODITY")) {
				stock.setStockType(StockType.COMMODITY);
			}
			stock.setGoodsNo(stockDTO.getGoodsNo());
			stock.setUnit(stockDTO.getUnit());
			stockService.save(stock);
			return new ExtAjaxResponse(true,"添加成功");
		} catch (Exception e) {
			
			return new ExtAjaxResponse(true,"添加失败");
		}
		
	}
	
}
