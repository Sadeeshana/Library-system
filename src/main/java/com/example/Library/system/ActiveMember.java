package com.example.Library.system;

import jakarta.persistence.*;

@Entity
@Table(name = "ActiveMember")

public class ActiveMember {
    @Id
    @Column(name = "MemberID")
    private int memberId;

    @Column(name = "Status")
    private String status;

    //Getters and setters
    public int getMemberId() {
        return memberId;
    }
    public String getStatus() {
        return status;
    }
    public void setMemberId(int memberId) {
        this.memberId = memberId;
    }
    public void setStatus(String status) {
        this.status = status;
    }

}
