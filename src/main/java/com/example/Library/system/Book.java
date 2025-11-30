package com.example.Library.system;

import jakarta.persistence.*;

@Entity
@Table(name = "Book") // This will look for a table named 'Book' in your database
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment ID
    @Column(name = "BookID")
    private Integer bookId;

    @Column(name = "Book_Name")
    private String title;

    @Column(name = "ISBN")
    private String isbn;

    @Column(name = "Author") // This is the key! It will store "Available" or "Borrowed"
    private String author;

    @Column(name = "Book_Price")
    private int bookPrice;

    @Column(name = "Quantity")
    private int quantity;

    // --- Getters and Setters ---

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public String getTitle() {
        return title;
    }

    public void setBook_Name(String title) {
        this.title = title;
    }

    public String getIsbn() {
        return isbn;
    }

    public int getQuantity() {
        return quantity;
    }


    public void setStatus(String isbn) {
        this.isbn = isbn;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getBookPrice() {
        return bookPrice;
    }
    public void setBookPrice(int bookPrice) {
         this.bookPrice = bookPrice;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public String getStatus(){
        if(quantity > 0){
            return "Available";
        }else {
            return "Not Available";
        }
    }


}