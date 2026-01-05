package com.example.Library.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BorrowRecordRepository borrowRecordRepository;
    @Autowired
    private MemberRepository memberRepository;

    @GetMapping("/total")
    public long getTotalBooks() {
        return bookRepository.count();
    }

    @GetMapping("/all")
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }


    @PutMapping("/borrow/{id}")
    public ResponseEntity<String> borrowBook(@PathVariable int id) {
        Optional<Book> optionalBook = bookRepository.findById(id);

        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();

            // Check if we have copies left
            if (book.getQuantity() > 0) {
                // Decrease the count
                book.setQuantity(book.getQuantity() - 1);


            int currentBorrowed = (book.getBorrowedCopies() == null) ? 0 : book.getBorrowedCopies();
            book.setBorrowedCopies(currentBorrowed + 1);
                // Save the update to the database
                bookRepository.save(book);

                return ResponseEntity.ok("Book borrowed successfully!");
            } else {
                return ResponseEntity.badRequest().body("There are not enough books!");
            }
        } else {
            return ResponseEntity.notFound().build();
        }




    }
    //These functions for the Dashboard
    // All borrowed copies
    @GetMapping("/borrowed/total")
    public Long getTotalBorrowedBooks() {
        List<Book> books = bookRepository.findAll();
        long sum = 0;
        for (Book b : books) {
            sum += (b.getBorrowedCopies() == null) ? 0 : b.getBorrowedCopies();
        }
        return sum;
    }
    //This for add new book
    @PostMapping("/add")
    public ResponseEntity<String> addBook(@RequestBody Book book) {
        try {
            bookRepository.save(book);
            return ResponseEntity.ok("Book added successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error adding book: " + e.getMessage());
        }
    }

    //This function for deleting book
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable int id) {
        if(bookRepository.existsById(id)){
            bookRepository.deleteById(id);

            return ResponseEntity.ok("Book deleted successfully!");
        }else{
            return ResponseEntity.notFound().build();
        }
    }





    //Borrow form
    @PostMapping("/borrow")
        public ResponseEntity<String> borrowBook(@RequestBody Map<String,Integer> request) {
        int bookId = request.get("bookId");
        int memberId = request.get("memberId");

        Optional<Book> bookOpt = bookRepository.findById(bookId);
        if(bookOpt.isEmpty()) return ResponseEntity.badRequest().body("Book not found!");


        if(!memberRepository.existsById(memberId)){
            return ResponseEntity.badRequest().body("Member not found!");
        }

        Book book = bookOpt.get();
        if (book.getQuantity() > 0) {

            //Decrease count
            book.setQuantity(book.getQuantity() - 1);
            bookRepository.save(book);


            BorrowRecord record = new BorrowRecord();
            record.setBookId(bookId);
            record.setMemberId(memberId);
            record.setBorrowDate(LocalDateTime.now());
            record.setStatus("Borrowed");

            borrowRecordRepository.save(record);

            return ResponseEntity.ok("Book borrowed successfully!");
        } else {
            return ResponseEntity.badRequest().body("Book is out of stock!");
        }
        }




}