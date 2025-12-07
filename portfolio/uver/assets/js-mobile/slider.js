jQuery(document).ready(function($){

	var rem = parseFloat($('html').css('font-size'));

	new Swiper('#cert_slider',{
		loop: true,
		loopedSlides: 5,
		spaceBetween: 200*rem,
		effect: 'coverflow',
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows : false,
        }
	});

	new Swiper('#fb_slider',{
		loop: true,
		loopedSlides: 5,
		spaceBetween: 200*rem,
		effect: 'coverflow',
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows : false,
        }
	});

	new Swiper('#compare_slider',{
		slidesPerView: 1,
		direction: 'horizontal',
		nextButton: '#compare_slider_next',
	});

	new Swiper('#factory_slider',{
		autoplay: 2500,
		effect: 'fade',
	});

	var r = function(){
		rem = parseFloat($('html').css('font-size'));
	}
	$(window).resize(r);
	$(window).load(r);
	r();
});