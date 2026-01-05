package com.example.Library.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private BorrowRecordRepository borrowRecordRepository;

    @Autowired
    private MemberRepository memberRepository; // <--- ADDED

    @Autowired
    private BookRepository bookRepository;     // <--- ADDED

    @Autowired
    private PDFGen PDFGen;

    @PostMapping("/generate")
    public ResponseEntity<InputStreamResource> generateReport(@RequestBody Map<String, String> request) {

        String type = request.get("type"); // Get the dropdown
        ByteArrayInputStream pdf;

        try {
            if ("UserSpecific".equals(type)) {
                String userIdStr = request.get("userId");
                if(userIdStr == null || userIdStr.isEmpty()) {
                    return ResponseEntity.badRequest().build();
                }

                int userId = Integer.parseInt(userIdStr);


                Member member = memberRepository.findById(userId).orElse(null);

                if (member != null) {
                    List<BorrowRecord> history = borrowRecordRepository.findByMemberId(userId);

                    pdf = PDFGen.generateUserSpecificReport(member, history);
                } else {
                    return ResponseEntity.badRequest().build();
                }


            } else if ("Members".equals(type)) {
                List<Member> members = memberRepository.findAll();

                pdf = PDFGen.generateMemberReport(members);

            } else if ("Books".equals(type)) {
                List<Book> books = bookRepository.findAll();

                pdf = PDFGen.generateBookReport(books);

            } else {
                String startStr = request.get("startDate");
                String endStr = request.get("endDate");

                if (startStr != null && endStr != null) {
                    LocalDateTime start = LocalDate.parse(startStr).atStartOfDay();
                    LocalDateTime end = LocalDate.parse(endStr).atTime(23, 59, 59);

                    List<BorrowRecord> records = borrowRecordRepository.findByBorrowDateBetween(start, end);
                    pdf = PDFGen.generateBorrowReport(records);
                } else {
                    return ResponseEntity.badRequest().build();
                }
            }

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "inline; filename=" + type + "_report.pdf");

            return ResponseEntity
                    .ok()
                    .headers(headers)
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(new InputStreamResource(pdf));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }



    }
}