package com.example.Library.system;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "Members")

public class Member{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MemberID")
    private int memberId;

    @Column(name = "Member_Name")
    private String memberName;

    @Column(name = "Email")
    private String memberEmail;

    @Column(name = "Phone_number")
    private String memberPhoneNumber;

    @Column(name = "Member_Status")
    private String memberStatus;


    //Getters and setters
    public int getMemberId(){
        return memberId;
    }
    public String getMemberName(){
        return memberName;
    }
    public String getMemberEmail(){
        return memberEmail;
    }
    public String getMemberPhoneNumber(){
        return memberPhoneNumber;
    }
    public String getMemberStatus(){
        return memberStatus;
    }

    public void setMemberId(int memberId){
        this.memberId = memberId;
    }
    public void setMemberName(String memberName){
        this.memberName = memberName;
    }
    public void setMemberEmail(String memberEmail){
        this.memberEmail = memberEmail;
    }
    public void setMemberPhoneNumber(String memberPhoneNumber){
        this.memberPhoneNumber = memberPhoneNumber;
    }
    public void setMemberStatus(String memberStatus){
        this.memberStatus = memberStatus;
    }

}