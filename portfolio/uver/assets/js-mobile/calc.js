jQuery(document).ready(function($){
	var rem = parseFloat($('html').css('font-size'));
	$(window).resize(function(){
		rem = parseFloat($('html').css('font-size'));
	});

	var prices = {
		1000 : '230',
		5000 : '220',
		10000 : '210',
		50000 : '200',
		100000 : 'индивидуально'
	};

	var pKeys = Object.keys(prices);
	var keysAmount = pKeys.length;
	var amountStart = parseInt(pKeys[0]);
	var amountEnd = parseInt(pKeys[keysAmount-1]);

	var redline = $('#calc_redline');
	var line = $('.calc-line');
	var count = $('#calc-count');
	var label = $('#calc-input');
	var priceOne = $('#calc-price');
	var priceAll = $('#calc-total-price');

	var amount_hidden = $('#popup_amount');

	var price;
	var cnt;

	function placeLine(pos) {
		redline.attr('transform', 'translate('+pos+')');
	}

	function setAmount(amount) {
		cnt = amount;
		count.val(amount.toFixed().replace(/(\d)(?=(\d{3})+$)/g, '$1 '));
		amount_hidden.val(amount);
	}

	function setPrice(amount) {
		if (isNumeric(amount)) {
			count.val(amount.replace(/(\d)(?=(\d{3})+$)/g, '$1 '));
		} else {
			count.val(amount);
		}
	}

	function findOnePrice() {
		var found = false;

		if (cnt >= parseInt(pKeys[keysAmount-1])) {
			price = prices[pKeys[keysAmount-1]];
			found = true;
		} else {
			var i = 1;
			do {
				if (cnt < parseInt(pKeys[i])) {
				price = prices[pKeys[i-1]];
				found = true;
				}
				i++;
			}
			while (!found);
		}

		if ($.isNumeric(price)) {
			priceOne.text(price + ' руб.');
		} else {
			priceOne.text(price);
		}
	}

	function findAllPrice() {
		if ($.isNumeric(price)) {
			priceAll.text(Math.round(cnt * price).toFixed(0).replace(/(\d)(?=(\d{3})+$)/g, '$1 ') + ' руб.');
		} else {
			priceAll.text(price);
		}
	}

	function findAll(amount,xo) {
		placeLine(xo);
		setAmount(amount);
		findOnePrice();
		findAllPrice();
	}

	var firstLoad = function() {
		$('#calc-start-amount').text(amountStart.toFixed().replace(/(\d)(?=(\d{3})+$)/g, '$1 ') + ' шт.');
		$('#calc-end-amount').text(amountEnd.toFixed().replace(/(\d)(?=(\d{3})+$)/g, '$1 ') + ' шт.');
		findAll(amountStart,0);
	}

	firstLoad();

	function tryAmount(xo) {
		if (cnt <=  amountStart) {
			findAll(amountStart,0);
		} else if (cnt >=  amountEnd) {
				findAll(amountEnd,1620);
			   } else {
			   		findAll(cnt,xo);
				 }
	}

	var upd = function(x) {
		var xo = Math.round((x / rem - 160) / 10) * 10;

		cnt = Math.round( ((amountEnd - amountStart) * xo / 1620 + amountStart) / 500 ) * 500;

		tryAmount(xo);

		window.yaCounter40223449.reachGoal('kalkulator');
	}

	var down = false;

	line.on('touchstart',function(e){
		upd(e.originalEvent.changedTouches[0].clientX);

		down = true;
	});
	$(document).on('touchend',function(e){
		down = false;
	});
	line.on('touchmove',function(e){
		if(down){
			upd(e.originalEvent.changedTouches[0].clientX);
		}
	});

	label.click(function(){
		count.prop('readonly', false);
	});

	count.focusout(function(){
    	count.prop('readonly', true);

    	var amount = count.val().replace(/\s/g, '');

    	if ($.isNumeric(amount)) {
    		cnt = parseInt(amount);
    		var xo = Math.round( 1620 * cnt / (amountEnd - amountStart) );
    		tryAmount(xo);
    	} else {
    		cnt = amountStart;
    		findAll(cnt,0);
    	}
	});

});