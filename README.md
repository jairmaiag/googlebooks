# Estante de livros do google

API para localização de livros no google books e criar uma lista de favoritos.

**Importante!**

O sistema não pode ser utilizado por mais de um usuário.

Para isso teria que implantar sistema de login. 

Também só está persistindo em memória, isto é, em quanto estiver em exeusão.

## Requisitos
Ter os programas, abaixo, instalados e executando:
1. Git
2. Java 11
3. Maven

## Baixar o projeto
Abrir um terminal, selecionar uma pasta e usar o comando abaixo:

`git clone git@github.com:jairmaiag/googlebooks.git`

## Compilando
Acesse a pasta **googlebooks** pelo terminal e digite o comando:

`mvn clean install -DskipTests`

Para que o mesmo possa ser compilado. Na primeira vez que esse comando for executado o Maven vai baixar várias depedências e isso pode demorar um pouco.


## Executar
Uma vez o projeto compilado, ainda no terminal e na pasta do projeto, execute o comando abaixo:

`mvn spring-boot:run`

## Utilizar
Com o projeto rodando, abra seu navegador e acesse o caminho:

http://localhost:8080

## Utilizando a API

### Listando os favoritos
Para listar os books cadastrados nos favoritos, utilize o método **GET** com o endereço:

[http://localhost:8080/api/favoritos](http://localhost:8080/api/favoritos)

### Cadastrando um favorito
Para cadastrar um book nos favoritos, utilize o método **POST** com o endereço:

[http://localhost:8080/api/favoritos](http://localhost:8080/api/favoritos)

Passando no corpo o objeto json:

`{"idBook":"-JkDEAAAQBAA"}`

### Excluido um favorito
Para excluir um book dos favoritos, utilize o método **DELETE** com o endereço:

[http://localhost:8080/api/favoritos/{idBook}](http://localhost:8080/api/favoritos/{idBook})

Onde {idBook} é o id do book cadastrado.

Exemplo:

[http://localhost:8080/api/favoritos/-JkDEAAAQBAA](http://localhost:8080/api/favoritos/-JkDEAAAQBAA)

### Interface gráfica
Utilize um navegador (browser) para utilizar a interface gráfica do sistema, acessando o endereço:

[http://localhost:8080](http://localhost:8080)

![](/src/resources/tela01.png)
