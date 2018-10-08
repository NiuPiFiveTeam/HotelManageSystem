package com.hmm.room.util;
/**
 * 参考：
 * 		http://blog.csdn.net/cl05300629/article/details/20466111
 * 		http://blog.csdn.net/leecho571/article/details/6799059
 * @author Administrator
 *
 */
public class TreeNode 
{
	private Long id;
	private String text;//显示的节点文本
	private boolean expanded = false;//节点是否展开
	private boolean leaf = false;	//是否为子节点，根据当前节点是否有子节点判断
	
	//private List<TreeNode> children = ArrayList<TreeNode>();	//子节点集合
    //private String iconCls;	//节点图标样式
	
	public Long getId() {
		return id;
	}
	public String getText() {
		return text;
	}
	public boolean isExpanded() {
		return expanded;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setText(String text) {
		this.text = text;
	}
	public void setExpanded(boolean expanded) {
		this.expanded = expanded;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	@Override
	public String toString() {
		return "TreeNode [id=" + id + ", text=" + text + ", expanded=" + expanded + ", leaf=" + leaf + "]";
	}

}
