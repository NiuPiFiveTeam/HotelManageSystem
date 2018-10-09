package com.hmm.userRole.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.Nullable;

import com.hmm.userRole.entity.GroupRole;
import com.hmm.userRole.entity.GroupRoleDTO;


public interface GroupRoleService {
	void save(GroupRoleDTO entitydto);
	Optional<GroupRole> findById(Integer id);
	boolean existsById(Integer id);
	void deleteById(Integer id);
	Page<GroupRoleDTO> findAllByDTO(GroupRoleDTO deptDTO, Pageable pageable);
	Page<GroupRoleDTO> findAll(@Nullable Specification<GroupRole> spec, Pageable pageable);
	long count(@Nullable Specification<GroupRole> spec);
	public void deleteAll(Integer[] ids);
//	public GroupRole findByDeptNo(String deptNo);
//	public GroupRole findByDeptName(String deptName);
	void save(GroupRole entity);
	
	public GroupRole findByGroupName(String groupName);
}
