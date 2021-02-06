package com.lyncas.books.controller;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TesteController {
	final String GOOGLE_API = "https://www.googleapis.com/books/v1/"; 
	@RequestMapping(value = "/teste", method = RequestMethod.GET)
	String teste() throws IOException, InterruptedException {
		HttpClient client = HttpClient.newHttpClient();
		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create(GOOGLE_API.concat("volumes?q=quilting")))
				.header("Content-Type", "application/json").build();
		HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
		return response.body();
	}
}
