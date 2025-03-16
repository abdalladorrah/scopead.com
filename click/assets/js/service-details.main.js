(function($) {

    gsap.registerPlugin(ScrollTrigger);

    $(window).on('load', function(){
        $(".lines__el").css('opacity',1);
        serviceScreen1();
        getCardTitleWidth();
    });


    $(window).scroll(function() {
    if ($(this).scrollTop() > 50){  
        $('.header-area').addClass("active-header");
      }
      else{
        $('.header-area').removeClass("active-header");
      }
    });

    function getCardTitleWidth() {
        $(".service-card").each(function() {
            var width = $(this).innerWidth();
            var titleWidth = $(this).find('.title-wrap').innerWidth();
            $(this).css('--card-width', width+'px'); 
            $(this).css('--card-title-width', titleWidth+'px');
        });
    } getCardTitleWidth();

    $(window).on('resize', function() {
        getCardTitleWidth(); 
    });


    function serviceScreen1(){

        var line1 = $('.service-details-section .service-card .service-lg-line .main-line');
        var line2 = $('.service-details-section .service-card .title-line-1 .main-line');
        var line3 = $('.service-details-section .bottom-right-line svg path');

        gsap.set([
            line1, line2
        ], { 
            width:"0%"
        })

        gsap.set([
            line3
        ], { 
            drawSVG:"0%"
        })

        gsap.timeline()
        .to(line2, 0.5, {
            width:"100%",
            ease: Power3.easeInOut
        })
        .to(line1, 0.5, {
            width:"100%",
            ease: Power3.easeInOut
        })
        .to(line3, 0.5, {
            drawSVG:"100%",
            ease: Power3.easeInOut
        })
    }

  
})(jQuery); 