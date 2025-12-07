jQuery(document).ready(function($){
	new Swiper('#cert_slider',{
		slidesPerView: 4,
		nextButton: '#cert_slider_next',
		prevButton: '#cert_slider_prev',
		loop: true,
	});
	new Swiper('#fb_slider',{
		slidesPerView: 4,
		nextButton: '#fb_slider_next',
		prevButton: '#fb_slider_prev',
		loop: true,
	});

	new Swiper('#factory_slider',{
		autoplay: 2500,
		effect: 'fade',
	});
});