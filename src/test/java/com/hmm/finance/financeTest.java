package com.hmm.finance;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.hmm.finance.financeReportDaily.Repository.FinanceReportDailyRepository;
import com.hmm.finance.financeReportDaily.domain.FinanceReportDaily;
import com.hmm.finance.logisticst.repository.InStorageRepository;
import com.hmm.finance.logisticst.service.InStorageService;
import com.hmm.finance.logisticst.util.MailUtil;
import com.hmm.finance.roomOrder.repository.RoomOrderRepository;
import com.hmm.finance.salary.domain.SalaryOrder;
import com.hmm.finance.salary.repository.SalaryOrderRepository;
import com.hmm.room.repository.RoomRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class financeTest {
	@Autowired
	private SalaryOrderRepository salaryOrderRepository;
	@Autowired
	private RoomOrderRepository roomOrderRepository;
	@Autowired
	private InStorageRepository inStorageRepository;
	@Autowired
	private FinanceReportDailyRepository financeReportDailyRepository;
	@Test
	public void test() {
		Date date = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		String dateString = formatter.format(date);
		
		Float a = salaryOrderRepository.findSalaryByDay(dateString);
		Float b = roomOrderRepository.findRoomOrderByDay(dateString);
		System.out.println(a);
		System.out.println(b);
		Float c = inStorageRepository.findInStorageOrderByDay(dateString);
		System.out.println(c);
		
		FinanceReportDaily asd = new FinanceReportDaily(b,c,a);
		asd.setDate(new Date());
		asd.setTotalIncome(b);
		asd.setTotalCost(a+c);
		asd.setProfit(asd.getRoomIncome()-asd.getLogisticstCost()-asd.getSalaryCost());
		financeReportDailyRepository.save(asd);
	}
}
