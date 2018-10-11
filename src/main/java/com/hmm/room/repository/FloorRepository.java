package com.hmm.room.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.room.entity.Floor;

@Repository
public interface FloorRepository extends PagingAndSortingRepository<Floor, String>{
	
//	/**
//	 * 查询根节点
//	 * 		parentNode.id = null时 默认返回根节点
//	 * @return 节点集合 List<Company>
//	 */
//	@Query("from Floor f where f.floorId = 999")
//	public List<Floor> findParentNodes();
	
	@Query("from Floor f order by f.floorId")
	public List<Floor> findFloorNodes();
	
	/**
	 * 根据父节点ID查询出子节点
	 * @param parentId
	 * 		parentId != null时 默认返回子节点
	 * @return 节点集合 List<Company>
	 */
	@Query("from Floor f where f.floorId = ?1")
	public List<Floor> findChildNodes(Long parentId);//null
}
