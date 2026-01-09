package com.example.Library.system.Controllers;

import com.example.Library.system.Entities.Employee;
import com.example.Library.system.Repositories.EmployeeRepository;
import com.example.Library.system.Entities.LoginRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

@RestController // <-- 1. This is now @RestController
@RequestMapping("/api") // <-- 2. All our API URLs will start with /api
public class LoginController {

    @Autowired
    private EmployeeRepository employeeRepository;
    /**
     * This method handles the login request from React.
     * It's a POST request that expects JSON.
     */
    @PostMapping("/login")
    public Map<String, String> handleLogin(@RequestBody LoginRequest loginRequest) {

        // 3. We get the username and password from the LoginRequest
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        Employee employee = employeeRepository.findByUsername(username);

        // 4. Check the login (this is the same logic)
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

    // We deleted the showLoginPage() method because
    // React is now in charge of showing the page.
}