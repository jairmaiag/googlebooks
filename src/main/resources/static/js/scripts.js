$(document).ready(function() {
	
	$('#btnLocalizar').click(function(){
		event.preventDefault();
		let texto = $('#txtLocalizar').val();
		
		for(let i=0;i<=9;i++){
			let objeto = `<div class="col-sm-6 col-md-4">`;
			objeto+='<div class="thumbnail">';
			objeto+='<div class="caption">';
			objeto+='<h3>Titulo do livro</h3>';
			objeto+='<p>Descrição</p>';
			objeto+='<p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>';
			objeto+='</div></div></div>';
			$('#divLinha').append(objeto);			
		}
		console.log('Inclusa');
		
	});
});