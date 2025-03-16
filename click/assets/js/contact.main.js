(function($) {

    gsap.registerPlugin(ScrollTrigger);

    $(window).on('load', function(){
        $(".lines__el").css('opacity',1);
        contactScreen1();
        contactScreen2();
        contactScreen3();
    });


    $(window).scroll(function() {
    if ($(this).scrollTop() > 30){  
        $('.header-area').addClass("active-header");
      }
      else{
        $('.header-area').removeClass("active-header");
      }
    });

    function getSize() {
        $(".service-card").each(function() {
            var width = $(this).innerWidth();
            var titleWidth = $(this).find('.title-wrap').innerWidth();
            $(this).css('--card-width', width+'px'); 
            $(this).css('--card-title-width', titleWidth+'px');
        });
    } getSize();

    $(window).on('resize', function() {
        getSize(); 
    });


    function contactScreen1(){
        var PhoneLine = $(".contact-hero .phone-line .main-line");

        gsap.set([PhoneLine], {
            height:"0%"
        })
        gsap.timeline({
            scrollTrigger:{
                trigger:".contact-hero",
                start:"top 0%",
                end: "bottom 70%", 
                scrub:true,
            } 
        })
        .to(PhoneLine, { 
            height:"100%"
        })
    }
    function contactScreen2(){

        var line1 = $(".contact-form-screen .line-top-right .line-1 .main-line");
        var line2 = $(".contact-form-screen .line-top-right .line-2 svg path");
        var line3 = $(".contact-form-screen .line-top-right .line-3 .main-line");

        var line4 = $(".contact-form-screen .content-wrap .line-top-left .line-4 svg path");
        var line5 = $(".contact-form-screen .content-wrap .line-top-left .line-5 .main-line");
        var line6 = $(".contact-form-screen .content-wrap .line-top-left .line-6 svg path");
        var line7 = $(".contact-form-screen .content-wrap .line-top-left .line-7 .main-line");
        var line8 = $(".contact-form-screen .content-wrap .line-top-left .line-8 svg path");


        gsap.set([line1,line5], { 
            height:"0%"
        })
        gsap.set([line3,line7], { 
            width:"0%"
        })
        gsap.set([line2,line4,line6,line8], {
            drawSVG:"0%"
        })

        ScrollTrigger.matchMedia({
            "(min-width:992px)":function(){
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".contact-form-screen",
                        start:"top 70%", 
                        end: "bottom 70%", 
                        scrub:true,
                    } 
                })
                .to(line1, { 
                    height:"100%"
                })
                .to(line2, { 
                    drawSVG:"-100%"
                })
                .to(line3, { 
                    width:"100%"
                })
                .to(line4, { 
                    drawSVG:"100%"
                })
                .to(line5, { 
                    height:"100%"
                })
                .to(line6, { 
                    drawSVG:"-100%"
                })
                .to(line7, { 
                    width:"100%"
                })
                .to(line8, { 
                    drawSVG:"100%"
                })
            },
            "(max-width:991px)": function() {
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".contact-form-screen",
                        start:"top 70%", 
                        end: "bottom 70%", 
                        scrub:true,
                    } 
                })
                .to(line2, { 
                    drawSVG:"-100%"
                })
                .to(line3, { 
                    width:"100%"
                })
                .to(line7, { 
                    width:"100%"
                })
                .to(line8, { 
                    drawSVG:"100%"
                })
            }
        })
    }
    
    function contactScreen3(){

        var line1 = $(".contact-screen2 .line-top-right .tl-1 .main-line");
        var line2 = $(".contact-screen2 .line-top-right .tl-2 svg path");
        var line3 = $(".contact-screen2 .line-top-right .tl-3 .main-line");

        var line4 = $(".contact-screen2 .text-wrap .title-line-wrap .line-1 svg path");
        var line5 = $(".contact-screen2 .text-wrap .title-line-wrap .line-2 .main-line");
        var line6 = $(".contact-screen2 .text-wrap .title-line-wrap .line-3 svg path");

        var lineSm1 = $(".contact-screen2 .text-wrap .sm-line-wrap .line-sm-1 .main-line");
        var lineSm2 = $(".contact-screen2 .text-wrap .sm-line-wrap .line-sm-2 .main-line");
        var lineSm3 = $(".contact-screen2 .text-wrap .sm-line-wrap .line-sm-3 .main-line");

        gsap.set([line1,line5], { 
            height:"0%"
        })
        gsap.set([line3,lineSm1,lineSm2,lineSm3], { 
            width:"0%"
        })
        gsap.set([line2,line4,line6], {
            drawSVG:"0%"
        })

        ScrollTrigger.matchMedia({
            "(min-width:992px)":function(){
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".contact-screen2",
                        start:"top 70%", 
                        end: "50% 100%", 
                        scrub:true,
                    } 
                })
                .to(line1, { 
                    height:"100%"
                })
                .to(line2, { 
                    drawSVG:"-100%"
                })
                .to(line3, { 
                    width:"100%"
                })
                .to(line4, { 
                    drawSVG:"100%"
                })
                .to(line5, { 
                    height:"100%"
                })
                .to(line6, { 
                    drawSVG:"-100%"
                })
            },
            "(max-width:991px)": function() {
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".contact-screen2 .text-wrap",
                        start:"top 70%", 
                        end: "bottom 70%",  
                        scrub:true,
                    } 
                })
                .to(lineSm2, { 
                    width:"100%"
                })
                .to(lineSm1, { 
                    width:"100%"
                })
                .to(lineSm3, { 
                    width:"100%"
                }) 
            }
        })
    }
  
})(jQuery); 