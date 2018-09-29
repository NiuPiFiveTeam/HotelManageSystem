package com.hmm.finance.financeReport.service;

import java.util.List;

import com.hmm.finance.financeReport.domain.FinanceReport;

public interface IFinanceReportService {
	public List<FinanceReport> findFinanceReportDailyByYearGroupByMonth(Integer year);
}
