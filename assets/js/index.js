
$(document).ready(function(){
	fetchAndLoad('landing-page');

	$('#subjects li').click(function(){
		let modalName = $(this).text().toLowerCase().split(' ')[0];
		$('#'+modalName).modal('show');
	});

	// $('a').click(function(){
	// 	console.log('test');
	// });

	$('body').on('click', '#landing-page a h1', function(){
		fetchAndLoad('home');
	});

 	$('.navbar-brand').click(function(){
 		fetchAndLoad('landing-page');
 	});

	function fetchAndLoad(toload) {
		let loadIfError = (window.location.href).split('#')[1];

		if(toload != 'landing-page') {
			$('#stickynav').show();
			$('#contactFooter').show();
			$('#subjects').show();
			$('.header-border').show();
		} else {
			$('#stickynav').hide();
			$('#contactFooter').hide();
			$('#subjects').hide();
			$('.header-border').hide();
		}
		
		fetch('pages/' + toload + '.html')			
			.then($('#main div').remove())
			.then(response => response.text())
			.then(response => $('#main').html(response))
			.then(() => $('#navbar-nav li').each(function(i, v){
				$(this).removeClass('active');
			}))
			.then(() => $('#navbar-nav li').each(function(i, v){
				if($(this).find('a').text().toLowerCase().replace(' ','') == toload) {
					$(this).addClass('active');
					window.location.href = `${baseURL}#${toload}`;
					$("html, body").animate({ scrollTop: 0 });
				}
			}))
			.catch(function(err){
				fetchAndLoad(loadIfError);
			});

	}
});