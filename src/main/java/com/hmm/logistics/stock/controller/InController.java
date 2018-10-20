package com.hmm.logistics.stock.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.common.web.ExtjsPageRequest;
import com.hmm.logistics.stock.dto.InDTO;
import com.hmm.logistics.stock.dto.InSendDTO;
import com.hmm.logistics.stock.service.IInDetailedService;
import com.hmm.logistics.stock.service.IOutDetailedService;
import com.hmm.logistics.stock.service.IOutStorageService;
import com.hmm.logistics.stock.service.IStockService;

@RestController
@RequestMapping("In")
public class InController {
	@Autowired
	private  IInDetailedService inDetailedService;
	@Autowired
	private  IOutDetailedService outDetailedService;
	@Autowired
	private  IOutStorageService outStorageService;
	@Autowired
	private  IStockService stockService;
	
	@GetMapping
	public Page<InDTO> getInPage(InDTO inDTO,ExtjsPageRequest pageRequest){
		return null;
	}
	

	
}
