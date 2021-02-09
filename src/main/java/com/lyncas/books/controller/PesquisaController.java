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
import com.lyncas.books.util.Constantes;

@RestController
public class PesquisaController {
	
	@RequestMapping(value = "/api/pesquisar/{texto}", method = RequestMethod.GET)
	String pesquisar(@PathVariable("texto") String texto) throws IOException, InterruptedException {
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

	@RequestMapping(value = "/api/pesquisar/id/{idBook}", method = RequestMethod.GET)
	String pesquisarPorId(@PathVariable("idBook") String idBook) throws IOException, InterruptedException {
		if(idBook == null) {
			return "{mensage:\"Id precisa ser enviado\"}";
		}
		HttpClient client = HttpClient.newHttpClient();
		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create(Constantes.GOOGLE_API_ID.concat(idBook)))
				.header("Content-Type", "application/json").build();
		HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
		return response.body();
	}

}
