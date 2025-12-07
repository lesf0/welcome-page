jQuery(document).ready(function($){
	var show_menu = document.getElementById('show_menu');

	var rem = parseFloat($('html').css('font-size'));
	var head_h;

	var doc		= $(document);
	var Body	= $("body, html");

	var ScrollFlag = true;
	var ScrollToPos = function(Position){
		ScrollFlag = false;
		Body.animate({scrollTop: Position},800).promise().done(function(){
			ScrollFlag = true;
		});
	}
	// window.ScrollToPos = ScrollToPos;


	if(location.hash){
		var CurrentMenu = $('.footer-menu a[href="'+location.hash+'"]').parent();
		var CurrentBlock = $(location.hash);
	}else{
		var CurrentMenu = $('.footer-menu p:first-child');
		var CurrentBlock = $(CurrentMenu.children()[0].hash);
	}
	var CurrentTop = CurrentBlock.offset().top-1500*rem;
	if(location.hash){
		ScrollToPos(CurrentTop);
	}

	CurrentMenu.toggleClass('menu-active');

	var s = function(){
		var scrollTop = doc.scrollTop();
		if(ScrollFlag){
			CurrentMenu.toggleClass('menu-active');
			if(scrollTop < CurrentTop - 1){
				var PrevMenu = CurrentMenu.prev('p');
				if(PrevMenu.length){
					CurrentMenu = PrevMenu;
					CurrentBlock = $(CurrentMenu.children()[0].hash).parent();

					CurrentTop = CurrentBlock.offset().top-1500*rem;
				}
			}else{
				var NextMenu = CurrentMenu.next('p');
				if(NextMenu.length){
					var NextBlock = $(NextMenu.children()[0].hash);
					var NextTop = NextBlock.offset().top-1500*rem;
					if(scrollTop >= NextTop){
						CurrentMenu = NextMenu;
						CurrentBlock = NextBlock;
						CurrentTop = NextTop;
					}
				}
			}
			CurrentMenu.toggleClass('menu-active');
		}
	}
	doc.scroll(s);


	var r = function(){
		rem = parseFloat($('html').css('font-size'));
		s();
	}
	r();


	$('a[href^="#"]:not([href="#"])').click(function(e){
		
		// e.preventDefault();
		
		var This = $("a[href='"+this.hash+"']");
		
		CurrentMenu.toggleClass('menu-active');
		CurrentMenu.toggleClass('tmp-menu');

		var Tmp = CurrentMenu;

		Tmp.toggleClass('tmp-menu');

		CurrentMenu = This.parent();

		CurrentMenu.toggleClass('menu-active');

		CurrentMenu.toggleClass('tmp-menu');
		Tmp.toggleClass('tmp-menu');

		CurrentBlock = This;
		// doc.scrollTop(This.offset().top-300*rem);
		
		setTimeout(function(){
			show_menu.checked = false;
		}, 1000);
	});
});