
$(function(){

	var
	  winW = $(window).width(),
		winH = $(window).height(),
		nav = $('#mainnav ul a'),
		curPos = $(this).scrollTop();

	if (winW > 880){
		var headerH =20;
	}
	else{
		var headerH =60;
	}

	$(nav).on('click', function(){
		nav.removeClass('active');
  	var $el = $(this),
		id = $el.attr('href');
 		$('html, body').animate({
   		scrollTop: $(id).offset().top - headerH
 		}, 500);
		$(this).addClass('active');
		if (winW < 880){
			$('#menuWrap').next().slideToggle();
			$('#menuBtn').removeClass('close');
		}
 		return false;
	});

	$('.panel').hide();
	$('#menuWrap').toggle(function(){
		$(this).next().slideToggle();
		$('#menuBtn').toggleClass('close');
	},
	function(){
		$(this).next().slideToggle();
		$('#menuBtn').removeClass('close');
	});

	//mainImgのfadeIn
	//$('#mainImg').fadeIn(5000);

	//よくある問い合わせ
	$('.faq-list-item').click(function(){
		var $answer = $(this).find('.answer');
		if($answer.hasClass('open')){
			$answer.removeClass('open');
			$answer.slideUp();
			$(this).find('span').text('+');
		}else{
			$answer.addClass('open');
			$answer.slideDown();
			$(this).find('span').text('-');
		}
	});

	//カレンダー表示
	var thisDate = new Date();

	$('.schedule').click(function(){
		var year = thisDate.getFullYear();
		var month = thisDate.getMonth();
		//カレンダー作成関数
		makeCalender(year, month);
		$('#calen-wrapper').css('display','block');
	});

	$('.close-modal').click(function(){
		$('#calen-wrapper').css('display','none');
	});

	//前月へ押したら
	$('.prev').click(function(){
		clear();
		var year = thisDate.getFullYear();
		var month = thisDate.getMonth();
		if(month == 0){
			year = year -1;
			month = 11;
		}else{
			month = month -1;
		}
		makeCalender(year, month);
		thisDate = new Date(year, month);

	});

	//次月へ押したら
	$('.next').click(function(){
		clear();
		var year = thisDate.getFullYear();
		var month = thisDate.getMonth();
		if(month == 11){
			year = year + 1;
			month = 0;
		}else{
			month = month + 1;
		}
		makeCalender(year, month);
		thisDate = new Date(year, month);

	});


	//カレンダー作成関数
	function makeCalender(year, month){
		var thisDate = new Date(year,month,1);
		$('.year').text(year  + '年');
		$('.month').text(month + 1  + '月');

		var i = thisDate.getDay();
		var clnum = thisDate.getDate();
		var clnumMax = 0;

		switch(month){
			case 0:
			case 2:
			case 4:
			case 6:
			case 7:
			case 9:
			case 11:
				clnumMax = 31;
				break;
			case 3:
			case 5:
			case 8:
			case 10:
				clnumMax = 30;
				break;
			case 1:
				//うるう年入れていない
				clnumMax = 28;
				break;
			default:
				break;
		}

		for(r = 1; r < 7; r++){
			for(i; i<7; i++){
				$('.week' + r).find('.day' + i).text(clnum);
				clnum = clnum + 1;
				if(clnum > clnumMax){
					break;
				}
			}
			i = 0;
			if(clnum > clnumMax){
				break;
			}
		}

	}

	//カレンダー初期化
	function clear(){
		for(r = 1 ; r < 7; r++){
			for(i = 0; i<7; i++){
				$('.week' + r).find('.day' + i).text('');
			}
		}
	}

});
