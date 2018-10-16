package com.hmm.activiti.config;

import org.activiti.engine.IdentityService;
import org.activiti.engine.identity.Group;
import org.activiti.engine.identity.User;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

//@Component
public class InitUsersAndGroupsDB {

    @Bean
    InitializingBean usersAndGroupsInitializer(final IdentityService identityService) {
        return new InitializingBean() {
            public void afterPropertiesSet() throws Exception {

        		Group group =identityService.newGroup("admin"); // 实例化组实体
        		group.setType("security-role");
        		group.setName("管理员");
        		
        		Group group2 =identityService.newGroup("generalManager"); // 实例化组实体
        		group2.setName("总经理");
        		Group group3 =identityService.newGroup("secretary"); // 实例化组实体
        		group3.setName("总经理秘书");

        		Group group4 =identityService.newGroup("hrManager"); // 实例化组实体
        		group4.setName("人事经理");
        		Group group5 =identityService.newGroup("hrClerk"); // 实例化组实体
        		group5.setName("人事文员");

        		Group group6 =identityService.newGroup("marketingManager"); // 实例化组实体
        		group6.setName("市场经理");
        		Group group7 =identityService.newGroup("marketingClerk"); // 实例化组实体
        		group7.setName("市场文员");

        		Group group8 =identityService.newGroup("financeManager"); // 实例化组实体
        		group8.setName("财务经理");
        		Group group9 =identityService.newGroup("financeClerk"); // 实例化组实体
        		group9.setName("财务文员");

        		identityService.saveGroup(group);
        		identityService.saveGroup(group2);
        		identityService.saveGroup(group3);
        		identityService.saveGroup(group4);
        		identityService.saveGroup(group5);
        		identityService.saveGroup(group6);
        		identityService.saveGroup(group7);
        		identityService.saveGroup(group8);
        		identityService.saveGroup(group9);
        		
        		User admin = identityService.newUser("admin");
        		admin.setPassword("admin");
                identityService.saveUser(admin);
              
                for (int i = 1; i <=8; i++) {
                	 User user = identityService.newUser("user"+i);
             		 user.setPassword("user"+i);
                     identityService.saveUser(user);
        		}
        		
        		identityService.createMembership("admin", "admin");
        		identityService.createMembership("user1", "generalManager");
        		identityService.createMembership("user2", "secretary");
        		identityService.createMembership("user3", "hrManager");
        		identityService.createMembership("user4", "hrClerk");
        		identityService.createMembership("user5", "marketingManager");
        		identityService.createMembership("user6", "marketingClerk");
        		identityService.createMembership("user7", "financeManager");
        		identityService.createMembership("user8", "financeClerk");
            }
        };
    }
}
