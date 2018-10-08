package com.hmm.room.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hmm.room.entity.Room;

@Repository
public interface RoomRepository extends PagingAndSortingRepository<Room, String>{

}
