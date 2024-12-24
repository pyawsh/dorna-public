
jQuery(document).ready(function ($){
    
    // accordion filter
      $('.accordion .accordion-item .accordion-content').css("display", "none");
      
      //Set a form to be "open on start"
      $('.accordion .accordion-item .accordion-content.open-on-start').closest('.accordion-item').addClass('open');
      $('.accordion .accordion-item .accordion-content.open-on-start').slideToggle(0);
      
      $('.accordion .accordion-item .accordion-item__button').click(function() {
      
        var a = $(this).closest('.accordion-item');
        var b = $(a).hasClass('open');
        var c = $(a).closest('.accordion').find('.open');
          
        if(b != true) {
          $(c).find('.accordion-content').slideUp(200);
          $(c).removeClass('open');
        }

        $(a).toggleClass('open');
        $(a).find('.accordion-content').slideToggle(200);

      });
  } , jQuery);