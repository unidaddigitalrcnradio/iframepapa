
$(document).ready(function() {
// Player
    
    
// Menu
    
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
// Galeria    
$("#owl-galeria").owlCarousel({

        navigation : false,
        pagination:false,
        slideSpeed : 300,
        autoPlay: 6000, //Set AutoPlay to 3 seconds
        paginationSpeed : 400,
        singleItem : true,
        transitionStyle : "fade",
      });              
});


