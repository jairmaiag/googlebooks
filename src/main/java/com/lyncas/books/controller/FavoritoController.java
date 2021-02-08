package com.lyncas.books.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lyncas.books.model.Book;
import com.lyncas.books.repository.BookRepository;
import com.lyncas.books.util.Util;

@RestController
@RequestMapping({"/api/favoritos"})
public class FavoritoController {

	@Autowired
	private BookRepository bookRepository;

	public FavoritoController(BookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}

	@GetMapping
	public String listar() {
		return Util.montarJson("books", this.bookRepository.findAll());
	}

	@PostMapping
	public Book create(@RequestBody Book book){
	   return this.bookRepository.save(book);
	}

	@DeleteMapping(value="/{idBook}")
	public boolean dlete(@PathVariable("idBook") String idBook){
		Book book = this.bookRepository.findByIdBook(idBook);
		if(book == null) {
			return false;
		}
		this.bookRepository.delete(book);
		return true;
	}

}
