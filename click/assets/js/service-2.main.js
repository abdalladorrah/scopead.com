(function($) {

    gsap.registerPlugin(ScrollTrigger);

    $(window).on('load', function(){
        $(".lines__el").css('opacity',1);
        heroScreen();
        serviceScreen1();
        getCardTitleWidth();
    });


    $(window).scroll(function() {
    if ($(this).scrollTop() > 200){  
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


    function heroScreen(){

        var line1 = $(".hero3-area .text-content .sub-title .title-left-line .main-line");
        var line1Right = $(".hero3-area .text-content .sub-title .title-right-line .main-line");
        var line2 = $(".hero3-area .to-lines .line-1 svg path");
        var line3 = $(".hero3-area .to-lines .line-2 .main-line");
        var line4 = $(".hero3-area .to-lines .line-3 svg path");
        var line5 = $(".hero3-area .to-lines .line-4 .main-line");
        var line6 = $(".hero3-area .to-lines .line-5 svg path");
        var line7 = $(".hero3-area .bottom-line .line-1 .main-line");
        var line8 = $(".hero3-area .bottom-line .line-2 svg path");


        gsap.set([line5], { 
            height:"0%"
        })
        gsap.set([line1,line3,line7,line1Right], { 
            width:"0%"
        })

        gsap.set([line2,line4,line6,line8], {
            drawSVG:"0%"
        })

        ScrollTrigger.matchMedia({
            "(min-width:992px)":function(){
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".hero3-area",
                        start:"top 0%", 
                        end: "bottom 70%", 
                        scrub:true, 
                        // markers:{
                        //     startColor:"blue",
                        //     endColor:"blue" 
                        // }
                    } 
                })
                .to(line1, { 
                    width:"100%"
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
                        trigger:".hero3-area",
                        start:"top 0%", 
                        end: "bottom 70%", 
                        scrub:true, 
                        // markers:{
                        //     startColor:"blue",
                        //     endColor:"blue" 
                        // }
                    } 
                })
                .to(line1Right, { 
                    width:"100%"
                }) 
                .to(line1, { 
                    width:"100%"
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
            }
        })
    }

    function serviceScreen1(){

        var sfline1 = $('.service_screen .first-line .f-line-1 .main-line');
        var sfline2 = $('.service_screen .first-line .f-line-2 svg path');
        var sfline3 = $('.service_screen .first-line .f-line-3 .main-line');
        var sLine1 = $('.service_screen .service-card.sc-1 .main-line');

        var s2Line1 = $('.service-card.sc-2 .left0-line svg path');
        var s2Line2 = $('.service-card.sc-2 .service-lg-line .main-line');
        var s2Line3 = $('.service-card.sc-2 .title-line-1 .main-line');
        var s2Line4 = $('.service-card.sc-2 .bottom-right-line svg path');

        var s3Line1 = $('.service-card.sc-3 .service-lg-line .main-line');
        var s3Line2 = $('.service-card.sc-3 .title-line-1 .main-line');

        var s4Line1 = $('.service-card.sc-4 .service-lg-line .main-line');
        var s4Line2 = $('.service-card.sc-4 .title-line-1 .main-line');

        var s5Line1 = $('.service-card.sc-2-5 .title-line-1 .main-line');
        var s5Line2 = $('.service-card.sc-2-5 .service-lg-line .main-line');
        var s5Line3 = $('.service-card.sc-2-5 .right-line-wrap .line-rl-1 svg path');
        var s5Line4 = $('.service-card.sc-2-5 .right-line-wrap .line-rl-2 .main-line');
        var s5Line5 = $('.service-card.sc-2-5 .right-line-wrap .line-rl-3 svg path');
        var s5Line6 = $('.service-card.sc-2-5 .right-line-wrap .line-rl-4 .main-line');
        var s5Line7 = $('.service-card.sc-2-5 .left0-line svg path');

        var s6Line1 = $('.service-card.sc-6 .service-lg-line .main-line');
        var s6Line2 = $('.service-card.sc-6 .title-line-1 .main-line');

        var s7Line1 = $('.service-card.sc-7 .service-lg-line .main-line');
        var s7Line2 = $('.service-card.sc-7 .left-line-to-bottom .lltb-1 svg path');
        var s7Line3 = $('.service-card.sc-7 .left-line-to-bottom .lltb-2 .main-line');
        var s7Line4 = $('.service-card.sc-7 .left-line-to-bottom .lltb-3 svg path');
        var s7Line5 = $('.service-card.sc-7 .left-line-to-bottom .lltb-4 .main-line');
        var s7Line6 = $('.service-card.sc-8 .title-line-1 .main-line');

        var s8Line1 = $('.service-card.sc-2-9 .service-lg-line .line-1 .main-line');
        var s8Line2 = $('.service-card.sc-2-9 .service-lg-line .line-2 svg path');
        var s8Line3 = $('.service-card.sc-2-9 .service-lg-line .line-3 .main-line');
        var s8Line4 = $('.service-card.sc-2-9 .title-line-1 .main-line');
           

        var serviceLine1 = $('.service-card .service-lg-line .main-line');
        var serviceLine2 = $('.service-card .title-line-1 .main-line');

        gsap.set([sfline1,s7Line3], { 
            height:"0%"
        })
        gsap.set([
            sfline3,sLine1,s2Line2,s2Line3,
            s3Line1,s3Line2,
            s4Line1,s4Line2,
            s6Line1,s6Line2,
            s5Line1,s5Line2,s5Line4,s5Line6,
            s7Line1,s7Line5,s7Line6,
            s8Line1,s8Line3,s8Line4, serviceLine1, serviceLine2
        ], { 
            width:"0%"
        })

        gsap.set([
            sfline2, s2Line1,s2Line4,
            s5Line3, s5Line5, s5Line7,
            s7Line2, s7Line4,s8Line4,s8Line2
        ], {
            drawSVG:"0%"
        })

        ScrollTrigger.matchMedia({
            "(min-width:992px)":function(){
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".service_screen .first-line",
                        start:"top 70%", 
                        end: "154 70%", 
                        scrub:true
                    },
                    ease:"none"
                })
                .to(sfline1, { 
                    height:"100%"
                })
                .to(sfline2, {  
                    drawSVG:"-100%"
                })
                .to(sfline3, { 
                    width:"100%"
                })
                .to(sLine1, { 
                    width:"100%"
                })

                gsap.timeline({
                    scrollTrigger:{
                        trigger:".service_screen .service-card.sc-2",
                        start:"top 70%", 
                        end: "bottom 70%", 
                        scrub:true
                    },
                    ease:"none"
                })
                .to(s2Line1, { 
                    drawSVG:"100%"
                })
                .to(s2Line2, {  
                    width:"100%"
                })
                .to(s2Line3, { 
                    width:"100%"
                })
                .to(s2Line4, { 
                    drawSVG:"100%"
                })

                gsap.timeline({
                    scrollTrigger:{
                        trigger:".service_screen .service-card.sc-3",
                        start:"top 70%", 
                        end: "200 70%",
                        scrub:true
                    },
                    ease:"none"
                })
                .to(s3Line1, { 
                    width:"100%"
                })
                .to(s3Line2, {  
                    width:"100%"
                })

                gsap.timeline({
                    scrollTrigger:{
                        trigger:".service_screen .service-card.sc-4",
                        start:"top 70%", 
                        end: "200 70%", 
                        scrub:true
                    },
                    ease:"none"
                })
                .to(s4Line1, { 
                    width:"100%"
                })
                .to(s4Line2, {  
                    width:"100%"
                })

                gsap.timeline({
                    scrollTrigger:{
                        trigger:".service_screen .service-card.sc-2-5",
                        start:"top 70%", 
                        end: "450 70%",
                        scrub:true,
                        // markers:true
                    },
                    ease:"none"
                })
                .to(s5Line1, { 
                    width:"100%"
                })
                .to(s5Line2, { 
                    width:"100%"
                })
                .to(s5Line3, { 
                    drawSVG:"-100%"
                })
                .to(s5Line4, { 
                    width:"100%"
                })
                .to(s5Line5, { 
                    drawSVG:"-100%"
                })
                .to(s5Line6, { 
                    width:"100%"
                })
                .to(s5Line7, { 
                    drawSVG:"-100%"
                })

                gsap.timeline({
                    scrollTrigger:{
                        trigger:".service_screen .service-card.sc-6",
                        start:"top 70%", 
                        end: "200 70%", 
                        scrub:true
                    },
                    ease:"none"
                })
                .to(s6Line1, { 
                    width:"100%"
                })
                .to(s6Line2, {  
                    width:"100%"
                })

                gsap.timeline({
                    scrollTrigger:{
                        trigger:".service_screen .service-card.sc-7",
                        start:"top 70%", 
                        end: "330 70%", 
                        scrub:true,
                        // markers:true
                    },
                    ease:"none"
                })
                .to(s7Line1, { 
                    width:"100%",
                    ease:"none"
                })
                .to(s7Line2, { 
                    drawSVG:"100%",
                    ease:"none"
                })
                .to(s7Line3, { 
                    height:"100%",
                    ease:"none"
                })
                .to(s7Line4, { 
                    drawSVG:"100%",
                    ease:"none"
                })
                .to(s7Line5, { 
                    width:"100%",
                    ease:"none"
                })
                .to(s7Line6, { 
                    width:"100%",
                    ease:"none"
                })

                gsap.timeline({
                    scrollTrigger:{
                        trigger:".service_screen .service-card.sc-2-9 .service-lg-line",
                        start:"top 70%", 
                        end: "bottom 70%", 
                        scrub:true,
                        // markers:true
                    },
                    ease:"none"
                })
                .to(s8Line1, {
                    width:"100%"
                })
                .to(s8Line2, { 
                    drawSVG:"100%"
                })
                .to(s8Line3, { 
                    width:"100%"
                })
                .to(s8Line4, { 
                    width:"100%"
                })
            }, 
            "(max-width:991px)": function() {
                $('.service-card:even').each(function() {
                    var sLine1 = $(this).find('.service-lg-line .main-line');
                    var sLine2 = $(this).find('.title-line-1 .main-line');
                    var this_ = $(this);
                    gsap.timeline({
                        scrollTrigger:{
                            trigger:this_,
                            start:"top 70%", 
                            end: "120% 70%", 
                            scrub:true,
                            // markers:true
                        },
                        ease:"none"
                    })
                    .to(sLine2, {
                        width:"100%"
                    })
                    .to(sLine1, { 
                        width:"100%"
                    })
                });
                $('.service-card:odd').each(function() {
                    var sLine1 = $(this).find('.service-lg-line .main-line');
                    var sLine2 = $(this).find('.title-line-1 .main-line');
                    var this_ = $(this);
                    gsap.timeline({
                        scrollTrigger:{
                            trigger:this_,
                            start:"top 70%", 
                            end: "120% 70%", 
                            scrub:true,
                            // markers:true
                        },
                        ease:"none"
                    })
                    .to(sLine1, {
                        width:"100%"
                    })
                    .to(sLine2, { 
                        width:"100%"
                    })
                });
            }
        })
    }

  
})(jQuery); 