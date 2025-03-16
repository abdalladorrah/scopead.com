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

        var line1 = $(".career-hero .top-left-line .line-1 .main-line");
        var line2 = $(".career-hero .top-left-line .line-2 svg path");
        var line3 = $(".career-hero .top-right .main-line");
        var line4 = $(".career-hero .center-right .main-line");
        var line5 = $(".career-hero .center-left .line-3 .main-line");
        var line6 = $(".career-hero .center-left .line-4 svg path");
        var line7 = $(".career-hero .center-left .line-5 .main-line");
        var line8 = $(".career-hero .bottom-line .line-6 svg path");
        var line9 = $(".career-hero .bottom-line .line-7 .main-line");
        var line10 = $(".career-hero .bottom-line .line-8 svg path");


        gsap.set([line7], { 
            height:"0%"
        })
        gsap.set([line1,line4,line5,line9,line3], { 
            width:"0%"
        })

        gsap.set([line2,line6,line8,line10], {
            drawSVG:"0%"
        })

        ScrollTrigger.matchMedia({
            "(min-width:992px)":function(){ 
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".career-hero",
                        start:"top 0%", 
                        end: "+=200% 70%", 
                        scrub:true,
                        pin:true,
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
                    width:"100%"
                })
                .to(line5, { 
                    width:"100%"
                })
                .to(line6, { 
                    drawSVG:"100%"
                })
                .to(line7, { 
                    height:"100%"
                })
                .to(line8, { 
                    drawSVG:"-100%"
                })
                .to(line9, { 
                    width:"100%"
                })
                .to(line10, { 
                    drawSVG:"100%"
                })
                
            },
            "(max-width:991px)": function() {
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".career-hero",
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
                .to(line9, { 
                    width:"100%"
                })
                .to(line10, { 
                    drawSVG:"100%"
                })
            }
        })
    }

    function screen1(){

        var line1 = $(".career-screen1 .line-1 svg path");
        var line2 = $(".career-screen1 .line-2 .main-line");
        var line3 = $(".career-screen1 .top-left-line .line-3 .main-line");
        var line4 = $(".career-screen1 .line-4 svg path");
        var line5 = $(".career-screen1 .top-left-line .line-5 .main-line");
        var line6 = $(".career-screen1 .top-left-line .line-6 svg path");
        var line7 = $(".career-screen1 .top-left-line .line-7 .main-line"); 
        var line8 = $(".career-screen1 .top-left-line .line-8 svg path");
 
        gsap.set([line2,line3,line7], { 
            width:"0%"
        })

        gsap.set([line5], { 
            height:"0%"
        })
        
        gsap.set([line1,line4,line6,line8], {
            drawSVG:"0%"
        })

        ScrollTrigger.matchMedia({
            "(min-width:992px)":function(){
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".career-screen1", 
                        start:"top 90%",
                        end: "bottom 90%", 
                        scrub:true,
                    } 
                })
                .to(line1, { 
                    drawSVG:"-100%"
                })
                .to(line2, { 
                    width:"100%"
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
            }
        })
    }
  
})(jQuery); 