package com.example.Library.system;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.Immutable;

@Entity
@Immutable // This is for read only mode
@Table(name = "Borrow_return") // SQL view name
public class BookView {
    @Id
    @Column(name = "BookID")
    private int bookId;

    @Column(name = "Book_Name")
    private String bookName;

    @Column(name = "Quantity")
    private int quantity;

    public int getBookId() {
        return bookId;
    }
    public String getBookName() {
        return bookName;
    }
    public int getQuantity() {
        return quantity;
    }

}
