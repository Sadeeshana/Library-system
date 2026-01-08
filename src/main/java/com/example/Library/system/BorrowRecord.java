package com.example.Library.system;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "BorrowRecord")
public class BorrowRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer transactionId;

    @Column(name = "BookID")
    private Integer bookId;

    @Column(name = "MemberID")
    private Integer memberId;

    @Column(name = "BorrowDate")
    private LocalDateTime borrowDate;

    @Column(name = "ReturnDate")
    private LocalDateTime returnDate;

    @Column(name = "Status")
    private String status;

    // --- Setters ---
    public void setTransactionId(Integer transactionId) { this.transactionId = transactionId; }
    public void setBookId(Integer bookId) { this.bookId = bookId; }
    public void setMemberId(Integer memberId) { this.memberId = memberId; }
    public void setBorrowDate(LocalDateTime borrowDate) { this.borrowDate = borrowDate; }
    public void setReturnDate(LocalDateTime returnDate) { this.returnDate = returnDate; }
    public void setStatus(String status) { this.status = status; }

    // --- Getters ---
    public Integer getTransactionId() { return transactionId; }
    public Integer getBookId() { return bookId; }
    public Integer getMemberId() { return memberId; }
    public LocalDateTime getBorrowDate() { return borrowDate; }
    public LocalDateTime getReturnDate() { return returnDate; }
    public String getStatus() { return status; }
}