package com.example.Library.system;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "Members")

public class Member{
    @Id
    @Column(name = "MemberID")
    private int memberId;

    @Column(name = "Member_Name")
    private String memberName;

    @Column(name = "Email")
    private String memberEmail;

    @Column(name = "Phone_number")
    private String memberPhoneNumber;


    //Getters and setters
    public int getID(){
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

}