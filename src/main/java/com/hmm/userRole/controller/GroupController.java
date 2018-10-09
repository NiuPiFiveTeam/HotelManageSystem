package com.hmm.userRole.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.common.beans.BeanUtils;
import com.hmm.common.web.ExtAjaxResponse;
import com.hmm.common.web.ExtjsPageRequest;
import com.hmm.userRole.entity.GroupRole;
import com.hmm.userRole.entity.GroupRoleDTO;
import com.hmm.userRole.entity.GroupRoleQueryDTO;
import com.hmm.userRole.service.GroupRoleService;



@RestController
@RequestMapping("group")
public class GroupController {
	@Autowired
	private GroupRoleService groupRoleService;
	
	@PostMapping
	public ExtAjaxResponse saveGroup(@RequestBody GroupRoleDTO groupRoleDTO) {
		try {
			groupRoleService.save(groupRoleDTO);
			return new ExtAjaxResponse(true,"添加成功");
		} catch (Exception e) {
			// TODO: handle exception
			return new ExtAjaxResponse(true,"添加失败");
		}
	}
	
	@PutMapping("{groupTable_id}")
	public ExtAjaxResponse update(@PathVariable("groupTable_id") Integer groupTable_id,@RequestBody GroupRoleDTO groupRoleDTO) {
		try {
			GroupRole groupRole = groupRoleService.findById(groupTable_id).get();
			if(null != groupRole) {
				BeanUtils.copyProperties(groupRoleDTO, groupRole);
				GroupRoleDTO.entityToDto(groupRole, groupRoleDTO);
				groupRoleService.save(groupRoleDTO);
			}
			
			return new ExtAjaxResponse();
		} catch (Exception e) {
			// TODO: handle exception
			return new ExtAjaxResponse();
		}
	}
	
	@GetMapping
	public Page<GroupRoleDTO> findDTO(GroupRoleQueryDTO deptQueryDTO , ExtjsPageRequest pageRequest) {
		return groupRoleService.findAll(GroupRoleQueryDTO.getWhereClause(deptQueryDTO), pageRequest.getPageable());
	}
	
	@DeleteMapping("{groupTable_id}")
	public ExtAjaxResponse delete(@PathVariable("groupTable_id") Integer groupTable_id) {
		try {
			if(null != groupTable_id) {
				groupRoleService.deleteById(groupTable_id);
			}
			return new ExtAjaxResponse(true,"删除成功");	
		} catch (Exception e) {
			// TODO: handle exception
			return new ExtAjaxResponse(true,"删除失败");	
		}
	}
}
