package com.hmm.finance.financeReportDaily.service;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.hmm.finance.financeReportDaily.domain.FinanceReportDaily;

public interface IFinanceReportDailyService{

	public List<FinanceReportDaily> exportExcelBySelectIds(Long[] ids);
	public List<FinanceReportDaily> exportExcelByYearAndMonth(Date date);
	public List<FinanceReportDaily> exportExcelByYear(Integer year);
	public List<FinanceReportDaily> exportExcelByAll();
	public void save(FinanceReportDaily financeReportDaily);
	public Page<FinanceReportDaily> findAll(Specification<FinanceReportDaily> spec, Pageable pageable);
	public void createDailyReport(Date date);
}
	
	





