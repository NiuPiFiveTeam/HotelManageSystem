package com.hmm.logistics.stock.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.hmm.logistics.stock.entity.DoSend;

public interface DoSendRepository extends PagingAndSortingRepository<DoSend, Long>,JpaSpecificationExecutor<DoSend>{

}
