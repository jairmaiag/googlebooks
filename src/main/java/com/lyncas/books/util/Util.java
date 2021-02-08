package com.lyncas.books.util;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class Util {
	public static <E> String montarJson(String nomeArray, Iterable<E> dados) {
		List<E> listDados = StreamSupport.stream(dados.spliterator(), false).collect(Collectors.toList());
		StringBuilder retorno = new StringBuilder();
		retorno.append("{\"");
		retorno.append(nomeArray);
		retorno.append("\":[");
		listDados.forEach(book -> {retorno.append(book.toString());});
		retorno.append("]}");
		return retorno.toString();
	}
}
