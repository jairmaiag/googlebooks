package com.lyncas.books.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lyncas.books.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book,Long>{
	Book findByIdBook(String id);
}
