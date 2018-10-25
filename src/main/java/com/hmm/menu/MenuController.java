package com.hmm.menu;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.TreeNode;
import com.hmm.common.web.ExtjsPageRequest;
import com.hmm.guest.dto.GuestDto;

@RestController
@RequestMapping("/menu")
public class MenuController {

	@RequestMapping("/findMenu")
	public List<TreeNode> findMenu(String userName,String loginType){
	
		List<TreeNode> treeNodes = null;
		return null;
	}
}
