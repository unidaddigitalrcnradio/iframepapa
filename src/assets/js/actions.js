$(function () {    
    var header = document.getElementById('header');
    var headroom = new Headroom(header);
    headroom.init();
  });
$(document).ready(function() {
// Contador  > https://codepen.io/SitePoint/pen/MwNPVq            
    
// Player
    
    
// Menu
    
$('.menu > li > a').click(function(e){				
	e.preventDefault();		//evitar el eventos del enlace normal
	var strAncla=$(this).attr('href'); //id del ancla
		$('body,html').stop(true,true).animate({				
			scrollTop: $(strAncla).offset().top
		},1000);

});    
    
    
    
$('#nav-icon1').click(function(){
		$(this).toggleClass('open');
	});
$('.block').click( 'fast', function(){
		$('.d-tablet').slideToggle("openMenu");    
	});
    
// Frases  
$("#owl-demo").owlCarousel({
        navigation : false,
        pagination:false,
        slideSpeed : 300,
        autoPlay: 9000, //Set AutoPlay to 3 seconds
        paginationSpeed : 400,
        singleItem : true,
        transitionStyle : "fade",
      });             
});
// Galeria 
$(document).ready(function() {    
     setTimeout(function(){   
         $("#owl-galeria").owlCarousel({  
            navigation : true,
            navigationText : [" < "," > "],
            pagination:false,
            slideSpeed : 300,
            autoPlay: 6000, //Set AutoPlay to 3 seconds
            paginationSpeed : 400,
            singleItem : true,
            transitionStyle : "fade",             
            }); 
     }, 2000); 
}); 