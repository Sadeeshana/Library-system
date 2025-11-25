package com.example.Library.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/active-members")
public class ActiveMemberController {

    @Autowired
    private ActiveMemberRepository repository;

    @GetMapping("/count")
    public long getActiveCount() {
        // We explicitly ask for rows where Status is "Active"
        // Make sure "Active" matches exactly what is in your database (case-sensitive!)
        return repository.countByStatus("Active");
    }
}