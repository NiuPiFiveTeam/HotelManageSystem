package com.hmm.userRole.entity;

import org.springframework.beans.BeanUtils;


public class GroupRoleDTO {
	private Integer groupTable_id;
	private String groupName;
	private String groupId;
	private String deptName;


	//后到前：1.针对“前端”设计的数据封装对象(查询)
	public static void entityToDto(GroupRole entity,GroupRoleDTO dto ) {
		BeanUtils.copyProperties(entity, dto);			
	}
	//前到后：2.维护多个对象 的数据 以及 对象之间的关联关系 (创建关联、更新关联)
	public static void dtoToEntity(GroupRoleDTO dto ,GroupRole entity) {
		BeanUtils.copyProperties(dto, entity);
				
	}
	
	
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public String getGroupId() {
		return groupId;
	}
	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public Integer getGroupTable_id() {
		return groupTable_id;
	}
	public void setGroupTable_id(Integer groupTable_id) {
		this.groupTable_id = groupTable_id;
	}
	public String getDeptName() {
		return deptName;
	}
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	
}
