package com.hmm.Work.entity;

public class ExtworkForm {
	private boolean success= true;
	private WorkRecord data;
	
	public ExtworkForm() {}
	
	public ExtworkForm(boolean success) {
		this.success = success;
	}

	public ExtworkForm(boolean success,WorkRecord data) {
		this.success = success;
		this.setData(data);
	}
	
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public WorkRecord getData() {
		return data;
	}
	public void setData(WorkRecord data) {
		this.data = data;
	}
	
	
	
}
