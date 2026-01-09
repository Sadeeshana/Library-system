package com.example.Library.system.Repositories;

import com.example.Library.system.Entities.BookView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookViewRepository extends JpaRepository<BookView, Integer> {

}