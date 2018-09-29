package com.hmm.finance.financeReport.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.finance.financeReport.domain.FinanceReport;
import com.hmm.finance.financeReport.service.IFinanceReportService;
import com.hmm.finance.financeReportDaily.domain.FinanceReportDaily;

@RestController
@RequestMapping(value="/financeReport")
public class FinanceReportController {
	
	@Autowired
	private IFinanceReportService financeReportService;
	
	@GetMapping("{year}")
	public List<FinanceReport> findFinanceReportDailyByYearGroupByMonth(Integer year){
		year=2018;
		System.out.println(year);
		List<FinanceReport> b = financeReportService.findFinanceReportDailyByYearGroupByMonth(year);
		return b;
	}
	
}
