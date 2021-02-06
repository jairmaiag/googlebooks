package com.lyncas.books.controller;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PesquisaController {
	final String GOOGLE_API = "https://www.googleapis.com/books";
	final String GOOGLE_API_VOLUMES = GOOGLE_API+"/v1/volumes/?q=";
	
	@RequestMapping(value = "/api/pesquisar/{texto}", method = RequestMethod.GET)
	String pesquisar(@PathVariable("texto") String texto) throws IOException, InterruptedException {
		if(texto == null) {
			return "{mensage:\"Texto a pesquisar precisa ser enviado\"}";
		}
		HttpClient client = HttpClient.newHttpClient();
		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create(GOOGLE_API_VOLUMES.concat(texto)))
				.header("Content-Type", "application/json").build();
		HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
		return response.body();
	}
}
