package com.example.Library.system;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "Employee")

public class Employee {
    @Id
    @Column(name = "EMP_ID")
    private int empId;

    @Column(name = "Name")
    private String name;

    @Column(name = "Address")
    private String address;

    @Column(name = "Role")
    private String role;

    @Column(name = "Phone_Number")
    private int phoneNumber;

    @Column(name = "Username")
    private String username;

    //Hide these columns
    @JsonIgnore
    @Column(name = "Password")
    private String password;

    @Column(name = "Email")
    private String email;

    //Hide these columns
    @JsonIgnore
    @Column(name = "otp_code")
    private String otpCode;


    //Getters and setters
    public int getEmpId() {
        return empId;
    }
    public String getName() {
        return name;
    }
    public String getAddress() {
        return address;
    }
    public String getRole() {
        return role;
    }
    public int getPhoneNumber() {
        return phoneNumber;
    }
    public String getUsername() {
        return username;
    }
    public String getPassword() {
        return password;
    }
    public String getEmail() {
        return email;
    }
    public String getOtpCode() {
        return otpCode;
    }

    public void setEmpId(int empId) {
        this.empId = empId;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public void setPhoneNumber(int phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setOtpCode(String otpCode) {
        this.otpCode = otpCode;
    }



}
