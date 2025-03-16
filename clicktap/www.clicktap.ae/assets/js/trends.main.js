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

    function heroScreen(){

        var line1 = $(".trends-hero .right-line .main-line");
        var line2 = $(".trends-hero .bottom-line .line-1 svg path");
        var line3 = $(".trends-hero .bottom-line .line-2 .main-line");
        var line4 = $(".trends-hero .bottom-line .line-3 svg path");
        var line5 = $(".trends-hero .bottom-line .line-4 .main-line");
        var line6 = $(".trends-hero .bottom-line .line-5 svg path");

        var smLineTop1 = $(".trends-hero .sm-line-left .sm-left-line-1 .main-line");
        var smLineTop2 = $(".trends-hero .sm-line-left .sm-left-line-2 svg path");
        var smLineTop3 = $(".trends-hero .sm-line-left .sm-left-line-3 .main-line");
        var smLine1 = $(".trends-hero .sm-line-left .sm-left-line-3 .main-line");
        var smLine2 = $(".trends-hero .sm-lines .sm-line-1 .main-line");
        var smLine3 = $(".trends-hero .sm-lines .sm-line-2 svg path");
        var smLine4 = $(".trends-hero .sm-lines .sm-line-3 .main-line");
        var smLine5 = $(".trends-hero .sm-lines .sm-line-4 svg path");
        var smLine6 = $(".trends-hero .sm-lines .sm-line-5 .main-line");
        var smLine7 = $(".trends-hero .sm-lines .sm-line-6 svg path");

        gsap.set([line3,smLineTop1, smLine4], { 
            height:"0%"
        })
        gsap.set([line1,line5,smLineTop3, smLine1, smLine2, smLine6], { 
            width:"0%"
        })

        gsap.set([line2,line4,line6,smLineTop2, smLine3, smLine5, smLine7], {
            drawSVG:"0%"
        })

        ScrollTrigger.matchMedia({
            "(min-width:992px)":function(){ 
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".trends-hero",
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
                        trigger:".trends-hero",
                        start:"top 0%", 
                        end: "bottom 70%", 
                        scrub:true,
                    } 
                })
                .to(smLineTop1, { 
                    height:"100%"
                })
                .to(smLineTop2, { 
                    drawSVG:"-100%"
                })
                .to(smLineTop3, { 
                    width:"100%"
                })
                .to(smLine1, { 
                    width:"100%"
                })
                .to(smLine2, { 
                    width:"100%"
                })
                .to(smLine3, { 
                    drawSVG:"100%"
                })
                .to(smLine4, { 
                    height:"100%"
                })
                .to(smLine5, { 
                    drawSVG:"-100%"
                })
                .to(smLine6, { 
                    width:"100%"
                })
                .to(smLine7, { 
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