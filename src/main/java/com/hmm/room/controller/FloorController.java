package com.hmm.room.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hmm.room.service.IFloorService;
import com.hmm.room.util.TreeNode;

@Controller
@RequestMapping("/floor")
public class FloorController {

	@Autowired
	private IFloorService floorService;
	
	/**
	 * 
	 * @param node
	 * 		默认根节点：node=root
	 * 		       子节点：node=node.id
	 * @return
	 */
	@RequestMapping("/findNodes")
	public @ResponseBody List<TreeNode> findNodesByParentId(@RequestParam("node") String node)
	{
		if(node.equals("root")) {
			return floorService.findNodes(null);
		}else {
			return floorService.findNodes(Long.parseLong(node));
		}
	}
}
