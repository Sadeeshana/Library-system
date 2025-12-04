package com.example.Library.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
// 1. CHECK THIS LINE: It must be "/api/books" (plural)
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

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

            // 2. Check if we have copies left
            if (book.getQuantity() > 0) {
                // 3. Decrease the count
                book.setQuantity(book.getQuantity() - 1);


            int currentBorrowed = (book.getBorrowedCopies() == null) ? 0 : book.getBorrowedCopies();
            book.setBorrowedCopies(currentBorrowed + 1);
                // 4. Save the update to the database
                bookRepository.save(book);

                return ResponseEntity.ok("Book borrowed successfully!");
            } else {
                return ResponseEntity.badRequest().body("There are not enough books!");
            }
        } else {
            return ResponseEntity.notFound().build();
        }




    }

    @PutMapping("/return/{id}")
    public ResponseEntity<String> returnBook(@PathVariable Integer id) {

        Optional<Book> optionalBook = bookRepository.findById(id);

        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();

            // INCREASE the quantity by 1
            book.setQuantity(book.getQuantity() + 1);

            int currentBorrowed = (book.getBorrowedCopies() == null) ? 0 : book.getBorrowedCopies();
            if(currentBorrowed >0){
                book.setBorrowedCopies(currentBorrowed - 1);
            }

            int currentReturns = (book.getTotalReturns() == null) ? 0 : book.getTotalReturns();

            bookRepository.save(book);

            return ResponseEntity.ok("Book returned successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    //These functions for the Dashboard
    // All borrowed copies
    @GetMapping("/borrowed/total")
    public Long getTotalBorrowedBooks() {
        // We calculate this in Java for simplicity
        List<Book> books = bookRepository.findAll();
        long sum = 0;
        for (Book b : books) {
            sum += (b.getBorrowedCopies() == null) ? 0 : b.getBorrowedCopies();
        }
        return sum;
    }

    //All returns
    @GetMapping("/returned/total")
    public Long getTotalReturnedBooks() {
        List<Book> books = bookRepository.findAll();
        long sum = 0;
        for (Book b : books) {
            sum += (b.getTotalReturns() == null) ? 0 : b.getTotalReturns();
        }
        return sum;
    }



}