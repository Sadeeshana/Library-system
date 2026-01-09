package com.example.Library.system.Controllers;

import com.example.Library.system.Entities.Employee;
import com.example.Library.system.Repositories.EmployeeRepository;
import com.example.Library.system.Entities.LoginRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

@RestController // This is now @RestController
@RequestMapping("/api") // All our API URLs will start with /api
public class LoginController {

    @Autowired
    private EmployeeRepository employeeRepository;
        @PostMapping("/login")
    public Map<String, String> handleLogin(@RequestBody LoginRequest loginRequest) {

        // We get the username and password from the LoginRequest
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        Employee employee = employeeRepository.findByUsername(username);

        // Check the login
        if (employee == null) {
            // User not found
            return Map.of("status", "error", "message", "Invalid username or password");
        }

        if (employee.getPassword() != null && employee.getPassword().equals(password)) {

            // Success! Passwords match.
            return Map.of("status", "success",
                    "message", "Login Successful!",
                    "role", employee.getRole()
                    );

        } else {

            // Fail! Passwords do not match.
            return Map.of("status", "error", "message", "Invalid username or password");
        }
    }

}