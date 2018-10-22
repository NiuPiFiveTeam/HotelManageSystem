package com.hmm.finance.roomOrder.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.common.web.ExtAjaxResponse;
import com.hmm.common.web.ExtjsPageRequest;

@RestController
@RequestMapping(value="/roomOrder")
public class roomOrderController {
	
	@RequestMapping(value = "/save")
    public ExtAjaxResponse save() {
		return null;
    }
	
}
