package com.hmm.logistics.stock.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.common.web.ExtjsPageRequest;
import com.hmm.logistics.stock.dto.OutDTO;
import com.hmm.logistics.stock.service.IInDetailedService;
import com.hmm.logistics.stock.service.IOutDetailedService;
import com.hmm.logistics.stock.service.IOutStorageService;
import com.hmm.logistics.stock.service.IStockService;

@RestController
@RequestMapping("Out")
public class OutController {
	@Autowired
	private  IInDetailedService inDetailedService;
	@Autowired
	private  IOutDetailedService outDetailedService;
	@Autowired
	private  IOutStorageService outStorageService;
	@Autowired
	private  IStockService stockService;
	
	@GetMapping
	public Page<OutDTO> getOutPage(OutDTO outDTO,ExtjsPageRequest pageRequest){
		return null;
	}
}
