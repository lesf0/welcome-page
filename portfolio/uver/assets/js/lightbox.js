$(document).ready(function() {
	$('#fb_slider > div > div , #cert_slider > div > div').each(function(){
		$(this).magnificPopup({
			delegate: 'a',
			type: 'image',
			closeOnContentClick: false,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			image: {
				verticalFit: true,
				markup: '<div class="mfp-figure"><div class="mfp-close"></div><div class="mfp-img"></div></div>'
			},
			zoom: {
				enabled: true,
				duration: 300, // don't foget to change the duration also in CSS
				opener: function(element) {
					return element;
				}
			}	
		});
	});
});