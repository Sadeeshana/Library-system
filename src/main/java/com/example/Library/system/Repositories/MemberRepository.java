package com.example.Library.system.Repositories;

import com.example.Library.system.Entities.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository  extends JpaRepository<Member,Integer>{
    long countByMemberStatus(String status);

}
