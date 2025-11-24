package com.example.Library.system;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

public interface ActiveMemberRepository extends JpaRepository<ActiveMember,String> {
    long countByStatus(String status);
}
