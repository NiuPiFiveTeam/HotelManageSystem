package com.hmm.room.dto;

/**
 * 	日用品菜单
 * @author huangxinjian
 *
 */
public class DailyNecessaryDto {

	private String id; //Daily_  拼接 name
	private String show; //展示的名称
	private String name; //用来生成 组件的名称
	private String number;  //某个日用品的数量
	public String getId() {
		return id;
	}
	public String getShow() {
		return show;
	}
	public String getName() {
		return name;
	}
	public String getNumber() {
		return number;
	}
	public void setId(String id) {
		this.id = id;
	}
	public void setShow(String show) {
		this.show = show;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	
	
}
