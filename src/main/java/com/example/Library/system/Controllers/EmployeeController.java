package com.example.Library.system.Controllers;

import com.example.Library.system.Entities.Employee;
import com.example.Library.system.Repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Random; // 1. Import Random

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/register")
    public Map<String, String> registerEmployee(@RequestBody Employee employee) {

        // Check for duplicates
        if (employeeRepository.findByUsername(employee.getUsername()) != null) {
            return Map.of("status", "error", "message", "Username already taken!");
        }

        try {
            // Genarate ID
            int randomId = 10000 + new Random().nextInt(90000);


            employee.setEmpId(randomId);
            //Set role
            employee.setRole("Librarian");
            //Save to database
            employeeRepository.save(employee);

            return Map.of("status", "success", "message", "Registration successful! ID: " + randomId);

        } catch (Exception e) {
            e.printStackTrace();
            return Map.of("status", "error", "message", "Error saving to database.");
        }
    }
    //Show employee card
    @GetMapping("/total")
    public long getTotalEmployees() {
        return employeeRepository.count();
    }

}