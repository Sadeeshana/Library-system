package com.example.Library.system;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController // <-- 1. This is now @RestController
@RequestMapping("/api") // <-- 2. All our API URLs will start with /api
public class LoginController {

    /**
     * This method handles the login request from React.
     * It's a POST request that expects JSON.
     */
    @PostMapping("/login")
    public Map<String, String> handleLogin(@RequestBody LoginRequest loginRequest) {

        // 3. We get the username and password from the LoginRequest
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        // 4. Check the login (this is the same logic)
        if ("Sadeeshana".equals(username) && "sadeeputha".equals(password)) {
            // 5. Send a success JSON response
            return Map.of("status", "success", "message", "Login Successful!");
        } else {
            // 6. Send an error JSON response
            return Map.of("status", "error", "message", "Invalid username or password");
        }
    }

    // We deleted the showLoginPage() method because
    // React is now in charge of showing the page.
}