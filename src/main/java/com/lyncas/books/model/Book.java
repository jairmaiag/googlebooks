package com.lyncas.books.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

@Entity
public class Book {
	@Id
	@GeneratedValue
	(strategy=GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Length(min=2, max=12,message="O tamanho do nome deve ser entre {min} e {max} caracteres")
	private String idBook;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIdBook() {
		return idBook;
	}

	public void setIdBook(String idBook) {
		this.idBook = idBook;
	}

	@Override
	public String toString() {
		return "{\"id\":" + id + ", \"idBook\":\"" + idBook + "\"}";
	}
		
}
