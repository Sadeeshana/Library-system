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
    //This is for edit book
    // API to update an existing book
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateBook(@PathVariable Integer id, @RequestBody Book updatedBook) {

        Optional<Book> optionalBook = bookRepository.findById(id);

        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();

            // Update fields
            book.setBook_Name(updatedBook.getTitle());
            book.setAuthor(updatedBook.getAuthor());
            book.setIsbn(updatedBook.getIsbn());
            book.setBookPrice(updatedBook.getBookPrice());
            book.setQuantity(updatedBook.getQuantity());

            bookRepository.save(book);
            return ResponseEntity.ok("Book updated successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/return/{id}")
    public ResponseEntity<String> returnBook(@PathVariable Integer id) {

        java.util.Optional<Book> optionalBook = bookRepository.findById(id);

        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();

            int currentBorrowed = (book.getBorrowedCopies() == null) ? 0 : book.getBorrowedCopies();

            if (currentBorrowed > 0) {

                book.setQuantity(book.getQuantity() + 1);


                book.setBorrowedCopies(currentBorrowed - 1);

                int currentReturns = (book.getTotalReturns() == null) ? 0 : book.getTotalReturns();
                book.setTotalReturns(currentReturns + 1);

                bookRepository.save(book);

                return ResponseEntity.ok("Book returned successfully!");
            } else {
                return ResponseEntity.badRequest().body("Error: All copies are already in the library!");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
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



    //Return book
    @PostMapping("/return")
    public ResponseEntity<String> returnBook(@RequestBody Map<String,Integer> request) {

        int bookId = request.get("bookId");
        int memberId = request.get("memberId");

        Optional<BorrowRecord> recordOpt = borrowRecordRepository.findByBookIdAndMemberIdAndStatus(bookId ,memberId,"Borrowed");

        if(recordOpt.isPresent()){
            BorrowRecord record = recordOpt.get();

            record.setReturnDate(LocalDateTime.now());
            record.setStatus("Returned");
            borrowRecordRepository.save(record);

            Optional<Book> bookOpt = bookRepository.findById(bookId);
            if(bookOpt.isPresent()){
                Book book = bookOpt.get();
                book.setQuantity(book.getQuantity() + 1);
                bookRepository.save(book);
            }
            return ResponseEntity.ok("Book returned successfully!");
        }else{
            return ResponseEntity.badRequest().body("This book has not any borrowers");
        }

    }


}