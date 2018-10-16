package com.hmm.finance.financeReportDaily.service;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hmm.finance.financeReportDaily.Repository.FinanceReportDailyRepository;
import com.hmm.finance.financeReportDaily.domain.FinanceReportDaily;
import com.hmm.finance.salary.repository.SalaryOrderRepository;

@Service
@Transactional									
public class FinanceReportDailyService implements IFinanceReportDailyService {
	@Autowired
	private FinanceReportDailyRepository financeReportDailyRepository;
	@Autowired
	private SalaryOrderRepository salaryOrderRepository;
	
	@Override
	public void save(FinanceReportDaily financeReportDaily) {
		financeReportDailyRepository.save(financeReportDaily);
	}
	
	//activit服务任务自动生成报表(间隔24小时)
	@Override
	public void createDailyReport(Date date) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		String dateString = formatter.format(date);

		System.out.println(salaryOrderRepository.findSalaryByDay(dateString));
	}
	
	//查询所有记录
	@Override
	public Page<FinanceReportDaily> findAll(Specification<FinanceReportDaily> spec, Pageable pageable) {
		return financeReportDailyRepository.findAll(spec, pageable);
	}
	
	
	
	
	//根据年份，导出Excel
	@Override
	public List<FinanceReportDaily> exportExcelByYear(Integer year) {
		return financeReportDailyRepository.findFinanceReportDailyByYear(year);
	}
	//导出所有数据到Excel
	@Override
	public List<FinanceReportDaily> exportExcelByAll() {
		return financeReportDailyRepository.findAllFinanceReportDaily();
	}
	//根据年月，导出Excel
	@Override
	public List<FinanceReportDaily> exportExcelByYearAndMonth(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int year = cal.get(Calendar.YEAR);
		int month = cal.get(Calendar.MONTH)+1; 
		return financeReportDailyRepository.findFinanceReportDailyByYearAndMonth(year,month);
	}
	@Override
	public List<FinanceReportDaily> exportExcelBySelectIds(Long[] ids) {
		List<Long> idLists = new ArrayList<Long>(Arrays.asList(ids));
		
		return (List<FinanceReportDaily>) financeReportDailyRepository.findAllById(idLists);
	}

}
