package com.example.Library.system.Repositories;

import com.example.Library.system.Entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    // JpaRepository already has a .count() method built-in!
    // We don't need to write any SQL here for the total count.

}