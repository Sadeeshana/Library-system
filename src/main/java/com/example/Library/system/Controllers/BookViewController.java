package com.example.Library.system.Controllers;

import com.example.Library.system.Entities.BookView;
import com.example.Library.system.Repositories.BookViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/view")
public class BookViewController {
    @Autowired
    private BookViewRepository bookViewRepository;

    @GetMapping("/books")
    public List<BookView> getBooksFromView(){
        return bookViewRepository.findAll();
    }
}
