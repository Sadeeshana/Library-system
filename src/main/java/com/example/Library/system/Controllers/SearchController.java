package com.example.Library.system.Controllers;

import com.example.Library.system.Entities.Book;
import com.example.Library.system.Entities.Employee;
import com.example.Library.system.Entities.Member;
import com.example.Library.system.Repositories.BookRepository;
import com.example.Library.system.Repositories.EmployeeRepository;
import com.example.Library.system.Repositories.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    //Search member
    @GetMapping("/member/{id}")
    public ResponseEntity<?> searchMember(@PathVariable int id) {
        Optional<Member> member = memberRepository.findById(id);
        if (member.isPresent()) {
            return ResponseEntity.ok(member.get());
        }
        return ResponseEntity.accepted().body(Map.of("","Member not found in our records"));
    }

    //Search book
    @GetMapping("/book/{id}")
    public ResponseEntity<?> searchBook(@PathVariable Integer id) {
        Optional<Book> book = bookRepository.findById(id);
        if (book.isPresent()) {
            return ResponseEntity.ok(book.get());
        }
        return ResponseEntity.accepted().body(Map.of("", "Book not found"));
    }

    //Search Employee
    @GetMapping("/employee/{id}")
    public ResponseEntity<?> searchEmployee(@PathVariable Integer id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        if (employee.isPresent()) {
            return ResponseEntity.ok(employee.get());
        }
        return ResponseEntity.accepted().body(Map.of("error", "Employee not found"));
    }

}
