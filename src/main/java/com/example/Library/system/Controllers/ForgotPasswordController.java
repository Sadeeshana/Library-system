package com.example.Library.system.Controllers;

import com.example.Library.system.Entities.EmailServices;
import com.example.Library.system.Entities.Employee;
import com.example.Library.system.Repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/auth")
public class ForgotPasswordController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmailServices emailService;

    // Helper method to generate a random 4-digit code
    private String generateOtp() {
        Random random = new Random();
        int otp = 1000 + random.nextInt(9000);
        return String.valueOf(otp);
    }

    @PostMapping("/send-code")
    public Map<String, String> sendVerificationCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");


        Employee employee = employeeRepository.findByEmail(email);

        if (employee == null) {
            return Map.of("status", "error", "message", "Email not found in our records.");
        }

        String otp = generateOtp();


        employee.setOtpCode(otp);
        employeeRepository.save(employee);

        // 4. SEND: Email the code to the user
        try {
            emailService.sendEmail(email, "Password Reset Code", "Your verification code is: " + otp);
            return Map.of("status", "success", "message", "Code sent successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return Map.of("status", "error", "message", "Error sending email. Check server logs.");
        }
    }

    //Verify otp
    @PostMapping("/verify-otp")
    public Map<String, String> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");
        Employee employee = employeeRepository.findByEmail(email);

        if (employee != null &&
                employee.getOtpCode() != null &&
                employee.getOtpCode().equals(code)
        ){
            return Map.of("status", "success", "message", "Otp code is already verified!");

        }else  {
            return Map.of("status", "error", "message", "Otp code is not valid!");
        }

    }

    //Resend otp
    @PostMapping("/resend-otp")
    public Map<String, String> resendOtp(@RequestBody Map<String, String> request) {
        return sendVerificationCode(request);
    }


}