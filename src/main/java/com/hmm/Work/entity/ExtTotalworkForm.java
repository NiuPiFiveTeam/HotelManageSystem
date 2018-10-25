package com.hmm.Work.entity;

public class ExtTotalworkForm {
	private boolean success= true;
	private WorkTatalRecord data;
	
	public ExtTotalworkForm() {}
	
	public ExtTotalworkForm(boolean success) {
		this.success = success;
	}

	public ExtTotalworkForm(boolean success,WorkTatalRecord data) {
		this.success = success;
		this.setData(data);
	}	
	
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public WorkTatalRecord getData() {
		return data;
	}
	public void setData(WorkTatalRecord data) {
		this.data = data;
	}
	
	
}
