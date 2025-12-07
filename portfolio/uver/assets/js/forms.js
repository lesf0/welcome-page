jQuery(document).ready(function($){
	var noform = document.getElementById('show_popup');

	$('form').ajaxForm(function(data){
		if(data instanceof Object){
			if(data.error){
				console.log(data.error);
				swal('Ошибка','Что-то пошло не так. Проверьте данные или попробуйте позвонить нам','error');
			}else{
				swal('Успешно отправлено','Мы перезвоним вам как можно скорее','success');
				noform.checked = true;

				window.yaCounter40223449.reachGoal('otpravka_zayavki');
			}
		}
	});

	var from_hidden = $('#popup_from');
	$('label[for="show_popup"]').click(function(e){
		from_hidden.val( $(this).attr('data-from') );

		var goal = $(this).attr('data-goal');
		if(goal){
			console.log('goal: ',goal);
			window.yaCounter40223449.reachGoal(goal);
		}
	});

	var hide_kp = document.getElementById('hide_kp');
	var show_kp = document.getElementById('show_kp');

	$('.show-kp-form').click(function(e){
		e.preventDefault();

		hide_kp.checked = false;
		show_kp.checked = false;
	});

	$('a[href$=".pdf"]').click(function(){
		window.yaCounter40223449.reachGoal('ispitanya');
	});

	$('.certificate-single').click(function(){
		window.yaCounter40223449.reachGoal('sertificat');
	});
	$('.otzyv-single').click(function(){
		window.yaCounter40223449.reachGoal('otzyv');
	});
});