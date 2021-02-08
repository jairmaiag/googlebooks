function adicionarFavorito(id){
	let favorito = $.ajax({
		type: "POST",
		url:`/api/favoritos`,
		data: JSON.stringify({idBook : `${id}`}),
		contentType:'application/json; charset=UTF-8',
		dataType:"json"
	}).done(function( livro ) {
		if(livro.idBook !== "Cadastrado"){
			$(`#${livro.idBook}`).hide("slow");
		}
	});
};

function removerFavorito(id){
	$.ajax({
		type: "DELETE",
		url:`/api/favoritos/${id}`,
		contentType:'application/json; charset=UTF-8',
		dataType:"json"
	}).done(function( livro ) {
		$(`#${id}`).hide("slow");
	});
};

$('#confirmarExclusao').on('show.bs.modal', function (event) {
	let origem = $(event.relatedTarget);
	let id = origem.data('id');
	let titulo =origem.data('titulo'); 
	let modal = $(this);
	modal.find('#tiuloExcluir').text(titulo);
	$('#btnRemover').click(function(e){
		removerFavorito(id);
	});
});

function montarLivro(livro, favorito) {
	let idBook = livro.id;
	let volumeInfo = livro.volumeInfo;
	let preview = volumeInfo.previewLink;
	let nomesAuthors = '';
	let authors = volumeInfo.authors;
	$.each(authors, function(i, nome) {
		nomesAuthors += nome + ', ';
	});
	nomesAuthors = nomesAuthors.substring(0, nomesAuthors.length - 2)
	let image='';
	if(volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail){
		image = volumeInfo.imageLinks.thumbnail;
	}
	let title = volumeInfo.title;
	if (title && title.length > 80) {
		title = title.substring(0, 80) + ' ...';
	}
	let description = volumeInfo.description;
	if (description) {
		if (description.length > 160) {
			description = description.substring(0, 150) + '...';
		}
	} else {
		description = 'Livro sem descrição';
	}
	let textoFavorito = 'Favorito';
	let tipoBotao = `onclick="adicionarFavorito('${idBook}')" class="btn btn-primary mr-2"`   
	if(favorito){
		textoFavorito='Remover';
		tipoBotao='btn-danger';
		tipoBotao=`data-toggle="modal" data-target="#confirmarExclusao" class="btn btn-danger mr-2`;
	}
	let objeto = `<div class="col-sm-6 col-md-4" style="width: 20rem; height: 500px;" id="${idBook}">`;
	objeto += '<div class="card" style="width: 18rem;">';
	objeto += `<a href="${preview}" target="_blank">`;
	objeto += `<img class="card-img-top" src="${image}" alt="${title}" style="height: 180px; width: 100%; display: block;"></a>`;
	objeto += `<div class="card-body">`
	objeto += `<h5 class="card-title">${title}</h5>`;
	objeto += `<h6 class="card-subtitle mb-2 text-muted">${nomesAuthors}</h6>`;
	objeto += `<p class="card-text">${description}</p>`;
	objeto += `<button type="button" data-id="${idBook}" data-titulo="${title}"  ${tipoBotao} role="button">${textoFavorito}</button>`;
	objeto += `<a href="${preview}" class="btn btn-info" role="button" target="_blank">Prévia</a>`;
	objeto += '</div></div></div>';
	return objeto;
};

function alertar(textoAviso) {
	let caixa = '<div class="alert alert-danger" role="alert" id="aviso">';
	caixa += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
	caixa += `<p>${textoAviso}</p>`;
	caixa += '</div>';
	$('#alertas').append(caixa);
};

$(document).ready(function() {
	$('#btnLimpar').click(function() {

	});
	$('#btnLocalizar').click(function(event) {
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
			saida += palavra + '+';
		});
		saida = saida.substring(0, saida.length - 1);
		$.ajax({
			type: "GET",
			url: `/api/pesquisar/${saida}`,
			data: '$format=json',
			dataType: 'json',
			success: function(data) {
				let total = 0;
				$.each(data.items, function(i, livro) {
					$.ajax({
						type: "GET",
						url: `/api/favoritos/${livro.id}`,
						data: '$format=json',
						dataType: 'json',
					}).fail(function( jqXHR, textStatus ) {
						$('#divLinha').append(montarLivro(livro));
					});
					//total++;
				});
				//$("#dadosPesquisa").text(`Encontrados ${total} livros.`);
			}
		});
	});
});