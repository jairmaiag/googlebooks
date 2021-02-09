package com.lyncas.books;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@ComponentScan({"com.lyncas.books"})
@SpringBootApplication
@EnableJpaRepositories
public class JavaApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(JavaApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(JavaApplication.class);
	}


}
