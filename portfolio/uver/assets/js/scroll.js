jQuery(document).ready(function($){
	var doc = $(document);

	var rem = parseFloat($('html').css('font-size'));

	var menu_container = $('.top-menu-container');
	var menu_fixed = false;

	var advantages_container = $('.advantages-container');
	var advantages_vis = false;

	var kp_cb = document.getElementById('hide_kp');
	var kp_vis = false;
	var kp_lock = false;

	$(kp_cb).change(function(){
		kp_lock = true;
	});

	var menu_h = 53;
	var adv_h = 750;//852;
	var kp_h = 300;

	var s = function(){
		var scrollTop = doc.scrollTop();

		if(scrollTop > menu_h * rem && !menu_fixed){
			menu_container.addClass('top-menu-container-fixed');
			menu_fixed = true;
		}else if(scrollTop <= menu_h * rem && menu_fixed){
			menu_container.removeClass('top-menu-container-fixed');
			menu_fixed = false;
		}

		if(scrollTop > adv_h * rem && !advantages_vis){
			advantages_container.removeClass('advantages-container-folded');
			advantages_vis = true;
		}else if(scrollTop <= adv_h * rem && advantages_vis){
			advantages_container.addClass('advantages-container-folded');
			advantages_vis = false;
		}

		if(!kp_lock){
			if(scrollTop > kp_h * rem && !kp_vis){
				kp_cb.checked = false;
				kp_vis = true;
			}else if(scrollTop <= kp_h * rem && kp_vis){
				kp_cb.checked = true;
				kp_vis = false;
			}
		}
	}

	var r = function(){
		rem = parseFloat($('html').css('font-size'));

		s();
	}
	r();
	$(window).resize(r);

	doc.scroll(s);
});