package com.example.Library.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
// 1. CHECK THIS LINE: It must be "/api/books" (plural)
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    // 2. CHECK THIS LINE: It must be "/total"
    @GetMapping("/total")
    public long getTotalBooks() {
        return bookRepository.count();
    }

    @GetMapping("/all")
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
}