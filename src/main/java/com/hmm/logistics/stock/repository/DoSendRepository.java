package com.hmm.logistics.stock.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.logistics.stock.entity.DoSend;

@Repository
public interface DoSendRepository extends PagingAndSortingRepository<DoSend, Long>,JpaSpecificationExecutor<DoSend>{

}
