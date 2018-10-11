package com.hmm.system;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;
import org.activiti.engine.IdentityService;
import org.activiti.engine.identity.Group;
import org.activiti.engine.identity.User;
import org.apache.commons.lang3.ArrayUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hmm.common.SessionUtil;
import com.hmm.common.web.ExtAjaxResponse;
import com.hmm.employee.service.EmployeeService;



@RestController
public class LoginController {
 	private static Logger logger = LoggerFactory.getLogger(LoginController.class);
    @Autowired
    private IdentityService identityService;
    
    @Autowired
    private EmployeeService  employService;
    /** 登录系统**/
    @RequestMapping(value = "/login")
    public @ResponseBody ExtAjaxResponse logon(@RequestParam("userName") String userName, @RequestParam("password") String password, HttpSession session) {
    	logger.debug("logon request: {userName={}, password={}}", userName, password);
        boolean checkPassword = identityService.checkPassword(userName, password);
        if (checkPassword) {
            // 查看用户是否存在
            User user = identityService.createUserQuery().userId(userName).singleResult();
            SessionUtil.setUser(session, user);
	  
	        //读取角色Group
            List<Group> groupList = identityService.createGroupQuery().groupMember(user.getId()).list();

            SessionUtil.setGroupList(session, groupList);

            String[] groupNames = new String[groupList.size()];
            for (int i = 0; i < groupNames.length; i++) {
                groupNames[i] = groupList.get(i).getName();
            }
            SessionUtil.setGroupNames(session, ArrayUtils.toString(groupNames));//"groupNames"  : "admin,hrManager"
            
            Map<String,String> map=new HashMap<String, String>();
            map.put("userName", userName);
            map.put("msg", "登录成功!");
            return new ExtAjaxResponse(true,map);
        } else {
        	return new ExtAjaxResponse(false,"登录失败!帐号或者密码有误!请重新登录!");
        }
    }
    /** 退出登录**/
    @RequestMapping(value = "/logout")
    public @ResponseBody ExtAjaxResponse logout(HttpSession session) 
    {
    	try {
    		SessionUtil.removeAttribute(session);
        	return new ExtAjaxResponse(true,"登出成功!");
		} catch (Exception e) {
			return new ExtAjaxResponse(false,"登出失败!");
		}
    }
    
    
    @RequestMapping(value = "/editPassword")
    public @ResponseBody ExtAjaxResponse editPassword(@RequestParam("newpassword") String newpassword ,@RequestParam("oldpassword") String oldpassword , HttpSession session) {
    	try {
    		String userId = SessionUtil.getUserName(session);
    		boolean checkPassword = identityService.checkPassword(userId, oldpassword);
    		if(checkPassword) {
    		User user = identityService.createUserQuery().userId(userId).singleResult();
    		user.setPassword(newpassword);
    		identityService.saveUser(user);
    		employService.updatePassword(newpassword, userId);
    		return new ExtAjaxResponse(true,"修改成功");
    		}else {
    			return new ExtAjaxResponse(false,"失败!");
    		}
    		
		} catch (Exception e) {
			// TODO: handle exception
			return new ExtAjaxResponse(false,"失败!");
		}
    }
    
    @RequestMapping(value = "/checkpwd")
    public @ResponseBody ExtAjaxResponse checkpwd(@RequestParam("oldpassword") String oldpassword , HttpSession session) {
    	try {
    		String userId = SessionUtil.getUserName(session);
    		boolean checkPassword = identityService.checkPassword(userId, oldpassword);
    		if(checkPassword) {
    		return new ExtAjaxResponse(true,"成功");
    		}else {
    			return new ExtAjaxResponse(false,"失败!");
    		}
    		
		} catch (Exception e) {
			// TODO: handle exception
			return new ExtAjaxResponse(false,"失败!");
		}
    }
    
    @RequestMapping(value = "/checkUser")
    public @ResponseBody ExtAjaxResponse checkUser(HttpSession session) {
    	try {
    		String userId = SessionUtil.getUserName(session);
    		
    		if(null != userId) {
    			//读取角色Group
    			User user = identityService.createUserQuery().userId(userId).singleResult();
                List<Group> groupList = identityService.createGroupQuery().groupMember(user.getId()).list();

                SessionUtil.setGroupList(session, groupList);

                String[] groupNames = new String[groupList.size()];
                for (int i = 0; i < groupNames.length; i++) {
                    groupNames[i] = groupList.get(i).getName();
                }
                SessionUtil.setGroupNames(session, ArrayUtils.toString(groupNames));//"groupNames"  : "admin,hrManager"
                
                Map<String,String> map=new HashMap<String, String>();
                map.put("userName", userId);
                map.put("msg", "登录成功!");
                return new ExtAjaxResponse(true,map);
    			
                
    		}else {
    			return new ExtAjaxResponse(false,"系统未登入!");
    		}
    		
		} catch (Exception e) {
			// TODO: handle exception
			return new ExtAjaxResponse(false,"失败!");
		}
    }
}
