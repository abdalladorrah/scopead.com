(function($) {

    gsap.registerPlugin(ScrollTrigger);

    $(window).on('load', function(){
        $(".lines__el").css('opacity',1);
        heroScreen()
        screen1() 
    });


    $(window).scroll(function() {
    if ($(this).scrollTop() > 30){  
        $('.header-area').addClass("active-header");
      }
      else{
        $('.header-area').removeClass("active-header");
      }
    });


    $('.portfolio-grid').imagesLoaded(function () {
        // init Isotope
        var $grid = $('.portfolio-grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            transitionDuration: '0.5s',
            masonry: {
                columnWidth: '.grid-item', 
            }
        });

         var filter__Value = $('.portfolio-btns li.active').attr('data-filter');
         $grid.isotope({ filter: filter__Value });

        // filter items on button click
        $('.portfolio-btns').on('click', 'li', function () {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
        });

        $grid.on('arrangeComplete', function() {
            form__Ani2();
            ScrollTrigger.refresh()
        });

    });
    //for menu active class
    $('.portfolio-btns li').on('click', function (event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
    });

    function form__Ani2() {
        
        var line1 = $(".form__wrapper__line_portfolio .form-top-line .main-line");
        var line2 = $(".form__wrapper__line_portfolio .form-title .title-line .title-line-1 .main-line");
        var line3 = $(".form__wrapper__line_portfolio .form-title .title-line .title-line-2 svg path");

        if($(".form__wrapper__line_portfolio").length){
            gsap.set([line1,line2], {width:"0%"});
            gsap.set(line3, {drawSVG:"0%"});

            gsap.timeline({
                scrollTrigger:{
                    trigger:".form__wrapper__line_portfolio",
                    start:"top 80%",
                    end: "bottom 100%", 
                    scrub:true, 
                    // markers:{
                    //     startColor:"blue",
                    //     endColor:"blue" 
                    // }
                } 
            })
            .to(line1, {width:"100%"})
            .to(line2, {width:"100%"})
            .to(line3, {drawSVG:"100%"}) 
        }
    }



    function heroScreen(){

        var line1 = $(".portfolio-hero .right-line .main-line");
        var line2 = $(".portfolio-hero .bottom-line .line-1 svg path");
        var line3 = $(".portfolio-hero .bottom-line .line-2 .main-line");
        var line4 = $(".portfolio-hero .bottom-line .line-3 svg path");
        var line5 = $(".portfolio-hero .bottom-line .line-4 .main-line");
        var line6 = $(".portfolio-hero .bottom-line .line-5 svg path");

        var lineSm1 = $(".portfolio-hero .sm-line-left .sm-left-line-1 .main-line");
        var lineSm2 = $(".portfolio-hero .sm-line-left .sm-left-line-2 svg path");
        var lineSm3 = $(".portfolio-hero .sm-line-left .sm-left-line-3 .main-line");

        var lineSm4 = $(".portfolio-hero .sm-lines .sm-line-1 .main-line");
        var lineSm5 = $(".portfolio-hero .sm-lines .sm-line-2 svg path");
        var lineSm6 = $(".portfolio-hero .sm-lines .sm-line-3 .main-line");
        var lineSm7 = $(".portfolio-hero .sm-lines .sm-line-4 svg path");
        var lineSm8 = $(".portfolio-hero .sm-lines .sm-line-5 .main-line");
        var lineSm9 = $(".portfolio-hero .sm-lines .sm-line-6 svg path");

        gsap.set([line3,lineSm1,lineSm6], { 
            height:"0%"
        })
        gsap.set([line1,line5,lineSm3,lineSm4,lineSm8], { 
            width:"0%"
        })

        gsap.set([line2,line4,line6,lineSm2,lineSm5,lineSm7,lineSm9], {
            drawSVG:"0%"
        })

        ScrollTrigger.matchMedia({
            "(min-width:992px)":function(){ 
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".portfolio-hero",
                        start:"top 0%", 
                        end: "bottom 70%", 
                        scrub:true, 
                    } 
                })
                .to(line1, { 
                    width:"100%"
                })
                .to(line2, {  
                    drawSVG:"100%"
                })
                .to(line3, { 
                    height:"100%"
                })
                .to(line4, { 
                    drawSVG:"-100%"
                })
                .to(line5, {  
                    width:"100%"
                })
                .to(line6, { 
                    drawSVG:"100%"
                })
                
            },
            "(max-width:991px)": function() {
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".portfolio-hero",
                        start:"top 0%", 
                        end: "bottom 70%", 
                        scrub:true,
                        pin:false,
                    } 
                })
                .to(lineSm1, { 
                    height:"100%"
                })
                .to(lineSm2, { 
                    drawSVG:"-100%"
                })
                .to(lineSm3, { 
                    width:"100%"
                })
                .to(lineSm4, { 
                    width:"100%"
                })
                .to(lineSm5, { 
                    drawSVG:"100%"
                })
                .to(lineSm6, { 
                    height:"100%"
                })
                .to(lineSm7, { 
                    drawSVG:"-100%"
                }) 
                .to(lineSm8, { 
                    width:"100%"
                })
                .to(lineSm9, { 
                    drawSVG:"100%"
                })
            }
        })
    }

    function screen1(){


        var line1 = $(".portfolio-screen1 .line-wrapper .line-1 svg path");
        var line2 = $(".portfolio-screen1 .line-wrapper .line-2 svg path");
        var line3 = $(".portfolio-screen1 .line-wrapper .line-3 .main-line");
        var line4 = $(".portfolio-screen1 .line-wrapper .line-4 svg path");
        var smLine1 = $(".portfolio-screen1 .line-sm-left svg path");
 
        gsap.set([line3], { 
            height:"0%"
        })
        
        
        gsap.set([line1,line2,line4,smLine1], {
            drawSVG:"0%"
        })

        ScrollTrigger.matchMedia({ 
            "(min-width:992px)":function(){

                gsap.timeline({
                    scrollTrigger:{
                        trigger:".portfolio-screen1 .line-wrapper .line-1", 
                        start:"top 70%",
                        end: "bottom 70%", 
                        scrub:true,
                    } 
                })
                .to(line1, { 
                    drawSVG:"-100%"
                })
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".portfolio-screen1 .line-wrapper .line-2", 
                        start:"top 70%",
                        end: "bottom 70%", 
                        scrub:true,
                    } 
                })
                .to(line2, { 
                    drawSVG:"100%"
                })
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".portfolio-screen1 .line-wrapper .line-3", 
                        start:"top 70%",
                        end: "bottom 70%", 
                        scrub:true,
                        
                    } 
                })
                .to(line3, { 
                    height:"102%", 
                    ease:"none"
                })
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".portfolio-screen1 .line-wrapper .line-4", 
                        start:"top 70%",
                        end: "150% 70%", 
                        scrub:true,
                        // markers:true
                    } 
                })
                .to(line4, {
                    drawSVG:"-100%"
                })
            },
            "(max-width:991px)": function() {
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".portfolio-screen1 .line-sm-left", 
                        start:"top 70%",
                        end: "bottom 70%",
                        scrub:true,
                    } 
                })
                .to(smLine1, { 
                    drawSVG:"-100%"
                }) 
            }
        })
    }
  
})(jQuery); 