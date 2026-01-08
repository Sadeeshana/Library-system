package com.example.Library.system;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;
import java.time.LocalDateTime;

@Repository
public interface BorrowRecordRepository extends JpaRepository<BorrowRecord, Integer> {
    // Basic save() methods are included automatically
    Optional<BorrowRecord> findByBookIdAndMemberIdAndStatus(Integer bookId, Integer memberId, String status);
    List<BorrowRecord> findByBorrowDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    List<BorrowRecord> findByMemberId(Integer memberId);
}