$(document).ready(function() {
	function alertar(textoAviso) {
		let caixa = '<div class="alert alert-danger" role="alert" id="aviso">';
		caixa += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		caixa += `<p>${textoAviso}</p>`;
		caixa += '</div>';
		$('#alertas').append(caixa);
	};
	
	function montarLivro(livro){
		console.log(livro);
		let volumeInfo = livro.volumeInfo;
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
		objeto += `<img src="${image}" alt="${title}">`;
		objeto += '<div class="caption">';
		objeto += `<h3>${title}</h3>`;
		objeto += `<p>${description}</p>`;
		objeto += '<p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>';
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
		
		$.ajax({
			type : "GET",
			url : `/api/pesquisar/${texto}`,
			data : '$format=json',
			dataType : 'json',
			success : function(data) {
					$("#dadosPesquisa").text(`Encontrados ${data.items.length} livros.`);
					$.each(data.items, function(i, livro) {
						$('#divLinha').append(montarLivro(livro));
					});
			}
			});
	});
});