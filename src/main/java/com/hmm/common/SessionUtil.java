package com.hmm.common;

import java.util.List;
import javax.servlet.http.HttpSession;
import org.activiti.engine.identity.Group;
import org.activiti.engine.identity.User;
public class SessionUtil 
{
	public static final String USER 		= "user";
	public static final String USERNAME 	= "userName";
	public static final String GROUPS 		= "groups";
	public static final String GROUPNAMES 	= "groupNames";
	public static final String DEPTNAME 	= "deptName";
	public static final String LOGINTYPE 	= "logintype";
	public static final String IMAGE 	= "image";
    /**
     * 设置用户到session
     */
    public static void setUser(HttpSession session, User user) {
        session.setAttribute(USER, user);
		setUserName(session,user.getId());
    }

    /**
     * 从Session获取当前用户信息
     */
    public static User getUser(HttpSession session) {
        	Object user = session.getAttribute(USER);
        	return user == null ? null : (User) user;
    }
    
    public static void setDeptName(HttpSession session, String deptName) {
        session.setAttribute(DEPTNAME, deptName);		
    }
    
    public static void setIamge(HttpSession session, String Image) {
        session.setAttribute(IMAGE, Image);		
    }

    /**
     * 从Session获取当前用户信息
     */
    public static String getDeptName(HttpSession session) {
        	String deptName = (String) session.getAttribute(DEPTNAME);
        	return deptName == null ? null : deptName;
    }
    public static void setLogintype(HttpSession session, String logintype) {
        session.setAttribute(LOGINTYPE, logintype);		
    }

    /**
     * 从Session获取当前用户信息
     */
    public static String getLogintyp(HttpSession session) {
        	String logintype = (String) session.getAttribute(LOGINTYPE);
        	return logintype == null ? null : logintype;
    }
    
    public static String getImage(HttpSession session) {
    	String image = (String) session.getAttribute(IMAGE);
    	return image == null ? null : image;
}
    
    /**
     * 设置用户到session
     */
    public static void setUserName(HttpSession session, String userName) {
        	session.setAttribute(USERNAME, userName);
    }

    /**
     * 从Session获取当前用户信息
     */
    public static String getUserName(HttpSession session) {
        	Object userName = session.getAttribute(USERNAME);
        	return userName == null ? null : (String) userName;
    }

    /**
     * 设置groups到session
     */
    public static void setGroupList(HttpSession session, List<Group> groupList) {
        	session.setAttribute(GROUPS, groupList);
    }

    /**
     * 从Session获取当前groups信息
     */
    @SuppressWarnings("unchecked")
	public static List<Group> getGroupList(HttpSession session) {
        	Object groupList = session.getAttribute(GROUPS);
        	return groupList == null ? null : (List<Group>) groupList;
    }

    /**
     * 设置groups到session
     */
    public static void setGroupNames(HttpSession session, String groupNames) {
        	session.setAttribute(GROUPNAMES, groupNames);
    }

    /**
     * 从Session获取当前groups信息
     */
	public static String getGroupNames(HttpSession session) {
        	Object groupNames = session.getAttribute(GROUPNAMES);
        	return groupNames == null ? null : (String) groupNames;
    }
	
	public static void removeAttribute(HttpSession session) {
		session.removeAttribute(USER);
		session.removeAttribute(USERNAME);
         session.removeAttribute(GROUPS);
         session.removeAttribute(GROUPNAMES);
         session.removeAttribute(DEPTNAME);
         session.removeAttribute(LOGINTYPE);
    }
}

