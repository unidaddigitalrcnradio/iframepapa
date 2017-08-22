  $(".ultimair").click(function() {
      $('html, body').animate({
          scrollTop: $("#ultima").offset().top - 40
      }, 1000);
      $('.header').removeClass('active');
  });
// Frases  
$(document).ready(function() {
      $("#owl-demo").owlCarousel({

        navigation : false,
        pagination:false,
        slideSpeed : 300,
        autoPlay: 9000, //Set AutoPlay to 3 seconds
        paginationSpeed : 400,
        singleItem : true,
        transitionStyle : "fade",
    
      // "singleItem:true" is a shortcut for:
      // items : 1, 
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false

      });
    });


// Galeria
  $(document).ready(function() {
      $("#owl-galeria").owlCarousel({

        navigation : false,
        pagination:false,
        slideSpeed : 300,
        autoPlay: 9000, //Set AutoPlay to 3 seconds
        paginationSpeed : 400,
        singleItem : true,
        transitionStyle : "fade",
    
      // "singleItem:true" is a shortcut for:
      // items : 1, 
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false

      });
    });