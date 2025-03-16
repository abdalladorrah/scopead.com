(function($) {

    gsap.registerPlugin(ScrollTrigger);

    $(window).on('load', function(){
        $(".lines__el").css('opacity',1);
        heroScreen();
        screen1();
        screen2();
        screen3();
    });


    $(window).scroll(function() {
    if ($(this).scrollTop() > 200){  
        $('.header-area').addClass("active-header");
      }
      else{
        $('.header-area').removeClass("active-header");
      }
    });

    
    function heroScreen(){

        var line1 = $(".hero2-area .line-wrapper .line-1 .main-line");
        var line2 = $(".hero2-area .line-wrapper .line-2 svg path");
        var line3 = $(".hero2-area .line-wrapper .line-3 .main-line");
        var line4 = $(".hero2-area .line-wrapper .line-4 svg path");
        var line5 = $(".hero2-area .line-wrapper .line-5 .main-line");

        gsap.set([line1,line5], { 
            height:"0%"
        })
        gsap.set([line3], {
            width:"0%"
        })
        gsap.set([line2,line4], {
            drawSVG:"0%"
        })
        ScrollTrigger.matchMedia({
            "(min-width:992px)":function(){
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".hero2-area",
                        start:"top 0%",
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
            },
            "(max-width:991px)": function() {
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".hero2-area",
                        start:"top 0%",
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
            }
        })
    }
    function screen1(){

        var line1 = $(".about-screen1 .line-1 svg path");
        var line2 = $(".about-screen1 .line-2 .main-line");
        var line3 = $(".about-screen1 .line-3 svg path");
        var line4 = $(".about-screen1 .line-4 .main-line");
        var line5 = $(".about-screen1 .line-5 svg path");
        var line6 = $(".about-screen1 .line-6 .main-line");
        var line7 = $(".about-screen1 .bottom-right-lines .line-7 svg path");
        var line8 = $(".about-screen1 .bottom-right-lines .line-8 .main-line");

        var CardWrap = $(".about-screen2 .image-wrap img");

        gsap.set([line4,line8], { 
            height:"0%"
        })
        gsap.set([line2,line6], {
            width:"0%"
        })
        gsap.set([line1,line3,line5,line7], {
            drawSVG:"0%"
        })


        ScrollTrigger.matchMedia({
            "(min-width:992px)":function(){

                gsap.set(CardWrap, {
                    x:"170%"
                })
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".about-screen2 .image-wrap",
                        start:"-70% 70%",
                        end: "120% 70%", 
                        scrub:0.3,
                    }  
                }).to(CardWrap, {x:0})

                gsap.timeline({
                    scrollTrigger:{
                        trigger:".about-screen1",
                        start:"top 70%",
                        end: "bottom 70%", 
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
                    drawSVG:"100%"
                })
                .to(line4, {
                    height:"100%"
                })
                .to(line5, { 
                    drawSVG:"-100%"
                })
                .to(line6, { 
                    width:"100%"
                })
                .to(line7, { 
                    drawSVG:"100%"
                })
                .to(line8, { 
                    height:"100%"
                })
            },
            "(max-width:991px)": function() {

                gsap.set(CardWrap, {
                    x:"50%"
                })
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".about-screen2 .image-wrap",
                        start:"-70% 70%",
                        end: "120% 70%", 
                        scrub:0.3,
                    }  
                }).to(CardWrap, {x:"0%"}) 

                gsap.timeline({
                    scrollTrigger:{
                        trigger:".about-screen1 .bottom-right-lines",
                        start:"top 70%",
                        end: "bottom 70%", 
                        scrub:true,
                    } 
                })
                .to(line6, { 
                    width:"100%"
                })
                .to(line7, { 
                    drawSVG:"100%"
                })
                .to(line8, { 
                    height:"100%"
                });

                gsap.timeline({
                    scrollTrigger:{
                        trigger:".about-screen1",
                        start:"top 70%",
                        end: "bottom 70%", 
                        scrub:true,
                    } 
                })
                .to(line2, {
                    width:"100%"
                })
                
            }
        })
    }

    function screen2(){

        var line1 = $(".about-screen2 .top-lines .line-1 .main-line");
        var line2 = $(".about-screen2 .top-lines .line-2 svg path");
        var line3 = $(".about-screen2 .top-lines .line-3 .main-line");

        var line4 = $(".about-screen2 .bottom-lines .line-4 .main-line");
        var line5 = $(".about-screen2 .bottom-lines .line-5 svg path");
        var line6 = $(".about-screen2 .bottom-lines .line-6 .main-line");
        var BottomSMLine = $(".about-screen2 .bottom-sm-line svg path");

        gsap.set([line1,line6], { 
            height:"0%"
        })
        gsap.set([line3,line4], {
            width:"0%"
        })
        gsap.set([line2,line5,BottomSMLine], {
            drawSVG:"0%"
        })

        ScrollTrigger.matchMedia({
            "(min-width:992px)":function(){
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".about-screen2",
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
                    width:"100%"
                })
                .to(line5, { 
                    drawSVG:"100%"
                })
                .to(line6, { 
                    height:"100%"
                })
            },
            "(max-width:991px)": function() {
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".about-screen2",
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
                .to(BottomSMLine, { 
                    drawSVG:"100%"
                })
            }
        })
    }

    function screen3(){

        var line1 = $(".about-screen3 .top-content .right-line .line-1 .main-line");
        var line2 = $(".about-screen3 .top-content .right-line .line-2 svg path");
        var line4 = $(".about-screen3 .top-content .line-4 .main-line");
        var line5 = $(".about-screen3 .top-content .line-5 .main-line");
        var newLine6 = $(".about-screen3 .top-content .line-new-6 svg path");
        var newLine7 = $(".about-screen3 .top-content .line-new-7 .main-line");
        var newLine8 = $(".about-screen3 .top-content .line-new-8 svg path");



        gsap.set([line1, newLine7], { 
            height:"0%"
        })
        gsap.set([line4,line5], {
            width:"0%"
        })
        gsap.set([line2,newLine6,newLine8], {
            drawSVG:"0%"
        })

        ScrollTrigger.matchMedia({
            "(min-width:992px)":function(){ 
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".about-screen3",
                        start:"top 70%", 
                        end: "300 70%",  
                        scrub:true
                    } 
                })
                .to(line1, 1, {height:"100%"})
                .to(line2, 1, {drawSVG:"-100%"})
                .to(line4, 1, {width:"100%"}) 
                .to(line5, 1, {width:"100%"})
                .to(newLine6, 1, {drawSVG:"100%"});

                gsap.timeline({
                    scrollTrigger:{
                        trigger:".about-screen3 .top-content .line-new-7",
                        start:"top 60%", 
                        end: "bottom 70%",  
                        scrub:true,
                        // markers:true
                    } 
                })
                .to(newLine7, 1, {height:"100%", ease:"none"});
                // 
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".about-screen3 .top-content .line-new-8",
                        start:"top 70%", 
                        end: "bottom 70%",  
                        scrub:true,
                        // markers:true
                    } 
                })
                .to(newLine8, 1, {drawSVG:"100%", ease:"none"});
                
            },
            "(max-width:991px)": function() {
                gsap.timeline({
                    scrollTrigger:{
                        trigger:".about-screen3",
                        start:"top 70%", 
                        end: "200 70%",  
                        scrub:true,
                    } 
                })
                .to(line4, 1, {width:"100%"}) 
                .to(line5, 1, {width:"100%"})
                
            }
        })
    }
    

  
})(jQuery); 