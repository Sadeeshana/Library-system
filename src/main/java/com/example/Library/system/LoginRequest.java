package com.example.Library.system;

// This class holds the data from the React login form
public class LoginRequest {

    private String username;
    private String password;

    // Getters and Setters are needed for Spring to read the JSON
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}