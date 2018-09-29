package com.hmm.finance.financeReportDaily.Repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.finance.financeReportDaily.domain.FinanceReportDaily;


@Repository
public interface FinanceReportDailyRepository extends PagingAndSortingRepository<FinanceReportDaily, Long>,JpaSpecificationExecutor<FinanceReportDaily>
{
	@Query("from FinanceReportDaily") 
	public List<FinanceReportDaily> findAllFinanceReportDaily(); 
	
	@Query("from FinanceReportDaily where year(date)=?1") 
	public List<FinanceReportDaily> findFinanceReportDailyByYear(Integer year);

	@Query("from FinanceReportDaily where year(date)=?1 and month(date)=?2") 
	public List<FinanceReportDaily> findFinanceReportDailyByYearAndMonth(Integer year,Integer month); 
	
//	@Query(value ="select month(date) month,sum(room_income) ,sum(logisticst_cost),sum(salary_cost) from t_finance_report_daily where year(date)=2018 group by month(date) ", nativeQuery = true)
//	public List<FinanceReport> findFinanceReportDailyByYearGroupByMonth(Integer year); 
	@Query("select month(date) as month,sum(t.salaryCost) as salaryCost,sum(t.logisticstCost) as logisticstCost,sum(t.roomIncome) as roomIncome,sum(t.profit) as profit "
			+ "from FinanceReportDaily t " 
			+ "where year(date)=?1 " 
			+ "group by month(date)") 
	public List<Map<Object,Object>> findFinanceReportDailyByYearGroupByMonth(Integer year); 
}
