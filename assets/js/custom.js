$(function($){

	"use strict";
	
	$(window).load(function() {
		$(".spinner").fadeOut();
		$(".preloader").delay(300).fadeOut("slow");
	})

	/*
	|----------------------------------------------------------------------------
	| STICKY NAVBAR
	|----------------------------------------------------------------------------
	*/
	
	$(".navbar-fixed-top").headroom({
		"offset": 205,
		"tolerance": 5,
		"classes": {
			"initial": "animated",
			"pinned": "slideDown",
			"unpinned": "slideUp"
		}
	});

	$('#appnav-collapse .nav a').on('click',function(){
		if($('.navbar-header .navbar-toggle').css('display') !='none'){
			$(".navbar-toggle").trigger( "click" );
		}
	});

	$('.nav').onePageNav({
		scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
		scrollOffset: 100 //Height of Navigation Bar
	});
	
	$(window).scroll(function() {
		var $scrollHeight = $(window).scrollTop();
		if ($scrollHeight > 600) {
			$('.navbar-home.fixed-nav').slideDown(400);
		} else{
			$('.navbar-home.fixed-nav').slideUp(100);
		}
	});
	
	
	/*
	|----------------------------------------------------------------------------
	|   APP GALLERY
	|----------------------------------------------------------------------------
	*/
	
	var app_gallery = $('#app-gallery');
	
	app_gallery.owlCarousel({
		items:3,
		loop:true,
		margin:30,
		autoplay:true,
		navigation:true,
		autoplayHoverPause:true,
		nav:false,
       	dots: true,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:3
			},
			1000:{
				items:3
			}
		}
	});


	/*
	|----------------------------------------------------------------------------
	|   REVIEW SLIDER
	|----------------------------------------------------------------------------
	*/
	
	var review = $('#review-carousel');
	
	review.owlCarousel({
		items:3,
		loop:true,
		margin:30,
		autoplay:true,
		navigation:true,
		autoplayHoverPause:true,
		nav:false,
       	dots: true,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:2
			},
			1000:{
				items:2
			}
		}
	});

	/*
	|----------------------------------------------------------------------------
	| PARTNER START HERE
	|----------------------------------------------------------------------------
	*/
	
	$('#partner-carousel').owlCarousel({
		items:6,
		loop: true,
		margin: 30,
		autoplayHoverPause:true,
		responsive:{
			0:{
				items:2
			},
			600:{
				items:3
			},
			1000:{
				items:6
			}
		}
	})

	/*
	|----------------------------------------------------------------------------
	|   COUNTERUP JS
	|----------------------------------------------------------------------------
	*/

	$('.counter').counterUp({
		delay: 10,
		time: 1000
	});
	
	/*==========================================================
		Adjust Column Height
	==========================================================*/
	
	$( document ).ready(function() {
		if($(window).width() >= 992){
			var heights = $(".blog-list .row > div").map(function() {
				return $(this).height();
			}).get(),

			maxHeight = Math.max.apply(null, heights);

			$(".blog-list .row > div").height(maxHeight);
		}
	});
	
	/*==========================================================
		 Go To Top
	==========================================================*/
	
	$(window).on('scroll',function() {
	   if ($(this).scrollTop() > 200) {
		  $('#go-to-top a').fadeIn('slow');
		  } else {
		  $('#go-to-top a').fadeOut('slow');
		} 
	});
  
	$('#go-to-top a').on( "click",function(){
	  $("html,body").animate({ scrollTop: 0 }, 750);
	  return false;
	});
	
	/*==========================================================
		 WOW
	==========================================================*/
	
	var wow = new WOW(
	{
		mobile: false
	});
	wow.init();

	/*
	|----------------------------------------------------------------------------
	|   MAGNIFIC JS
	|----------------------------------------------------------------------------
	*/
  
	$('#app-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		gallery:{
			enabled:true
		}
	});
  
	$('.play-video').magnificPopup({
		type: 'iframe'
	});
  
	$.extend(true, $.magnificPopup.defaults, {
		iframe: {
			patterns: {
				youtube: {
					index: 'youtube.com/', 
					id: 'v=', 
					src: 'http://www.youtube.com/embed/%id%?autoplay=1' 
				}
			}
		}
	});
	
	/*==========================================================
		Newletter Subscribe
	==========================================================*/

	$(".newsletter-signup").ajaxChimp({
		callback: mailchimpResponse,
		url: "http://codepassenger.us10.list-manage.com/subscribe/post?u=6b2e008d85f125cf2eb2b40e9&id=6083876991" // Replace your mailchimp post url inside double quote "".  
	});

	function mailchimpResponse(resp) {
		 if(resp.result === 'success') {
		 
			$('.newsletter-success').html(resp.msg).fadeIn().delay(3000).fadeOut();
			
		} else if(resp.result === 'error') {
			$('.newsletter-error').html(resp.msg).fadeIn().delay(3000).fadeOut();
		}  
	};
	
	/*==========================================================
		Ajax Contact Form
	==========================================================*/
	
	// Function for email address validation
	function isValidEmail(emailAddress) {
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

		return pattern.test(emailAddress);

	};
	$("#contact-form").on('submit', function(e) {
		e.preventDefault();
		var data = {
			name: $("#name").val(),
			email: $("#email").val(),
			// subject: $("#subject").val(),
			message: $("#message").val()
		};

		if ( isValidEmail(data['email']) && (data['message'].length > 1) && (data['name'].length > 1) ) {
			$.ajax({
				type: "POST",
				url: "sendmail.php",
				data: data,
				success: function() {
					$('#contact-form .input-success').delay(500).fadeIn(1000);
					$('#contact-form .input-error').fadeOut(500);
				}
			});
		} else {
			$('#contact-form .input-error').delay(500).fadeIn(1000);
			$('#contact-form .input-success').fadeOut(500);
		}

		return false;
	});

}(jQuery));