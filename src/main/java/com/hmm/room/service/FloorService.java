package com.hmm.room.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hmm.room.entity.Floor;
import com.hmm.room.repository.FloorRepository;
import com.hmm.room.util.TreeNode;



@Service
public class FloorService implements IFloorService {

	@Autowired
	private FloorRepository floorRepository;
	
	@Override
	public List<TreeNode> findNodes(Long parentId) 
	{
		List<TreeNode> nodeList = new ArrayList<TreeNode>(); //节点list
		
		List<Floor> lists;
		
		if(parentId==null) {  //如果 父id为null，说明是 root 节点
			lists =  floorRepository.findParentNodes();
		}else {
			lists =  floorRepository.findChildNodes(parentId);
		}
		
		for(Floor f : lists) {
			TreeNode node  = new TreeNode();
			
			node.setId(f.getFloorId());
			node.setText(f.getFloorName());
			
			if(f.getChildNodes()!=null) {
				if(f.getChildNodes().size()>0) {
					node.setLeaf(false);//设置为父节点
				}else {
					node.setLeaf(true);//设置为子节点
				}
			}
			nodeList.add(node);
		}
		return nodeList;
	}

	
}
