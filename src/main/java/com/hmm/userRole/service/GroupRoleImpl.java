package com.hmm.userRole.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.hmm.department.entity.Department;
import com.hmm.department.service.DeptService;
import com.hmm.userRole.dao.GroupRoleDao;
import com.hmm.userRole.entity.GroupRole;
import com.hmm.userRole.entity.GroupRoleDTO;




@Service
public class GroupRoleImpl implements GroupRoleService {

	@Autowired 
	private GroupRoleDao groupRoleDao;
	
	@Autowired
	private DeptService deptService;
	
	@Autowired
	private com.hmm.activiti.service.IWorkflowService IWorkflowService;
	@Override
	public void save(GroupRoleDTO entitydto) {
		// TODO Auto-generated method stub
		GroupRole groupRole = groupRoleDao.findByGroupId(entitydto.getGroupId());
		if(null == groupRole) {
			GroupRole groupRole2 = new GroupRole();
			GroupRoleDTO.dtoToEntity(entitydto, groupRole2);
			
			Department department = deptService.findByDeptName(entitydto.getDeptName());
			if(null != department) {
				groupRole2.setDepartment(department);
				IWorkflowService.addGroup(entitydto.getGroupId(), entitydto.getGroupName(), entitydto.getDeptName());
			}
			
			groupRoleDao.save(groupRole2);
		}
	}

	@Override
	public Optional<GroupRole> findById(Integer id) {
		// TODO Auto-generated method stub
		return groupRoleDao.findById(id);
	}

	@Override
	public boolean existsById(Integer id) {
		// TODO Auto-generated method stub
		return groupRoleDao.existsById(id);
	}

	@Override
	public void deleteById(Integer id) {
		// TODO Auto-generated method stub
		GroupRole groupRole = groupRoleDao.findById(id).get();
		IWorkflowService.deleteGroup(groupRole.getGroupId());
		groupRoleDao.deleteById(id);
		
		
	}

	@Override
	public Page<GroupRoleDTO> findAllByDTO(GroupRoleDTO deptDTO, Pageable pageable) {
		// TODO Auto-generated method stub

		return null;
	}

	@Override
	public Page<GroupRoleDTO> findAll(Specification<GroupRole> spec, Pageable pageable) {
		// TODO Auto-generated method stub
		List<GroupRole> list = groupRoleDao.findAll(spec);
		List<GroupRoleDTO> dtos= null;
		if(null != list) {
			dtos = new ArrayList<>();
			for (GroupRole groupRole : list) {
				GroupRoleDTO groupRoleDTO = new GroupRoleDTO();
				GroupRoleDTO.entityToDto(groupRole, groupRoleDTO);
				if(null != groupRole.getDepartment()) {
					groupRoleDTO.setDeptName(groupRole.getDepartment().getDeptName());
				}
				dtos.add(groupRoleDTO);
			}
		}
		return new PageImpl<GroupRoleDTO>(dtos, pageable,null!=list?list.size():0);
	}

	@Override
	public long count(Specification<GroupRole> spec) {
		// TODO Auto-generated method stub
		return groupRoleDao.count(spec);
	}

	@Override
	public void deleteAll(Integer[] ids) {
		// TODO Auto-generated method stub
		List<Integer> id = new ArrayList<>(Arrays.asList(ids));
		List<GroupRole> groupRoles = (List<GroupRole>) groupRoleDao.findAllById(id);
		groupRoleDao.deleteAll(groupRoles);
	}

	@Override
	public void save(GroupRole entity) {
		// TODO Auto-generated method stub
		groupRoleDao.save(entity);
	}

	@Override
	public GroupRole findByGroupName(String groupName) {
		// TODO Auto-generated method stub
		return groupRoleDao.findByGroupName(groupName);
	}

}
