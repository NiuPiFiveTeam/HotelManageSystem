package com.hmm.finance;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.hmm.finance.salary.domain.SalaryOrder;
import com.hmm.finance.salary.repository.SalaryOrderRepository;
import com.hmm.room.repository.RoomRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class financeTest {
	@Autowired
	private SalaryOrderRepository salaryOrderRepository;
	
//	@Test
//	public void test() {
//		List<SalaryOrder> a = salaryOrderRepository.findAmountByDay();
//		for(SalaryOrder b : a) {
//			System.out.println(b.getBasicwage());
//		}
//	}
}
