package com.lyncas.books.controller;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.lyncas.books.model.Book;
import com.lyncas.books.repository.BookRepository;
import com.lyncas.books.util.Constantes;

@RestController
@RequestMapping("/api/favorito")
public class FavoritoController {
	
	@Autowired
	private BookRepository bookRepository;
	
//	public FavoritoController(BookRepository bookRepository) {
//		this.bookRepository = bookRepository;
//	}
	
	@GetMapping("/")
	public String listar() {
		Iterable<Book> books = this.bookRepository.findAll();
		System.out.println(toList(books));
		return null;
	}
	
	public <E> List<E> toList(Iterable<E> iterable) {
        return StreamSupport.stream(iterable.spliterator(), false).collect(Collectors.toList());
    }
	@RequestMapping(value = "/{texto}", method = RequestMethod.GET)
	public String pesquisar(@PathVariable("texto") String texto) throws IOException, InterruptedException {
		if(texto == null) {
			return "{mensage:\"Texto a pesquisar precisa ser enviado\"}";
		}
		HttpClient client = HttpClient.newHttpClient();
		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create(Constantes.GOOGLE_API_VOLUMES.concat(texto)))
				.header("Content-Type", "application/json").build();
		HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
		return response.body();
	}

}
