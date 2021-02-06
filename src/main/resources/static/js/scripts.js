$(document).ready(function() {
	function alertar(textoAviso) {
		let caixa = '<div class="alert alert-danger" role="alert" id="aviso">';
		caixa += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		caixa += `<p>${textoAviso}</p>`;
		caixa += '</div>';
		$('#alertas').append(caixa);
	};
	
	function montarLivro(livro){
		let volumeInfo = livro.volumeInfo;
		let preview = volumeInfo.previewLink;
		let nomesAuthors='';
		let authors = volumeInfo.authors;
		$.each(authors, function(i, nome) {
			nomesAuthors+=nome+', ';
		});
		nomesAuthors=nomesAuthors.substring(0,nomesAuthors.length-2)
		let image = volumeInfo.imageLinks.thumbnail;
		let title = volumeInfo.title;
		if(title.length > 80){
			title = title.substring(0,80)+' ...';
		}
		let description = volumeInfo.description;
		if(description){
			if(description.length > 160){
				description = description.substring(0,150)+' ...';
			}
		}else{
			description='Livro sem descrição';
		}
		let objeto = `<div class="col-sm-6 col-md-4">`;
		objeto += '<div class="thumbnail">';
		objeto += `<a href="${preview}" target="_blank"><img src="${image}" alt="${title}" width="128" height="182"></a>`;
		objeto += '<div class="caption">';
		objeto += `<h3>${title}</h3>`;
		objeto += `<p><strong>${nomesAuthors}</strong></p>`;
		objeto += `<p>${description}</p>`;
		objeto += '<p><a href="#" class="btn btn-primary" role="button">Favorito</a> ';
		objeto += `<a href="${preview}" class="btn btn-default" role="button" target="_blank">Prévia</a></p>`;
		objeto += '</div></div></div>';
		return objeto;
	};
	$('#btnLimpar').click(function() {
	
	});
	$('#btnLocalizar').click(function() {
		event.preventDefault();
		let texto = $('#txtLocalizar').val();
		
		if (!texto) {
			alertar('É preciso informar um título de livro ou nome de autor');
			return;
		}
		$("#aviso").remove();
		let listaParametros = texto.split(" ");
		
		let saida = '';
		$.each(listaParametros, function(i, palavra) {
			saida+=palavra+'+';
		});
		saida=saida.substring(0,saida.length-1);
		$.ajax({
			type : "GET",
			url : `/api/pesquisar/${saida}`,
			data : '$format=json',
			dataType : 'json',
			success : function(data) {
					let total = 0;
					$.each(data.items, function(i, livro) {
						$('#divLinha').append(montarLivro(livro));
						total++;
					});
					$("#dadosPesquisa").text(`Encontrados ${total} livros.`);
			}
			});
	});
});