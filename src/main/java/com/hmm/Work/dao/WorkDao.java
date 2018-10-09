package com.hmm.Work.dao;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.Work.entity.Work;



@Repository
public interface WorkDao extends JpaSpecificationExecutor<Work> , PagingAndSortingRepository<Work, Integer> {

}
