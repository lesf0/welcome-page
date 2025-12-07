$(document).ready(function(){
	var rem = parseFloat($('html').css('font-size'));
	
	var doc		= $(document);
	var body	= $("body, html");
	
	var changingBlock = $('.factory');

	var changePos = changingBlock.offset().top - 1700*rem;

	var overImg = $('.overimg');

	var scrollTop = doc.scrollTop();

	var changed= (scrollTop>=changePos)?true:false;

	var head_block = $('#head');
	var head_block_h;
	var footer_button = $('.foot-menu-container');
	var footer_button_show = false;

	var scrollprev = 0;

	if (changed) {
		overImg.css('opacity','1');
	}

	var s = function(){
		scrollTop = doc.scrollTop();

		if (changed) {
			if (scrollTop<changePos) {
				overImg.css('opacity','0');
				changed=false;
			}
		} else if (scrollTop>=changePos) {
					overImg.css('opacity','1');
					changed=true;
				}

		if(scrollTop >= head_block_h && scrollprev >= scrollTop && !footer_button_show){
			footer_button.removeClass('foot-menu-hidden');
			footer_button_show = true;
		}else if(scrollTop < head_block_h || scrollprev < scrollTop){
			footer_button.addClass('foot-menu-hidden');
			footer_button_show = false;
		}

		scrollprev = scrollTop;
	}

	var r = function(){
		rem = parseFloat($('html').css('font-size'));
		changePos = changingBlock.offset().top - 1700*rem;
		head_block_h = head_block.offset().top;

		s();
	}
	$(window).resize(r);
	$(window).load(r);
	r();

	doc.scroll(s);

});