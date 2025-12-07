jQuery(document).ready(function($){
	$('a[href^="#"]:not([href="#"])').click(function(e){
		e.preventDefault();

		var elem = $(this.hash);

		if(elem.length){
			var top = elem.offset().top;

			$('html,body').animate({
				scrollTop: top
			});
		}
	});
});